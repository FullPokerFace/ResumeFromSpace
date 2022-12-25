import express, { Request, Response } from "express";
import next from "next";
import express from 'express';
import cors from 'cors';
import path from 'path';
import pdfMakePrinter from 'pdfmake';
import bodyParser from 'body-parser';
import fs from 'fs';
require("dotenv").config({ path: "./.env" });


const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;
const dbo = require("./db/conn");

const ObjectId = require("mongodb").ObjectId;

// Define font files
let fonts = {
    Montserrat: {
      normal: __dirname + '/../fonts/Montserrat/Montserrat-Regular.ttf',
      bold: __dirname + '/../fonts/Montserrat/Montserrat-Medium.ttf',
    //   italics: __dirname + '/assets/fonts/Montserrat/Montserrat-Italic.ttf',
    //   bolditalics: __dirname + '/assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'
    }
  };

const generateDocDefinition = (
  content = [ 'There was a problem generating pdf. Please try again.'],
  styles = []
  ) => {
  return  {
      content,
      styles,
      defaultStyle: {
          font: "Montserrat",
      },
      pageMargins: [60, 44, 60, 44],
      pageSize: {
        width: 850,
        height: 1100,
      },
  };
}


const startServer = async () => { 
  try {
    await app.prepare();
    const server = express();
    server.use(cors());
    server.use(express.json({limit: "50mb"}))
    server.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
    server.use(bodyParser.urlencoded({ extended: false }));

    // User Endpoints
    server.post("/login", (request, response) => {
      let db_connect = dbo.getDb();
      let myquery = { email: request.body.email, pass: request.body.pass };
      db_connect
        .collection("users")
        .findOne(myquery, function (err, record) {
          if (err) throw err;
          if (record === null) { response.status(404).send(); return} 
          response.json({email: record.email, _id: record._id})
        });
    });


    // Resume endpoints
    server.get("/viewAll", (request, response) => {
        let db_connect = dbo.getDb("ResumeFromSpace");
        db_connect
        .collection("userResumes")
        .find({})
        .toArray(function (err, result) {
          if (err) throw err;
          response.send(200).json(result);
        });
    });

    server.get("/getNewPDFId", (request, response) => {
      let db_connect = dbo.getDb();
      let myobj = {
        content: {},
        styles: {},
      };
      db_connect.collection("userResumes").insertOne(myobj, function (err, res) {
        if (err) throw err;
        response.json(res);
      });
    });

    server.route("/updatePDF").post(function (request, response) {
      let db_connect = dbo.getDb();
      let myquery = { _id: ObjectId(request.body.id) };
      let newvalues = {
        $set: {
          thumbnail: request.body.thumbnail,
          content: request.body.content,
          styles: request.body.styles,
          sections: request.body.sections,
        },
      };
      db_connect
        .collection("userResumes")
        .updateOne(myquery, newvalues, function (err, res) {
          if (err) throw err;
          response.json({res});
        });
    });

    server.get("/viewPdf/:id", (request, response) => {
      let db_connect = dbo.getDb();
      let myquery = { _id: ObjectId(request.params.id) };
      db_connect
        .collection("userResumes")
        .findOne(myquery, function (err, record) {
          if (err) throw err;
          let printer = new pdfMakePrinter(fonts)
          let doc = printer.createPdfKitDocument(generateDocDefinition(record.content, record.styles))
    
          let chunks = []
          let result
    
          doc.on('data', function (chunk) {
            chunks.push(chunk)
          });
          doc.on('end', function () {
    
            result = Buffer.concat(chunks)
    
            response.contentType('application/pdf')
            response.send(result)

          });
          doc.end()
        });
    });

    server.get("/getResumeFormData/:id", (request, response) => {
      let db_connect = dbo.getDb();
      let myquery = { _id: ObjectId(request.params.id) };
      db_connect
        .collection("userResumes")
        .findOne(myquery, function (err, record) {
          if (err) throw err;
          if (record === null) { response.status(404).send(); return} 
          response.json(record.sections)
        });
    });

    server.all("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, (err) => {
      dbo.connectToServer(function (err) {
        if (err) console.error(err);
      });
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });

  } catch (e) {
    console.error(e);
    process.exit(1);
  }
};

startServer()

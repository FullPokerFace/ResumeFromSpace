import express, { Request, Response } from "express";
import next from "next";
import express from 'express';
import cors from 'cors';
import path from 'path';
import pdfMakePrinter from 'pdfmake';
import bodyParser from 'body-parser';
import fs from 'fs';

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

// Define font files
let fonts = {
    Montserrat: {
      normal: __dirname + '/../fonts/Montserrat/Montserrat-Regular.ttf',
      bold: __dirname + '/../fonts/Montserrat/Montserrat-Medium.ttf',
    //   italics: __dirname + '/assets/fonts/Montserrat/Montserrat-Italic.ttf',
    //   bolditalics: __dirname + '/assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'
    }
  };


let docDefinition = {
    content: [
        'First paragraph',
        'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
    ],
    defaultStyle: {
        font: "Montserrat",
    },
    pageMargins: [60, 44, 60, 44],
    pageSize: {
      width: 850,
      height: 1100,
    },
  };

(async () => { 
  try {
    await app.prepare();
    const server = express();
    server.get("/download", (request, response) => {
        let printer = new pdfMakePrinter(fonts)
        let doc = printer.createPdfKitDocument(docDefinition)

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
    server.all("*", (req, res) => {
      return handle(req, res);
    });
    server.listen(port, (err) => {
      if (err) throw err;
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();


// const app = express();
// app.use(cors());
// app.use(express.json({limit: "50mb"}))
// // app.use(bodyParser.urlencoded({ limit: "50mb", extended: true, parameterLimit: 50000 }))
// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'assets')));


// // Define font files
// let fonts = {
//     Montserrat: {
//       normal: __dirname + '/fonts/Montserrat/Montserrat-Regular.ttf',
//       bold: __dirname + '/fonts/Montserrat/Montserrat-Medium.ttf',
//     //   italics: __dirname + '/assets/fonts/Montserrat/Montserrat-Italic.ttf',
//     //   bolditalics: __dirname + '/assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'
//     }
//   };


// let docDefinition = {
//     content: [
//         'First paragraph',
//         'Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines'
//     ],
//     defaultStyle: {
//         font: "Montserrat",
//     },
//     pageMargins: [60, 44, 60, 44],
//     pageSize: {
//       width: 850,
//       height: 1100,
//     },
//   };




// // app.post("/render", async (req, res) => {
// //     res.send(JSON.stringify({
// //         name: 'John'
// //     }))
// // })

// app.post("/renderPDF", (request, response) => {
//     console.log(request.body)
//     let printer = new pdfMakePrinter(fonts)
//     let doc = printer.createPdfKitDocument(request.body || docDefinition)

//     let chunks = []
//     let result

//     doc.on('data', function (chunk) {
//       chunks.push(chunk)
//     });
//     doc.on('end', function () {
//       result = Buffer.concat(chunks)

//       response.contentType('application/pdf')
//       response.send(result)
//     });
//     doc.end()
// });

// app.get("/", (request, response) => {
//     let printer = new pdfMakePrinter(fonts)
//     let doc = printer.createPdfKitDocument(docDefinition)

//     let chunks = []
//     let result

//     doc.on('data', function (chunk) {
//       chunks.push(chunk)
//     });
//     doc.on('end', function () {
//       result = Buffer.concat(chunks)

//       response.contentType('application/pdf')
//       response.send(result)
//     });
//     doc.end()
// });

// const PORT = process.env.PORT || 4000;
// app.listen(PORT, () => console.log('Listening on port %d', PORT))
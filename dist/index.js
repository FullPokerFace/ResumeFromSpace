"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var next_1 = __importDefault(require("next"));
var pdfmake_1 = __importDefault(require("pdfmake"));
var dev = process.env.NODE_ENV !== "production";
var app = (0, next_1.default)({ dev: dev });
var handle = app.getRequestHandler();
var port = process.env.PORT || 3000;
// Define font files
var fonts = {
    Montserrat: {
        normal: __dirname + '/../fonts/Montserrat/Montserrat-Regular.ttf',
        bold: __dirname + '/../fonts/Montserrat/Montserrat-Medium.ttf',
        //   italics: __dirname + '/assets/fonts/Montserrat/Montserrat-Italic.ttf',
        //   bolditalics: __dirname + '/assets/fonts/Montserrat/Montserrat-MediumItalic.ttf'
    }
};
var docDefinition = {
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
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var server, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, app.prepare()];
            case 1:
                _a.sent();
                server = (0, express_1.default)();
                server.get("/download", function (request, response) {
                    var printer = new pdfmake_1.default(fonts);
                    var doc = printer.createPdfKitDocument(docDefinition);
                    var chunks = [];
                    var result;
                    doc.on('data', function (chunk) {
                        chunks.push(chunk);
                    });
                    doc.on('end', function () {
                        result = Buffer.concat(chunks);
                        response.contentType('application/pdf');
                        response.send(result);
                    });
                    doc.end();
                });
                server.all("*", function (req, res) {
                    return handle(req, res);
                });
                server.listen(port, function (err) {
                    if (err)
                        throw err;
                    console.log("> Ready on localhost:".concat(port, " - env ").concat(process.env.NODE_ENV));
                });
                return [3 /*break*/, 3];
            case 2:
                e_1 = _a.sent();
                console.error(e_1);
                process.exit(1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); })();
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

import pdfMake from "pdfmake";
import generateStyles from "../resumesCollection/Breeze/styles";
import backgroundImage from "../resumesCollection/Breeze/resumeBack.png";
import { Colors, Sections } from "../../../store/slices/formSlice";
import * as pdfjsLib from "pdfjs-dist/build/pdf";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

export const generatePDF = async (
  sections: Sections,
  content: any,
  colors: Colors
) => {
  const {
    personalInformation: {
      fields: { firstName, lastName, position, picture },
    },
  } = sections || {};

  const fontUrl = window.location.origin;
  // const bgImage = await imageToDataUrl(backgroundImage.src, 850, 1100);
  let docDefinition = {
    compress: false,
    content: content,
    styles: generateStyles({
      primaryColor: colors.primaryColor,
      secondaryColor: colors.secondaryColor,
    }),
    // background: {
    //   image: bgImage,
    //   width: 850,
    //   height: 1100,
    // },
    defaultStyle: {
      font: "Montserrat",
    },
    pageMargins: [60, 44, 60, 44],
    pageSize: {
      width: 850,
      height: 1100,
    },
  };

  return docDefinition;

  (pdfMake as any).fonts = {
    Montserrat: {
      normal: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // bolditalics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // italics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      bold: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Bold.ttf`,
    },
  };
  const pdfDocGenerator = (pdfMake as any).createPdf(docDefinition);
  pdfDocGenerator.open();
};

const imageToDataUrl = async (src, width, height) => {
  let tmpCanvas = document.createElement("canvas") as HTMLCanvasElement,
    tmpCtx = tmpCanvas.getContext("2d") as CanvasRenderingContext2D,
    image = new Image();
  image.src = src;

  await image.decode();
  tmpCanvas.width = width;
  tmpCanvas.height = height;
  tmpCtx.drawImage(image, 0, 0, width, height);
  return tmpCanvas.toDataURL();
};

export const updateResumeOnPage = async (
  sections,
  content,
  colors,
  ratio = 1
) => {
  const docDef = await generatePDF(sections, content, colors);
  const pdfDocGenerator = (pdfMake as any).createPdf(docDef);
  const fontUrl = window.location.origin;
  (pdfDocGenerator as any).fonts = {
    Montserrat: {
      normal: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // bolditalics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // italics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      bold: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Bold.ttf`,
    },
  };
  await pdfDocGenerator.getBlob(async (blob) => {
    const blobUrl = URL.createObjectURL(blob);

    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
    const loadingTask = pdfjsLib.getDocument(blobUrl);
    const pdf = await loadingTask.promise;
    const page = await pdf.getPage(1);
    let scale = ratio;
    let viewport = page.getViewport({ scale: scale });
    // Support HiDPI-screens.
    let outputScale = window.devicePixelRatio || 1;

    let canvas = document.getElementById("the-canvas") as HTMLCanvasElement;
    let context = canvas.getContext("2d");

    canvas.width = Math.floor(viewport.width * outputScale);
    canvas.height = Math.floor(viewport.height * outputScale);
    canvas.style.width = Math.floor(viewport.width) + "px";
    canvas.style.height = Math.floor(viewport.height) + "px";

    let transform =
      outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

    let renderContext = {
      canvasContext: context,
      transform: transform,
      viewport: viewport,
    };
    await page.render(renderContext);
  });
  return;
  // const response = await fetch("http://localhost:4000/renderPDF", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json;charset=utf-8",
  //   },
  //   body: JSON.stringify(docDef),
  // });
  // response.blob().then((myBlob) => {
  //   var blobUrl = URL.createObjectURL(myBlob);

  //   pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;
  //   var loadingTask = pdfjsLib.getDocument(blobUrl);
  //   loadingTask.promise.then(function (pdf) {
  //     pdf.getPage(1).then(function (page) {
  //       var scale = ratio;
  //       var viewport = page.getViewport({ scale: scale });
  //       // Support HiDPI-screens.
  //       var outputScale = window.devicePixelRatio || 1;

  //       var canvas = document.getElementById("the-canvas") as HTMLCanvasElement;
  //       var context = canvas.getContext("2d");

  //       canvas.width = Math.floor(viewport.width * outputScale);
  //       canvas.height = Math.floor(viewport.height * outputScale);
  //       canvas.style.width = Math.floor(viewport.width) + "px";
  //       canvas.style.height = Math.floor(viewport.height) + "px";

  //       var transform =
  //         outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : null;

  //       var renderContext = {
  //         canvasContext: context,
  //         transform: transform,
  //         viewport: viewport,
  //       };
  //       page.render(renderContext);
  //     });
  //   });

  //   if (triggerDownload) {
  //     var link = document.createElement("a"); // Or maybe get it from the current document
  //     link.href = blobUrl;
  //     link.download = "aDefaultFileName.pdf";
  //     document.body.appendChild(link); // Or append it whereever you want
  //     link.click();
  //   }
  // });
};

export const getRatio = (width, fullWidth) => {
  if (width < fullWidth) {
    return Number((+width / fullWidth).toFixed(3));
  }
  return 1;
};

export const openResumeInNewPage = (resumeId) => {
  open(`/viewPdf/${resumeId}`, "_blank");
};

export const updateResumeOnServer = async (
  content,
  styles,
  id,
  sections,
  user
) => {
  let canvas = document.getElementById("the-canvas") as HTMLCanvasElement;
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      content,
      styles,
      id,
      sections,
      thumbnail: canvas.toDataURL("png"),
      userID: user?._id,
    }),
  };
  await fetch("/updatePDF", options);
};

import pdfMake from "pdfmake";
import generateStyles from "../resumesCollection/Breeze/styles";
import backgroundImage from "../resumesCollection/Breeze/resumeBack.png";

export const generatePDF = async (sections: any, content: any) => {
  const {
    personalInformation: {
      fields: { firstName, lastName, position, picture },
    },
  } = sections || {};

  const fontUrl = window.location.origin;
  const bgImage = await imageToDataUrl(backgroundImage.src, 850, 1100);
  let docDefinition = {
    compress: false,
    content: content,
    styles: generateStyles({
      primaryColor: "#1F2937",
      secondaryColor: "#6B7280",
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
  (pdfMake as any).fonts = {
    Montserrat: {
      normal: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // bolditalics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // italics: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Regular.ttf`,
      // bold: `${fontUrl}/assets/fonts/Montserrat/Montserrat-Bold.ttf`,
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

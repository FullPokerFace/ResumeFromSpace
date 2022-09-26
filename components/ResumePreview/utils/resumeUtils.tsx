import pdfMake from "pdfMake";

console.log(pdfMake);

export const previewResume = (sections: any) => {
  const {
    personalInformation: {
      fields: { firstName, lastName, position, picture },
    },
  } = sections || {};
  const fontUrl = window.location.origin;
  let docDefinition = {
    compress: false,
    content: [
      // if you don't need styles, you can use a simple string to define a paragraph
      `${firstName.value}`,
      `${firstName.value}`,
      `${position.value}`,
    ],
    defaultStyle: {
      font: "Montserrat",
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
  const pdfDocGenerator = pdfMake.createPdf(docDefinition);
  pdfDocGenerator.getDataUrl((dataUrl: string) => {
    const iframe = document.getElementById(
      "resumePreviewPdf"
    ) as HTMLObjectElement;
    iframe.data = dataUrl;
  });
};

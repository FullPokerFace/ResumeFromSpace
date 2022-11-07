import pdfMake from "pdfmake";

export const generatePDF = (sections: any, content: any) => {
  const {
    personalInformation: {
      fields: { firstName, lastName, position, picture },
    },
  } = sections || {};

  const fontUrl = window.location.origin;
  let docDefinition = {
    compress: false,
    content: content,
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

export const downloadResume = () => {};

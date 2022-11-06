import pdfMake from "pdfmake";

export const generatePDF = (sections: any) => {
  const {
    personalInformation: {
      fields: { firstName, lastName, position, picture },
    },
  } = sections || {};

  const fontUrl = window.location.origin;
  let docDefinition = {
    compress: false,
    content: [`${firstName.value}`, `${firstName.value}`, `${position.value}`],
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
  const pdfDocGenerator = (pdfMake as any).createPdf(docDefinition);
  pdfDocGenerator.open({}, window);
};

export const downloadResume = () => {};

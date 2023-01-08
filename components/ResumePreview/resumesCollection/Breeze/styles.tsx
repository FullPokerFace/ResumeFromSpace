interface styleProps {
  primaryColor: string;
  secondaryColor: string;
}

const generateStyles = (props: styleProps) => {
  const { primaryColor, secondaryColor } = props || {};
  return {
    t1: {
      fontSize: 44,
      characterSpacing: 1.5,
      margin: [0, 8, 0, 18],
      lineHeight: 0.8,
      color: primaryColor,
    },
    t2: {
      fontSize: 19,
      characterSpacing: 0.5,
      color: secondaryColor,
      margin: [0, 0, 0, 20],
    },
    t3: {
      fontSize: 12,
      bold: true,
      color: primaryColor,
    },
    t4: {
      fontSize: 12,
      color: primaryColor,
    },
    t5: {
      fontSize: 20,
      color: primaryColor,
      margin: [0, 40, 0, 15],
      characterSpacing: 1,
    },
    t6: {
      fontSize: 12,
      color: secondaryColor,
      lineHeight: 1.25,
    },
    t7: {
      fontSize: 12,
      italics: true,
      margin: [0, 8],
      color: primaryColor,
    },
    t8: {
      fontSize: 12,
      color: secondaryColor,
      margin: [20, 4],
    },
    t9: {
      fontSize: 12,
      color: secondaryColor,
      margin: [0, 8],
      lineHeight: 1.25,
    },
    t10: {
      fontSize: 12,
      italics: true,
      margin: [0, 4],
      color: primaryColor,
    },
    svgLine: {
      margin: [0, 0, , 20],
    },
  };
};

export default generateStyles;

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
      margin: [0, 8],
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
      color: primaryColor,
    },
  };
};

export default generateStyles;

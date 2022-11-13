import photoPlaceholderImage from "../assets/img/photoPlaceholder.svg";

export const generateRoundPhoto = async (base64: string) => {
  // Adding photo
  let tmpCanvas = document.createElement("canvas") as HTMLCanvasElement,
    tmpCtx = tmpCanvas.getContext("2d") as CanvasRenderingContext2D,
    image = new Image();
  image.src = base64 || photoPlaceholderImage?.src;

  await image.decode();
  const diametr = 1000;
  tmpCanvas.width = diametr;
  tmpCanvas.height = diametr;

  // draw the cached images to temporary canvas and return the context
  tmpCtx.save();
  tmpCtx.beginPath();
  tmpCtx.arc(diametr / 2, diametr / 2, diametr / 2, 0, Math.PI * 2, true);
  tmpCtx.closePath();
  tmpCtx.clip();

  tmpCtx.drawImage(image, 0, 0, diametr, diametr);

  tmpCtx.beginPath();
  tmpCtx.arc(0, 0, 2, 0, Math.PI * 2, true);
  tmpCtx.clip();
  tmpCtx.closePath();
  tmpCtx.restore();
  return tmpCanvas.toDataURL();
};

export const drawImage = (id: string, base64: string, width: number = 0) => {
  // circle canvas' reference
  let circleCanvas = document.getElementById(id) as HTMLCanvasElement;
  let circleCtx = circleCanvas.getContext("2d") as CanvasRenderingContext2D;

  const img = new Image();
  const WIDTH = width;

  img.onload = () => {
    // draw image with circle shape clip
    circleCtx.save();
    circleCtx.beginPath();
    circleCtx.arc(WIDTH / 2, WIDTH / 2, (WIDTH - 2) / 2, 0, Math.PI * 2, false);
    circleCtx.strokeStyle = "#414141";
    circleCtx.stroke();
    circleCtx.clip();
    circleCtx.drawImage(img, 0, 0, WIDTH, WIDTH);
    circleCtx.restore();
  };
  if (!base64) {
    img.src = photoPlaceholderImage.src;
  } else {
    img.src = base64;
  }
  return base64;
};

export const combineName = (nameArray: string[]) => {
  return nameArray && nameArray.length > 0
    ? nameArray.join(" ").toUpperCase()
    : "";
};

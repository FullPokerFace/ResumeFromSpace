import photoPlaceholderImage from "../assets/img/photoPlaceholder.svg";

export const roundedImage = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
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
};

import { useEffect } from "react";
import { drawImage } from "../utils/formUtils";

export const PhotoInput = ({ title, value, onChange }: any) => {
  const handleImageChange = (e: React.FormEvent<HTMLInputElement>) => {
    const file = (e.target as HTMLInputElement).files?.[0] || null;
    if (!file) return;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      let base64data = reader.result;
      onChange({ target: { value: base64data } });
    };
  };

  useEffect(() => {
    drawImage("formPhotoCanvas", value, 75);
  }, [value]);

  return (
    <div key={title} className="flex gap-2 justify-center flex-wrap">
      <canvas width={75} height={75} id="formPhotoCanvas"></canvas>
      <div className="flex flex-col gap-y-2 items-start justify-center">
        <button className="bg-slate-800 px-4 py-2 rounded-md text-white relative hover:bg-slate-600">
          <input
            className="top-0 left-0 absolute w-full h-full opacity-0 z-10"
            type="file"
            onChange={handleImageChange}
          />
          Add Photo
        </button>
        <label htmlFor="" className="flex gap-2">
          <input type="checkbox" />
          Show photo
        </label>
      </div>
    </div>
  );
};

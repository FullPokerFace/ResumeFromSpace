import React from "react";

export const PhoneEmailWeb = () => {
  return (
    <div className="mt-[38px] flex">
      <span className="flex gap-[16px]">
        <span className="border-[1px] border-b-gray-600">{phoneSVG}</span>
        <span className="flex flex-col text-[12px] font-semibold">
          Phone
          <span className="text-[12px] font-light">347-677-2699</span>
        </span>
      </span>
    </div>
  );
};

const phoneSVG = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth="1.5"
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z"
    />
  </svg>
);

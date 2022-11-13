import { FC, ReactNode, useEffect, useRef, useState } from "react";

interface Props {
  open: boolean;
  className?: string;
  children: ReactNode;
}

const AnimatedHeightContainer: FC<Props> = (props) => {
  const { open, children, className } = props || {};

  const [maxH, setMaxH] = useState(0);
  const contentRef = useRef(null);

  const adjustHeight = () => {
    if (!contentRef?.current) return;
    const e: HTMLDivElement = contentRef?.current;
    setMaxH(e.scrollHeight || 0);
  };

  useEffect(() => {
    adjustHeight();
  }, [contentRef]);

  // Listen to window resize event and adjust
  useEffect(() => {
    window.addEventListener("resize", adjustHeight);
    return () => {
      window.removeEventListener("resize", adjustHeight);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      style={
        open
          ? { maxHeight: `${maxH}px`, paddingTop: "0" }
          : { maxHeight: 0, paddingTop: 0 }
      }
      className={`transition-all overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default AnimatedHeightContainer;

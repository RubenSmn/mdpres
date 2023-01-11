import React from "react";
import { SizeTable } from "./constants";
import SlideProvider from "./SlideProvider";

interface SlideProps {
  content: React.ReactNode;
  currentSlideIndex: number;
  slideIndex: number;
  subSlideIndex: number;
  translateAxis: string;
  size: keyof typeof SizeTable;
}

const Slide: React.FC<SlideProps> = ({
  content,
  currentSlideIndex,
  slideIndex,
  subSlideIndex,
  translateAxis,
  size,
}) => {
  let translateValue = "100%";

  if (currentSlideIndex > slideIndex) {
    translateValue = "-100%";
  } else if (currentSlideIndex < slideIndex) {
    translateValue = "100%";
  } else if (currentSlideIndex === slideIndex) {
    translateValue = "0%";
  }

  return (
    <SlideProvider
      value={{
        subSlideIndex: currentSlideIndex === slideIndex ? subSlideIndex : 0,
      }}
    >
      <div
        className="slide"
        style={{
          transform: `translate${translateAxis}(${translateValue})`,
        }}
      >
        <div className="markdown-body">
          <div
            style={{
              width: SizeTable[size],
            }}
          >
            {content}
          </div>
        </div>
      </div>
    </SlideProvider>
  );
};

export default Slide;

import React from "react";
import { SizeTable } from "../constants";
import { useSlideContext } from "./SlideProvider";
import SubSlideProvider from "./SubSlideProvider";

interface SlideProps {
  content: React.ReactNode;
  slideIndex: number;
  translateAxis: string;
  size: keyof typeof SizeTable;
}

const Slide: React.FC<SlideProps> = ({
  content,
  slideIndex,
  translateAxis,
  size,
}) => {
  const { currentSlideIndex, subSlideIndex } = useSlideContext();

  let translateValue = "100%";

  if (currentSlideIndex > slideIndex) {
    translateValue = "-100%";
  } else if (currentSlideIndex < slideIndex) {
    translateValue = "100%";
  } else if (currentSlideIndex === slideIndex) {
    translateValue = "0%";
  }

  return (
    <div
      className="slide"
      style={{
        transform: `translate${translateAxis}(${translateValue})`,
      }}
    >
      <div className="markdown-body">
        <div
          style={{
            width: SizeTable[size] || SizeTable["md"],
          }}
        >
          <SubSlideProvider
            value={{
              subSlideIndex:
                currentSlideIndex === slideIndex ? subSlideIndex : 0,
            }}
          >
            {content}
          </SubSlideProvider>
        </div>
      </div>
    </div>
  );
};

export default Slide;

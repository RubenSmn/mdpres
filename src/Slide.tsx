import React from "react";
import SlideProvider from "./SlideProvider";

interface SlideProps {
  content: React.ReactNode;
  currentSlideIndex: number;
  slideIndex: number;
  subSlideIndex: number;
  translateAxis: string;
}

const Slide: React.FC<SlideProps> = ({
  content,
  currentSlideIndex,
  slideIndex,
  subSlideIndex,
  translateAxis,
}) => {
  let translateValue = "100%";

  if (currentSlideIndex - 1 === slideIndex) {
    translateValue = "-100%";
  } else if (currentSlideIndex + 1 === slideIndex) {
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
      <section
        className="slide"
        style={{
          transform: `translate${translateAxis}(${translateValue})`,
        }}
      >
        <div className="markdown-body">{content}</div>
      </section>
    </SlideProvider>
  );
};

export default Slide;

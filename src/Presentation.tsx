import React, { useCallback, useEffect, useState } from "react";
import Slide from "./Slide";

interface PresentationProps {
  slides: any;
}

const translateAxis = "X";

const Presentation: React.FC<PresentationProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [subSlideIndex, setSubSlideIndex] = useState(0);

  const changeSlideIndexByValue = useCallback(
    (delta: number, skipSubs: boolean) => {
      const highlightCount = slides[currentSlideIndex].highlightCount;
      if (
        subSlideIndex + delta < highlightCount &&
        subSlideIndex + delta >= 0 &&
        skipSubs === false
      ) {
        setSubSlideIndex((prevIndex) => {
          return prevIndex + delta;
        });
      } else {
        setCurrentSlideIndex((prevIndex) => {
          const newIndex = prevIndex + delta;
          if (newIndex < 0) return prevIndex;
          if (newIndex > slides.length - 1) return prevIndex;
          return newIndex;
        });
        setSubSlideIndex(0);
      }
    },
    [slides, currentSlideIndex, subSlideIndex, setSubSlideIndex],
  );

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          changeSlideIndexByValue(-1, e.shiftKey);
          break;
        case "ArrowRight":
          changeSlideIndexByValue(1, e.shiftKey);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [changeSlideIndexByValue]);

  return (
    <main
      className="slides"
      style={{
        width: "100%",
      }}
    >
      {slides.map((slide: any, idx: number) => {
        return (
          <Slide
            key={`slide-${idx}`}
            currentSlideIndex={currentSlideIndex}
            content={slide.markdown}
            slideIndex={idx}
            subSlideIndex={subSlideIndex}
            translateAxis={translateAxis}
          />
        );
      })}
    </main>
  );
};

export default Presentation;

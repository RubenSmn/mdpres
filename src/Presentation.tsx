import React, { useCallback, useEffect, useState } from "react";
import ControlButtons from "./ControlButtons";
import Progress from "./Progress";
import Slide from "./Slide";
import "./styles/presentation.css";

export interface ISlide {
  content: string;
  subSlideCount: number;
  markdown?: React.ReactNode;
  title?: string;
}

interface PresentationProps {
  slides: ISlide[];
}

const translateAxis = "X";

const Presentation: React.FC<PresentationProps> = ({ slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [subSlideIndex, setSubSlideIndex] = useState(0);

  const changeSlideIndexByValue = useCallback(
    (delta: number, skipSubs: boolean) => {
      const subSlideCount = slides[currentSlideIndex].subSlideCount;
      if (
        subSlideIndex + delta < subSlideCount &&
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
          document.getSelection()?.removeAllRanges();
          break;
        case "ArrowRight":
          changeSlideIndexByValue(1, e.shiftKey);
          document.getSelection()?.removeAllRanges();
          break;
        default:
          break;
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [changeSlideIndexByValue]);

  return (
    <>
      <div className="slides">
        {slides.map((slide: ISlide, idx: number) => {
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
      </div>
      <ControlButtons
        onLeftClick={() => changeSlideIndexByValue(-1, false)}
        onRightClick={() => changeSlideIndexByValue(1, false)}
      />
      <Progress
        slides={slides}
        currentSlideIndex={currentSlideIndex}
        subSlideIndex={subSlideIndex}
      />
    </>
  );
};

export default Presentation;

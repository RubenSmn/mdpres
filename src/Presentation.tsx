import React, { useCallback, useState } from "react";
import ControlButtons from "./ControlButtons";
import { useSlideKeyHandler } from "./hooks/useSlideNavigation";
import { ISlide } from "./interfaces/ISlide";
import NoteWindow from "./NoteWindow";
import Progress from "./Progress";
import Slide from "./Slide";
import "./styles/presentation.css";

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

  useSlideKeyHandler(changeSlideIndexByValue);

  return (
    <>
      <div className="slides">
        {slides.map((slide: ISlide, idx: number) => {
          return (
            <Slide
              key={`slide-${idx}`}
              size={slide.size}
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
      <NoteWindow
        notes={slides[currentSlideIndex].notes}
        slideIndex={currentSlideIndex}
        slideTitle={slides[currentSlideIndex].title || "No Slide title"}
      />
    </>
  );
};

export default Presentation;

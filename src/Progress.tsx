import React, { useMemo } from "react";
import { ISlide } from "./Presentation";

interface ProgressProps {
  currentSlideIndex: number;
  subSlideIndex: number;
  slides: ISlide[];
}

const Progress: React.FC<ProgressProps> = ({
  currentSlideIndex,
  subSlideIndex,
  slides,
}) => {
  const totalSlides = useMemo(
    () =>
      slides.reduce((total, slide) => {
        return total + slide.subSlideCount;
      }, 0),
    [slides],
  );

  const currentProgress = slides.reduce(
    (progress: number, slide: ISlide, idx: number) => {
      if (idx < currentSlideIndex) {
        return progress + slide.subSlideCount;
      } else if (idx === currentSlideIndex) {
        return progress + subSlideIndex;
      }
      return progress;
    },
    1,
  );

  return (
    <div className="progress-container">
      <div
        style={{
          width: `${(currentProgress / totalSlides) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default Progress;

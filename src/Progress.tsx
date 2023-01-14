import React, { useMemo } from "react";
import { SlideType } from "./types";

interface ProgressProps {
  currentSlideIndex: number;
  subSlideIndex: number;
  slides: SlideType[];
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
    (progress: number, slide: SlideType, idx: number) => {
      if (idx < currentSlideIndex) {
        return progress + slide.subSlideCount;
      } else if (idx === currentSlideIndex) {
        return progress + subSlideIndex;
      }
      return progress;
    },
    0,
  );

  return (
    <div className="progress-container">
      <div
        style={{
          width: `${(currentProgress / (totalSlides - 1)) * 100}%`,
        }}
      ></div>
    </div>
  );
};

export default Progress;

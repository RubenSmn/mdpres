import React, { useState } from "react";
import ControlButtons from "./ControlButtons";
import { useSlideKeyHandler } from "../hooks/useSlideNavigation";
import { SlideType } from "../types";
import Menu from "./Menu";
import NoteWindow from "./NoteWindow";
import Progress from "./Progress";
import {
  changeCurrentSlideToValue,
  changeSubSlideByValue,
  changeSubSlideToValue,
} from "../reducers/slideReducer";
import Slide from "./Slide";
import SlideProvider, {
  useSlideContext,
  useSlideDispatch,
} from "./SlideProvider";
import { useAppContext } from "./AppProvider";

const translateAxis = "X";

const Presentation = () => {
  const { slides } = useAppContext();
  const { currentSlideIndex, subSlideIndex } = useSlideContext();
  const { dispatch } = useSlideDispatch();
  const [showNotes, setShowNotes] = useState(true);
  const [direction, setDirection] = useState(0);

  const changeSlideIndexByValue = (delta: number, skipSubs: boolean) => {
    setDirection(delta);
    const subSlideCount = slides[currentSlideIndex].subSlideCount;
    if (
      subSlideIndex + delta < subSlideCount &&
      subSlideIndex + delta >= 0 &&
      skipSubs === false
    ) {
      dispatch(changeSubSlideByValue(delta));
    } else {
      const newIndex = currentSlideIndex + delta;
      changeSlideIndex(newIndex);
      if (subSlideIndex > 0) dispatch(changeSubSlideToValue(0));
    }
  };

  useSlideKeyHandler(changeSlideIndexByValue);

  const changeSlideIndex = (index: number) => {
    if (index >= 0 && index < slides.length) {
      dispatch(changeCurrentSlideToValue(index));
    }
  };

  const onCommandShowNotes = (shouldShowNotes: boolean) => {
    setShowNotes(shouldShowNotes);
  };

  const onCommandSlideChange = (slideIndex: number, subIndex: number) => {
    if (slideIndex >= 0 && slideIndex < slides.length) {
      dispatch(changeCurrentSlideToValue(slideIndex));

      const subSlideCount = slides[slideIndex].subSlideCount;
      if (subIndex >= 0 && subIndex < subSlideCount) {
        dispatch(changeSubSlideToValue(subIndex));
      }
    }
  };

  return (
    <>
      <div className="slides">
        {slides.map((slide: SlideType, idx: number) => {
          return (
            <Slide
              key={`slide-${idx}`}
              size={slide.size || "md"}
              content={slide.markdown}
              slideIndex={idx}
              translateAxis={translateAxis}
            />
          );
        })}
      </div>
      <ControlButtons
        onClick={(d) => changeSlideIndexByValue(d, false)}
        direction={direction}
      />
      <Progress slides={slides} />
      <NoteWindow
        notes={slides[currentSlideIndex].notes}
        slideIndex={currentSlideIndex}
        slideTitle={slides[currentSlideIndex].title || "No Slide title"}
        showNotes={showNotes}
        setShowNotes={setShowNotes}
      />
      <Menu
        onCommandSlideChange={onCommandSlideChange}
        onCommandShowNotes={onCommandShowNotes}
      />
    </>
  );
};

export default function WithProvider() {
  return (
    <SlideProvider>
      <Presentation />
    </SlideProvider>
  );
}

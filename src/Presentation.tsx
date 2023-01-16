import React, { useCallback, useReducer } from "react";
import ControlButtons from "./ControlButtons";
import { useSlideKeyHandler } from "./hooks/useSlideNavigation";
import { SlideType } from "./types";
import Menu from "./Menu";
import NoteWindow from "./NoteWindow";
import Progress from "./Progress";
import slideReducer, {
  changeCurrentSlideToValue,
  changeSubSlideByValue,
  changeSubSlideToValue,
  SlideStateType,
} from "./reducers/slideReducer";
import Slide from "./Slide";
import "./styles/presentation.css";

interface PresentationProps {
  slides: SlideType[];
}

const translateAxis = "X";

const initialState: SlideStateType = {
  currentSlideIndex: 0,
  subSlideIndex: 0,
};

const Presentation: React.FC<PresentationProps> = ({ slides }) => {
  const [{ currentSlideIndex, subSlideIndex }, dispatch] = useReducer(
    slideReducer,
    initialState,
  );

  const changeSlideIndexByValue = (delta: number, skipSubs: boolean) => {
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
      <Menu onCommandSlideChange={onCommandSlideChange} />
    </>
  );
};

export default Presentation;

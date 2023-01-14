import React, { useCallback, useReducer } from "react";
import ControlButtons from "./ControlButtons";
import { useSlideKeyHandler } from "./hooks/useSlideNavigation";
import { ISlide } from "./interfaces/ISlide";
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
  slides: ISlide[];
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

  const changeSubIndex = (index: number) => {
    const subSlideCount = slides[currentSlideIndex].subSlideCount;
    if (index >= 0 && index <= subSlideCount) {
      dispatch(changeSubSlideToValue(index));
    }
  };

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
      <Menu
        changeSlideIndex={changeSlideIndex}
        changeSubIndex={changeSubIndex}
      />
    </>
  );
};

export default Presentation;

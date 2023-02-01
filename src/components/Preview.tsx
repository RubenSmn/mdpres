import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router-dom";
import { SizeTable } from "../constants";
import { useSlideKeyHandler } from "../hooks/useSlideNavigation";
import { SlideType } from "../types";
import { useAppContext } from "./AppProvider";
import ErrorPage from "./Error";
import Header from "./Header";

const Preview = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const { slides } = useAppContext();
  const navigate = useNavigate();

  const scrollRefs = useRef(
    [...Array(slides.length).keys()].map((_) => createRef<HTMLDivElement>()),
  );

  const changeSlideIndexByValue = useCallback(
    (delta: number) => {
      setCurrentSlideIndex((prevIndex) => {
        const newIndex = prevIndex + delta;
        if (newIndex < 0 || newIndex >= slides.length) return prevIndex;
        return newIndex;
      });
    },
    [slides.length],
  );

  useSlideKeyHandler(changeSlideIndexByValue);

  const scrollSmoothHandler = useCallback(
    (index: number) => {
      if (scrollRefs.current.length < 1) return;

      scrollRefs.current[index].current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    },
    [scrollRefs],
  );

  useEffect(() => {
    scrollSmoothHandler(currentSlideIndex);
  }, [currentSlideIndex, scrollSmoothHandler]);

  const handleStartPresenting = () => {
    navigate("/presentation");
  };

  return slides.length > 0 ? (
    <>
      <Header />
      <section>
        <h3>Slide Preview</h3>
        <button className="button" onClick={handleStartPresenting}>
          Start Presenting
        </button>
        <div className="slides-preview">
          {slides.map((slide: SlideType, idx: number) => {
            return (
              <div
                key={`preview-slide-${idx}`}
                className="slide"
                style={{
                  width: SizeTable[slide.size || "md"],
                }}
                ref={scrollRefs.current[idx]}
              >
                <span
                  className={`slide-preview-number${
                    currentSlideIndex === idx ? " active" : ""
                  }`}
                >
                  {idx + 1}
                </span>
                <div className="markdown-body">{slide.markdown}</div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  ) : (
    <ErrorPage
      title="Oops, it looks like you have no slides uploaded yet!"
      textAfterLink="and upload your slides"
    />
  );
};

export default Preview;

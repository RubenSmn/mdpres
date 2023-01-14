import React, {
  createRef,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { SizeTable } from "./constants";
import { useSlideKeyHandler } from "./hooks/useSlideNavigation";
import { SlideType } from "./types";

interface PreviewProps {
  startPresenting: () => void;
  slides: SlideType[];
}

const Preview: React.FC<PreviewProps> = ({ startPresenting, slides }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

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

  return (
    <section>
      <h3>Slide Preview</h3>
      <button className="button" onClick={startPresenting}>
        Start Presenting
      </button>
      <div className="slides-preview">
        {slides.map((slide: SlideType, idx: number) => {
          return (
            <div
              key={`preview-slide-${idx}`}
              className="slide"
              style={{
                width: slide.size ? SizeTable[slide.size] : 992,
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
  );
};

export default Preview;

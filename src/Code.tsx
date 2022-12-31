import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSlideContext } from "./SlideProvider";

const Code: React.FC<any> = ({ children, data }) => {
  const lineOffset = 1;
  const { subSlideIndex } = useSlideContext();

  const ranges = useMemo(() => {
    if (data === undefined || data.meta === undefined)
      return [[1, children.length]];

    const newRanges = data.meta.split("|").map((subSlide: string) => {
      if (subSlide === "") return [1, children.length];
      return subSlide.split("-").map((point: string) => parseInt(point));
    });
    return newRanges;
  }, [children.length, data]);

  const isInRange = (value: number) => {
    const range = ranges[subSlideIndex];
    if (range.length === 1 && range[0] === value + lineOffset) return true;
    if (value + lineOffset >= range[0] && value + lineOffset <= range[1])
      return true;
    return false;
  };

  // ref array with all the span ref for scroll into view
  const scrollRefs = useRef(
    [...Array(children.length).keys()].map((_) => createRef<HTMLSpanElement>()),
  );

  // calculate the current range difference
  const rangeDiff =
    ranges[subSlideIndex].length > 1
      ? ranges[subSlideIndex][1] - ranges[subSlideIndex][0]
      : 0;

  // scroll handler for the subslides
  const scrollSmoothHandler = useCallback(
    (index: number) => {
      if (scrollRefs.current.length < 1) return;
      const centerIndex = Math.floor(index / 2);
      if (centerIndex > 1 && rangeDiff < 4) index = index + centerIndex;

      scrollRefs.current[index].current?.scrollIntoView({
        behavior: "smooth",
        // if there are less than 4 lines in the range then just center
        block: rangeDiff < 4 ? "center" : "start",
      });
    },
    [scrollRefs, rangeDiff],
  );

  useEffect(() => {
    // run the scroll handler when the subSlideIndex changes
    scrollSmoothHandler(ranges[subSlideIndex][0] - 1);
  }, [subSlideIndex, ranges, scrollSmoothHandler]);

  return (
    <code
      style={{
        height: 7 * 24,
        display: "block",
        overflowY: "scroll",
      }}
    >
      {children.map((line: React.ReactNode, idx: number) => {
        return (
          <span
            className={["code-line", !isInRange(idx) && "blurred"].join(" ")}
            key={`line-${idx}`}
            ref={scrollRefs.current[idx]}
          >
            <span className="code-line line-number">{idx + lineOffset}</span>
            {line}
          </span>
        );
      })}
    </code>
  );
};

export default Code;

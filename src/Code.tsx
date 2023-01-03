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
      // if the subslides start with |2-4|... then the initial slide should show all
      if (subSlide === "") return [1, children.length];
      return subSlide.split("-").map((point: string) => parseInt(point));
    });
    return newRanges;
  }, [children.length, data]);

  const isInRange = (value: number) => {
    const currentRange = ranges[subSlideIndex];
    // checks for one line
    if (currentRange.length === 1 && currentRange[0] === value + lineOffset)
      return true;
    // checks for multiple lines
    if (
      value + lineOffset >= currentRange[0] &&
      value + lineOffset <= currentRange[1]
    )
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

  // code line vars
  const lineHeight = 24;
  const visibleLineCount = 10;
  const codeHeight =
    children.length > visibleLineCount
      ? visibleLineCount * lineHeight
      : children.length * lineHeight;

  // scroll handler for the subslides
  const scrollSmoothHandler = useCallback(
    (index: number) => {
      if (scrollRefs.current.length < 1) return;
      const centerIndex = Math.floor(index / 2);
      if (centerIndex > 1 && rangeDiff < visibleLineCount)
        index = index + centerIndex - 1;

      scrollRefs.current[index].current?.scrollIntoView({
        behavior: "smooth",
        // if there are less than 4 lines in the range then just center
        block: rangeDiff < visibleLineCount ? "center" : "start",
      });
    },
    [scrollRefs, rangeDiff],
  );

  useEffect(() => {
    // run the scroll handler when the subSlideIndex changes
    if (subSlideIndex === 0) return;
    scrollSmoothHandler(ranges[subSlideIndex][0] - 1);
  }, [subSlideIndex, ranges, scrollSmoothHandler]);

  return (
    <code
      style={{
        height: codeHeight,
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

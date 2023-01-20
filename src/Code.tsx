import React, {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { useSubSlideContext } from "./SubSlideProvider";

const Code: React.FC<any> = ({ children, data }) => {
  const lineOffset = data?.lineOffset || 1;
  const visibleLineCount = data?.visibleLineCount || 10;
  const ranges = useMemo(() => data?.ranges || [[1, Infinity]], [data?.ranges]);
  const { subSlideIndex } = useSubSlideContext();
  const codeRef = useRef<HTMLElement>(null);

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
  const codeHeight =
    children.length > visibleLineCount
      ? visibleLineCount * lineHeight
      : children.length * lineHeight;

  // scroll handler for the subslides
  const scrollSmoothHandler = useCallback(
    (index: number) => {
      if (scrollRefs.current.length < 1) return;
      const centerIndex = Math.floor(rangeDiff / 2) + index;

      scrollRefs.current[centerIndex].current?.scrollIntoView({
        behavior: "smooth",
        // if there are less than 4 lines in the range then just center
        block: rangeDiff < visibleLineCount ? "center" : "start",
      });
    },
    [scrollRefs, rangeDiff, visibleLineCount],
  );

  useEffect(() => {
    // if there not more children than can be visible no need to run scrollIntoView
    if (children.length <= visibleLineCount) return;

    // set scroll to top if subSlideIndex is zero
    if (subSlideIndex === 0 && codeRef.current) {
      codeRef.current.scrollTop = 0;
      return;
    }
    // run the scroll handler when the subSlideIndex changes
    // needs delay for handling changes from command mode
    const timeout = setTimeout(() => {
      scrollSmoothHandler(ranges[subSlideIndex][0] - 1);
    }, 250); // the time of the 'code-line' transition
    return () => clearTimeout(timeout);
  }, [
    children.length,
    visibleLineCount,
    subSlideIndex,
    ranges,
    scrollSmoothHandler,
  ]);

  return (
    <code
      style={{
        height: codeHeight,
        display: "block",
        overflowY: "scroll",
      }}
      ref={codeRef}
    >
      {children.map((line: React.ReactNode, idx: number) => {
        // subtract lineOffset since subSlideIndex does not change
        // add one since linenumbers always start at 1 instead of 0
        const inRangeIndex = idx - lineOffset + 1;
        const className = `code-line${
          !isInRange(inRangeIndex) ? " blurred" : ""
        }`;

        return (
          <span
            className={className}
            key={`line-${idx}`}
            ref={scrollRefs.current[idx]}
          >
            <span className="line-number">{idx + lineOffset}</span>
            {line}
          </span>
        );
      })}
    </code>
  );
};

export default Code;

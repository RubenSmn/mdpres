import React, { useMemo } from "react";
import { useSlideContext } from "./SlideProvider";

const Code: React.FC<any> = ({ children, data }) => {
  const lineOffset = 1;
  const { subSlideIndex } = useSlideContext();

  const ranges = useMemo(() => {
    if (data === undefined || data.meta === undefined)
      return [[0, children.length]];

    const newRanges = data.meta.split("|").map((subSlide: string) => {
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

  return (
    <code>
      {children.map((line: any, idx: number) => {
        return (
          <span
            className={["code-line", !isInRange(idx) && "blurred"].join(" ")}
            key={`line-${idx}`}
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

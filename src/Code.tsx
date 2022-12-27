import React from "react";

const Code: React.FC<any> = ({ children, data }) => {
  let range = [0, children.length];
  const lineOffset = 1;

  if (data !== undefined && data.meta !== undefined) {
    const ranges = data.meta.split("-").map((point: string) => parseInt(point));
    range = ranges;
  }

  const isInRange = (value: number) => {
    if (value >= range[0] && value < range[1]) return true;
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

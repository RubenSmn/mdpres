import React from "react";

const Code: React.FC<any> = ({ children, data, className }) => {
  return (
    <code>
      {children.map((line: any, idx: number) => {
        return (
          <span
            className="wenky-line"
            style={{
              display: "flex",
              lineHeight: "24px",
            }}
            key={`line-${idx}`}
          >
            {line}
          </span>
        );
      })}
    </code>
  );
};

export default Code;

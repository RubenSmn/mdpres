import React, { useEffect } from "react";
// import "./../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.js";
// import "./../node_modules/prismjs/plugins/line-numbers/prism-line-numbers.css";

// import "./../node_modules/prismjs/plugins/line-highlight/prism-line-highlight.js";
// import "./../node_modules/prismjs/plugins/line-highlight/prism-line-highlight.css";

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

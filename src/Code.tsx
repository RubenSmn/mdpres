import React, { useEffect } from "react";
import Prism from "prismjs";

const Code: React.FC<any> = ({ children, className }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [className, children]);

  return (
    <code key={children} className={className}>
      {children}
    </code>
  );
};

export default Code;

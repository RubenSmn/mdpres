import React, { useEffect, useRef } from "react";

interface ControlButtonsProps {
  onClick: (direction: number) => void;
  direction: number;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onClick,
  direction,
}) => {
  const leftRef = useRef<HTMLButtonElement | null>(null);
  const rightRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (direction === 0) return;
    let button: HTMLButtonElement | null = null;
    if (direction > 0) button = rightRef.current;
    if (direction < 0) button = leftRef.current;

    if (button === null) return;

    button.classList.add("active");
    const t = setTimeout(() => {
      button?.classList.remove("active");
    }, 300); // 1.5 transition speed
    return () => clearTimeout(t);
  }, [direction, onClick]);

  return (
    <div className="control-buttons">
      <button
        className="arrow left"
        ref={leftRef}
        onClick={() => onClick(-1)}
      ></button>
      <button
        className="arrow right"
        ref={rightRef}
        onClick={() => onClick(1)}
      ></button>
    </div>
  );
};

export default ControlButtons;

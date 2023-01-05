import React from "react";

interface ControlButtonsProps {
  onLeftClick: () => void;
  onRightClick: () => void;
}

const ControlButtons: React.FC<ControlButtonsProps> = ({
  onLeftClick,
  onRightClick,
}) => {
  return (
    <div className="control-buttons">
      <button className="arrow left" onClick={onLeftClick}></button>
      <button className="arrow right" onClick={onRightClick}></button>
    </div>
  );
};

export default ControlButtons;

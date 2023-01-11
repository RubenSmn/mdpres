import { useEffect } from "react";

export const useSlideKeyHandler = (
  callback: (delta: number, isShiftPressed: boolean) => void,
) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      document.getSelection()?.removeAllRanges();
      switch (e.key) {
        case "ArrowLeft":
          callback(-1, e.shiftKey);
          break;
        case "ArrowRight":
          callback(1, e.shiftKey);
          break;
        case "h":
          callback(-1, e.shiftKey);
          break;
        case "l":
          callback(1, e.shiftKey);
          break;
        case "k":
          callback(-1, e.shiftKey);
          break;
        case "j":
          callback(1, e.shiftKey);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [callback]);
};

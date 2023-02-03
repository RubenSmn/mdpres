import { useEffect } from "react";

export const useSlideKeyHandler = (
  callback: (delta: number, isShiftPressed: boolean) => void,
) => {
  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (document.activeElement?.matches("input")) return;
      document.getSelection()?.removeAllRanges();
      switch (e.key) {
        case "ArrowLeft":
        case "h":
        case "k":
          callback(-1, e.shiftKey);
          break;
        case "ArrowRight":
        case "l":
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

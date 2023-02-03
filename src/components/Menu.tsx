import React, { useEffect, useRef, useState } from "react";

interface MenuProps {
  onCommandSlideChange: (slideIndex: number, subIndex: number) => void;
  onCommandShowNotes: (shouldShowNotes: boolean) => void;
}

const Menu: React.FC<MenuProps> = ({
  onCommandSlideChange,
  onCommandShowNotes,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [commandValue, setCommandValue] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCommandValue(value);
  };

  const handleAction = (e: React.FormEvent) => {
    e.preventDefault();
    const lowerCaseValue = commandValue.toLowerCase();
    if (lowerCaseValue === "help" || lowerCaseValue === "h") {
      window.open("/getting-started");
    } else if (lowerCaseValue === "show notes" || lowerCaseValue === "sn") {
      onCommandShowNotes(true);
    } else if (lowerCaseValue === "hide notes" || lowerCaseValue === "hn") {
      onCommandShowNotes(false);
    } else {
      const result = lowerCaseValue.match(
        /(?<slideIndex>\d+)(?:\:(?<subIndex>\d+))?/m,
      );
      const slideIndex = result?.groups?.slideIndex
        ? parseInt(result?.groups?.slideIndex) - 1
        : 0;
      const subIndex = result?.groups?.subIndex
        ? parseInt(result?.groups?.subIndex) - 1
        : 0;

      onCommandSlideChange(slideIndex, subIndex);
    }

    setCommandValue("");
    setIsOpen(false);
    if (inputRef.current) inputRef.current.blur();
  };

  useEffect(() => {
    const handleMenu = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setIsOpen((prev) => !prev);
      setCommandValue("");
    };

    window.addEventListener("keyup", handleMenu);

    return () => window.removeEventListener("keyup", handleMenu);
  }, []);

  useEffect(() => {
    if (inputRef.current === null || isOpen === false) return;
    inputRef.current.focus();
  }, [isOpen]);

  return isOpen ? (
    <div className="menu-overlay">
      <div className="menu">
        <form onSubmit={handleAction}>
          <input
            type="text"
            placeholder="3 <enter> to go to slide 3"
            ref={inputRef}
            onChange={handleChange}
            value={commandValue}
          />
        </form>
      </div>
    </div>
  ) : null;
};

export default Menu;

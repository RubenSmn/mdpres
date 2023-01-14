import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { SlideType } from "./types";
import "./styles/notes.css";
import { copyDocumentStyles } from "./utils";

interface NoteWindowProps {
  notes: SlideType["notes"];
  slideIndex: number;
  slideTitle: string;
}

const NoteWindow: React.FC<NoteWindowProps> = ({
  notes,
  slideIndex,
  slideTitle,
}) => {
  const [container, setContainer] = useState<HTMLDivElement | null>(null);
  const noteWindow = useRef<Window | null>(null);

  useEffect(() => {
    // create container element on client-side
    setContainer(document.createElement("div"));
  }, []);

  useEffect(() => {
    // when container is ready
    if (container !== null) {
      // create window
      noteWindow.current = window.open(
        "",
        "",
        "width=600,height=400,left=200,top=200",
      );
      // append container
      noteWindow.current?.document.body.appendChild(container);

      // save reference to window for cleanup
      const curWindow = noteWindow.current;

      // copy the styles from current window to noteWindow
      if (curWindow?.document)
        copyDocumentStyles(window.document, curWindow.document);

      // return cleanup function
      return () => curWindow?.close();
    }
  }, [container]);

  if (container !== null) {
    const notesElement =
      notes.length > 0 ? (
        <ul className="slide-note-list">
          {notes.map((note) => (
            <li key={note}>{note}</li>
          ))}
        </ul>
      ) : (
        <p>No notes</p>
      );
    return createPortal(
      <div className="slide-notes">
        <span className="slide-number">
          {slideIndex} - {slideTitle}
        </span>
        {notesElement}
      </div>,
      container,
    );
  }

  return null;
};

export default NoteWindow;

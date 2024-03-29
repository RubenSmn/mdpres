import React, { useRef, useState } from "react";
import { redirect, useNavigate } from "react-router-dom";
import { SlideType } from "../types";
import { processMarkdownFile, markdownToReact } from "../utils";
import { useAppContextDispatch } from "./AppProvider";

const readMarkdownFile = (
  e: React.ChangeEvent<HTMLInputElement>,
  cb: any,
): string | null => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result;
    const res = processMarkdownFile(text as string);
    cb(res);
  };

  const files = e.target.files;
  if (files === null) return "No file found";
  if (!/[a-zA-Z0-9]*\.md/.test(files[0].name))
    return "File not of type Markdown(md)";
  reader.readAsText(files[0]);
  return null;
};

const Input = () => {
  const { setSlides } = useAppContextDispatch();
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileError = readMarkdownFile(e, (res: SlideType[]) => {
      console.warn(res);
      res.forEach((slide: SlideType) => {
        const markdownAsReact = markdownToReact(slide.content);
        console.warn(markdownAsReact);
        slide.markdown = markdownAsReact;
      });
      setSlides(res);
    });
    setError(fileError);
    navigate("/preview");
  };

  const handleLabel = (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" || inputRef.current === null) return;
    inputRef.current.click();
  };

  return (
    <>
      <div>
        <label
          className="button"
          htmlFor="fileUploadInput"
          tabIndex={0}
          onKeyUp={handleLabel}
        >
          Upload File
        </label>
        <input
          ref={inputRef}
          id="fileUploadInput"
          type="file"
          onChange={handleChange}
          name="presentation-file"
          accept=".md"
        />
      </div>
      {error !== null && <p>{error}</p>}
    </>
  );
};

export default Input;

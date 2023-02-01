import React, { useRef, useState } from "react";
import { SlideType } from "../types";
import { processMarkdownFile, markdownToReact } from "../utils";

interface InputProps {
  setSlides: React.Dispatch<React.SetStateAction<SlideType[]>>;
}

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

const Input: React.FC<InputProps> = ({ setSlides }) => {
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileError = readMarkdownFile(e, (res: SlideType[]) => {
      res.forEach((slide: SlideType) => {
        const markdownAsReact = markdownToReact(slide.content);
        slide.markdown = markdownAsReact;
      });
      console.log(res);
      setSlides(res);
    });
    setError(fileError);
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

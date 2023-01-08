import React, { useState } from "react";
import { processMarkdownContent } from "./hooks";
import { ISlide } from "./Presentation";
import { processMarkdownFile } from "./utils/markdown";

interface InputProps {
  setSlides: React.Dispatch<React.SetStateAction<ISlide[]>>;
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

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileError = readMarkdownFile(e, (res: ISlide[]) => {
      res.forEach((slide: ISlide) => {
        const md = processMarkdownContent(slide.content);
        slide.markdown = md;
      });
      console.log(res);
      setSlides(res);
    });
    setError(fileError);
  };

  return (
    <>
      <input
        type="file"
        onChange={handleChange}
        name="presentation-file"
        accept=".md"
      />
      {error !== null && <p>{error}</p>}
    </>
  );
};

export default Input;

import React, { useState } from "react";
import { processMarkdownContent } from "./hooks";
import Presentation, { ISlide } from "./Presentation";

const showFile = (e: React.ChangeEvent<HTMLInputElement>, cb: any) => {
  e.preventDefault();
  const reader = new FileReader();
  reader.onload = (e) => {
    const text = e.target?.result;
    const res = handleFileText(text as string);
    cb(res);
  };

  const files = e.target.files;
  if (files === null) return "No file found";
  if (!/[a-zA-Z0-9]*\.md/.test(files[0].name))
    return "File not of type Markdown(md)";
  reader.readAsText(files[0]);
  return null;
};

const handleFileText = (markdown: string) => {
  const configs = markdown.match(/(?<=---\n)[\w\s\:\-\=\+\.\_]*(?=---\n\n?)/g);
  const content = markdown.split(/---[\w\s\:\-\=\+\.\_]*---\n\n?/g);
  content.shift();

  const slides = [];

  if (configs === null) return;
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    const codeBlockInformation = content[i].match(
      /^```(?<language>\w+)(?: (?<subslides>.*))?$/m,
    );

    // const language = codeBlockInformation?.groups?.language;
    const subSlides = codeBlockInformation?.groups?.subslides || "";

    const subSlideCount = subSlides.split("|").length;

    const data: { [key: string]: string | number } = {
      content: content[i],
      subSlideCount: subSlideCount,
    };
    const lines = config.trim().split(/\n\r?/);
    for (const line of lines) {
      const groups = /(?<prop>\w+): ?(?<value>[\w\s]+)$/gm.exec(line)?.groups;
      if (!groups) continue;
      data[groups.prop] = groups.value;
    }
    slides.push(data);
  }

  return slides;
};

export default function App() {
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileError = showFile(e, (res: ISlide[]) => {
      res.forEach((slide: ISlide) => {
        const md = processMarkdownContent(slide.content);
        slide.markdown = md;
      });
      console.log(res);
      setSlides(res);
    });
    setError(fileError);
  };

  return slides.length < 1 ? (
    <>
      <h1>Upload your Markdown presentation file</h1>
      <input
        type="file"
        onChange={handleChange}
        name="presentation-file"
        accept=".md"
      />
      {error !== null && <p>{error}</p>}
    </>
  ) : (
    <Presentation slides={slides} />
  );
}

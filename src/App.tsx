import React, { useCallback, useEffect, useState } from "react";
import { useMarkdownContent } from "./hooks";
import SlideProvider, { useSlideContext } from "./SlideProvider";

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
  const configs = markdown.match(/(?<=---\n)[\w\s\:\-\=\+]*(?=---\n\n?)/g);
  const content = markdown.split(/---[\w\s\:\-\=\+]*---\n\n?/g);
  content.shift();

  const slides = [];

  if (configs === null) return;
  for (let i = 0; i < configs.length; i++) {
    const config = configs[i];
    const subslides = content[i].match(
      /^```(?<language>\w+)(?: (?<highlights>.*))?$/m,
    );

    // const language = subslides?.groups?.language;
    const highlightsRaw = subslides?.groups?.highlights || "";

    const highlights = highlightsRaw.split("|").length;

    const data: { [key: string]: string | number } = {
      content: content[i],
      highlightCount: highlights,
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

function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const { subSlideIndex, setSubSlideIndex } = useSlideContext();

  const markdown = useMarkdownContent(slides, slideIndex);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileError = showFile(e, (res: any) => {
      console.log(res);
      setSlides(res);
    });
    setError(fileError);
  };

  const changeSlideIndexByValue = useCallback(
    (delta: number, skipSubs: boolean) => {
      const highlightCount = slides[slideIndex].highlightCount;

      if (
        subSlideIndex + delta < highlightCount &&
        subSlideIndex + delta >= 0 &&
        skipSubs === false
      ) {
        setSubSlideIndex((prevIndex) => {
          return prevIndex + delta;
        });
      } else {
        setSlideIndex((prevIndex) => {
          const newIndex = prevIndex + delta;
          if (newIndex < 0) return prevIndex;
          return newIndex;
        });
        setSubSlideIndex(0);
      }
    },
    [slideIndex, slides, subSlideIndex, setSubSlideIndex],
  );

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft":
          changeSlideIndexByValue(-1, e.shiftKey);
          break;
        case "ArrowRight":
          changeSlideIndexByValue(1, e.shiftKey);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [changeSlideIndexByValue]);

  return (
    <main className="slides">
      <section className="slide-content">
        {slides.length < 1 ? (
          <>
            <h1>Slide with index {slideIndex}</h1>
            <input
              type="file"
              onChange={handleChange}
              name="presentation-file"
              accept=".md"
            />
            {error !== null && <p>{error}</p>}
          </>
        ) : (
          <div className="markdown-body">{markdown}</div>
        )}
      </section>
    </main>
  );
}

export default function AppWithProvider() {
  return (
    <SlideProvider>
      <App />
    </SlideProvider>
  );
}

import React, { useCallback, useEffect, useMemo, useState } from "react";
import rehypeReact from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import Code from "./Code";
import { codePlugin } from "./codePlugin";
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
  if (files === null) return;
  reader.readAsText(files[0]);
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

const schema: any = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), ["className"], ["data"]],
  },
};

function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<any>([]);
  const { subSlideIndex, setSubSlideIndex } = useSlideContext();

  const md = useMemo(() => {
    if (slides.length > 0 && slideIndex < slides.length) {
      return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkGemoji)
        .use(remarkRehype)
        .use(rehypeSanitize, schema)
        .use(codePlugin)
        .use(rehypeReact, {
          createElement: React.createElement,
          components: {
            code: Code,
          },
        })
        .processSync(slides[slideIndex].content).result;
    }
    return null;
  }, [slides, slideIndex]);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    showFile(e, (res: any) => {
      console.log(res);
      setSlides(res);
    });
  };

  const changeSlideIndexByValue = useCallback(
    (value: number) => {
      const highlightCount = slides[slideIndex].highlightCount;
      if (highlightCount > 1 && subSlideIndex < highlightCount - 1) {
        return setSubSlideIndex((prevIndex: number) => {
          return prevIndex + value;
        });
      }

      setSlideIndex((prevIndex) => {
        const newIndex = prevIndex + value;
        if (newIndex < 0) return prevIndex;
        return newIndex;
      });
      setSubSlideIndex(0);
    },
    [slideIndex, slides, subSlideIndex, setSubSlideIndex],
  );

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        changeSlideIndexByValue(1);
        return null;
      }
      if (e.key === "ArrowLeft") {
        changeSlideIndexByValue(-1);
        return null;
      }
    };

    window.addEventListener("keyup", handleKeyUp);

    return () => window.removeEventListener("keyup", handleKeyUp);
  }, [changeSlideIndexByValue]);

  return (
    <main className="slides">
      <section className="slide-content">
        <h1>Slide with index {slideIndex}</h1>
        <input type="file" onChange={handleChange} />
        <div className="markdown-body">{md}</div>
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

import React, { useEffect, useState } from "react";
import rehypeReact from "rehype-react";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import remarkGemoji from "remark-gemoji";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";
import Code from "./Code";

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
    const data: { [key: string]: string } = {
      content: content[i],
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
    code: [...(defaultSchema.attributes?.code || []), ["className"]],
  },
};

function App() {
  const [slideIndex, setSlideIndex] = useState(0);
  const [slides, setSlides] = useState<any>([]);

  const md =
    slides.length > 0 && slideIndex < slides.length
      ? unified()
          .use(remarkParse)
          .use(remarkGfm)
          .use(remarkGemoji)
          .use(remarkRehype)
          .use(rehypeSanitize, schema)
          .use(rehypeReact, {
            createElement: React.createElement,
            components: {
              code: Code,
            },
          })
          .processSync(slides[slideIndex].content).result
      : null;

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    showFile(e, (res: any) => {
      console.log(res);
      setSlides(res);
    });
  };

  const changeSlideIndexByValue = (value: number) => {
    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + value;
      if (newIndex < 0) return prevIndex;
      return newIndex;
    });
  };

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
  }, []);

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

export default App;

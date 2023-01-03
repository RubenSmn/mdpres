import React, { useMemo } from "react";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import { sanitizeSchema } from "../constants";
import { codePlugin } from "../codePlugin";
import rehypeReact from "rehype-react";
import Code from "../Code";
import { ISlide } from "../Presentation";

export const processMarkdownContent = (content: string) => {
  return unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype)
    .use(rehypeSanitize, sanitizeSchema)
    .use(codePlugin)
    .use(rehypeReact, {
      createElement: React.createElement,
      components: {
        code: Code,
      },
    })
    .processSync(content).result;
};

export const useMarkdownContent = (slides: ISlide[], slideIndex: number) => {
  return useMemo(() => {
    if (slides.length > 0 && slideIndex < slides.length) {
      return unified()
        .use(remarkParse)
        .use(remarkGfm)
        .use(remarkGemoji)
        .use(remarkRehype)
        .use(rehypeSanitize, sanitizeSchema)
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
};

import React from "react";
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

export const markdownToReact = (content: string) => {
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

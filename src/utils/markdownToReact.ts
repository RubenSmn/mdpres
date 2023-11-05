import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkGemoji from "remark-gemoji";
import remarkRehype from "remark-rehype";
import rehypeSanitize from "rehype-sanitize";
import { sanitizeSchema } from "../constants";
import { codePlugin } from "../codePlugin";
import rehypeReact from "rehype-react";
import Code from "../components/Code";
import * as prod from "react/jsx-runtime";

// @ts-expect-error: the react types are missing.
const production = { Fragment: prod.Fragment, jsx: prod.jsx, jsxs: prod.jsxs };

export const markdownToReact = (content: string) => {
  return unified()
    .use(remarkParse, { fragment: true })
    .use(remarkGfm)
    .use(remarkGemoji)
    .use(remarkRehype)
    .use(rehypeSanitize, sanitizeSchema)
    .use(codePlugin)
    .use(rehypeReact, {
      ...production,
      components: {
        code: Code,
      },
    })
    .processSync(content).result;
};

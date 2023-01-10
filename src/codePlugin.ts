import { visit } from "unist-util-visit";
import Prism from "prismjs";
import { HastRoot } from "remark-rehype/lib";

const specialChars: { [key: string]: string } = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#039": "'",
};

export const codePlugin: any = () => {
  return function transformer(tree: HastRoot) {
    const tokenize = (node: any) => {
      if (node.tagName !== "code") return;

      // split the code into lines
      const lines = node.children[0].value.split(/\n\r?/g);
      // remove the last empty line
      lines.pop();

      // get the code language from the className
      const language =
        node.properties.className[0].replace("language-", "") || "";

      // empty the node children
      const formattedLines = [];
      node.children = [];

      for (const line of lines) {
        // highlight the current line
        const highlightedLine = Prism.highlight(
          line,
          Prism.languages[language || "javascript"],
          language,
        );

        // wrap the whitespaces into a span
        const newLine = highlightedLine.replace(
          /\s+(?=\<)|^\s+/g,
          (match: string) => {
            return `<span>${match}</span>`;
          },
        );

        // add the new node to the array
        formattedLines.push({
          type: "text",
          value: newLine,
        });
      }

      const newNodeChildren = [];

      for (const line of formattedLines) {
        // split the text of the line into chunks
        const chunks = line.value.split(/(?:<span(?: class=)?>?)|(?:<\/span)/g);

        // create an array for all the new nodes of the line
        const lineNodes = [];

        for (const chunk of chunks) {
          if (chunk === "" || chunk === ">") continue;

          // check if chunk contains only whitespaces
          if (/^\s+$/.test(chunk)) {
            lineNodes.push({
              type: "element",
              tagName: "span",
              children: [
                {
                  type: "text",
                  value: chunk,
                },
              ],
            });
            continue;
          }

          // get the className and the value from the chunk
          const tokenClassName = chunk.match(/(?<=").*(?=\")/);
          const value = chunk.match(/(?<=\>).*$/g);

          if (value === null) continue;

          const content = value[0];
          if (content === null || content === "") continue;

          // add a new node to the line with the corresponding text as a child
          lineNodes.push({
            type: "element",
            tagName: "span",
            properties: {
              ...(tokenClassName && { className: [tokenClassName] }),
            },
            children: [
              {
                type: "text",
                value: content.replace(
                  /&([^;]+);/g,
                  (_: string, c: string) => specialChars[c],
                ),
              },
            ],
          });
        }

        // add the lineNodes to the parent lineNode
        const lineNode = {
          type: "element",
          tagName: "span",
          properties: {
            className: ["code-line"],
          },
          children: lineNodes,
        };

        // add the lineNode to the newNodeChildren
        newNodeChildren.push(lineNode);
      }

      // set the newNodeChildren to the node's children
      node.children = newNodeChildren;

      if (
        node.data !== undefined &&
        node.data !== null &&
        node.data.meta !== null
      ) {
        const data = node.data.meta;

        const lineOffset = data.match(/(?<=\()\d+(?=\))/g);
        const ranges = data.match(/(?<=^| )[\,\|\-0-9]+/g)[0];

        const formattedRanges = ranges.split("|").map((subSlide: string) => {
          // if the subslides start with |2-4|... then the initial slide should show all
          if (subSlide === "") return [1, Infinity];
          return subSlide.split("-").map((point: string) => parseInt(point));
        });

        node.properties["data"] = {
          ...node.data,
          lineOffset: parseInt(lineOffset),
          ranges: formattedRanges,
        };
      }
    };

    visit(tree, "element", tokenize);
  };
};

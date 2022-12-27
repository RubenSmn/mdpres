import { visit } from "unist-util-visit";
import Prism from "prismjs";

const specialChars: { [key: string]: string } = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  "#039": "'",
};

export const codePlugin: any = () => {
  return function transformer(tree: any) {
    const bold = (node: any) => {
      if (node.tagName !== "code") return;

      const lines = node.children[0].value.split(/\n\r?/g);
      lines.pop();

      const language =
        node.properties.className[0].replace("language-", "") || "";

      node.children = [];

      lines
        .map((line: string) => {
          return Prism.highlight(
            line,
            Prism.languages[language || "javascript"],
            language,
          );
        })
        .forEach((line: string) => {
          const newLine = line.replace(/\s+(?=\<)/g, (match: string) => {
            return `<span>${match}</span>`;
          });
          node.children.push({
            type: "text",
            value: newLine,
          });
          return newLine;
        });

      const newNodeChildren = [];

      for (const child of node.children) {
        const test = child.value.split(/(?:<span(?: class=)?>?)|(?:<\/span)/g);

        const lineNodes = [];

        for (const x of test) {
          if (x === "") continue;
          if (/^\s+$/.test(x)) {
            lineNodes.push({
              type: "element",
              tagName: "span",
              children: [
                {
                  type: "text",
                  value: x,
                },
              ],
            });
            continue;
          }

          const newClassName = x.match(/(?<=").*(?=\")/);
          const value = x.match(/(?<=\>).*$/g);

          const content = value[0] || null;

          if (content === null || content === "") continue;

          lineNodes.push({
            type: "element",
            tagName: "span",
            properties: {
              ...(newClassName && { className: [newClassName] }),
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

        const lineNode = {
          type: "element",
          tagName: "span",
          properties: {
            className: ["wenky-line"],
          },
          children: lineNodes,
        };

        newNodeChildren.push(lineNode);
      }

      node.children = newNodeChildren;

      if (node.data !== null || node.data !== undefined)
        node.properties["data"] = node.data;
    };

    visit(tree, "element", bold);
  };
};

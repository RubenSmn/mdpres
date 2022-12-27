import { visit } from "unist-util-visit";
import Prism from "prismjs";

export const codePlugin: any = () => {
  return function transformer(tree: any) {
    const bold = (node: any) => {
      if (node.tagName !== "code") return;

      console.log("before node", { ...node });

      const lines = node.children[0].value.split(/\n\r?/g);
      lines.pop();

      const className =
        node.properties.className[0].replace("language-", "") || "";

      // const htmlLines = lines
      //   .map((line: string) => {
      //     return Prism.highlight(
      //       line,
      //       Prism.languages[className || "javascript"],
      //       className,
      //     );
      //   })
      //   .map((line: string) => {
      //     const newLine = line.replace(/\s+(?=\<)/g, (match: string) => {
      //       return `<span>${match}</span>`;
      //     });
      //     return newLine;
      //   });

      node.children = [];

      const htmlLines = lines
        .map((line: string) => {
          return Prism.highlight(
            line,
            Prism.languages[className || "javascript"],
            className,
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

      // console.log("the new lines", htmlLines);
      // node.children[0] = htmlLines;

      if (node.data !== null || node.data !== undefined)
        node.properties["data"] = node.data;

      console.log("node after", node);
    };

    visit(tree, "element", bold);
  };
};

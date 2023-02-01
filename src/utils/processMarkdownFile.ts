import { SlideType } from "../types";

export const processMarkdownFile = (markdown: string) => {
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

    const notes: string[] = [];

    // remove all notes from the content
    content[i] = content[i].replace(
      /\n^\[note\]: ?(?<note>.*$)\n\n?/gm,
      (_, note) => {
        // add the actual note to the notes array
        notes.push(note);
        return "";
      },
    );

    // const language = codeBlockInformation?.groups?.language;
    const subSlides = codeBlockInformation?.groups?.subslides || "";

    const subSlideCount = subSlides.split("|").length;

    // TODO: SlideType not working with regex groups
    const data: any = {
      content: content[i],
      subSlideCount: subSlideCount,
      notes: notes,
    };
    const lines = config.trim().split(/\n\r?/);
    for (const line of lines) {
      const groups = /(?<prop>\w+): ?(?<value>[\w\s\:\-\=\+\.\_]+)$/gm.exec(
        line,
      )?.groups;
      if (!groups) continue;
      data[groups.prop] = groups.value;
    }
    slides.push(data);
  }

  return slides;
};

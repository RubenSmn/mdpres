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

    // const language = codeBlockInformation?.groups?.language;
    const subSlides = codeBlockInformation?.groups?.subslides || "";

    const subSlideCount = subSlides.split("|").length;

    const data: { [key: string]: string | number } = {
      content: content[i],
      subSlideCount: subSlideCount,
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

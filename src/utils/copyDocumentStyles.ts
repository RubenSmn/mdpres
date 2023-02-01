export const copyDocumentStyles = (src: Document, dest: Document) => {
  Array.from(src.styleSheets).forEach((styleSheet: StyleSheet) => {
    if (styleSheet.ownerNode === null) return;
    const newStyleSheet = styleSheet.ownerNode.cloneNode(
      true,
    ) as HTMLLinkElement;

    if (import.meta.env.DEV === false) {
      // some issue with relative path
      newStyleSheet.href = newStyleSheet.href;
    }

    dest.head.appendChild(newStyleSheet);
  });
  Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
};

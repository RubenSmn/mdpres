export const copyDocumentStyles = (src: Document, dest: Document) => {
  Array.from(src.styleSheets).forEach((styleSheet: StyleSheet) => {
    if (styleSheet.ownerNode === null) return;
    dest.head.appendChild(styleSheet.ownerNode.cloneNode(true));
  });
  Array.from(src.fonts).forEach((font) => dest.fonts.add(font));
};

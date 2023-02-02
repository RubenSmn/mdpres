export const slideStartSyntax = `---
title: your title
---
`;

export const basicSlide = `---
title: Basic Slide
---

# Basic Slide

This is a random paragraph which will have some valuable information about this slide

---
title: Second Slide
---

# The second slide

Another very interesting paragraph
`;

export const slideWithNotes = `---
title: Some title
---

# Super awesome title

This is a random paragraph which will have some valuable information about this slide

[note]: Usefull note for the presenter
`;

export const slideWithCode = `---
title: Slide with Code
---

# Slide with code

\`\`\`js
const x = 3;
const y = 8;
const z = x + y;
\`\`\`
`;

export const slideWithCodeHighlighting = `---
title: Slide with Code highlighting
---

# Slide with code highlighting

\`\`\`js |1-2|3
const x = 3;
const y = 8;
const z = x + y;
\`\`\`
`;

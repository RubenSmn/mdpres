---
title: Some title
background: yellow
---

# Super awesome title

Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde esse rem quam id
voluptate suscipit fuga necessitatibus doloremque magnam, itaque autem illum in
earum at consectetur distinctio. Suscipit, eligendi fugit.

```js 3-4|6|12-16
const changeSlideIndexByValue = useCallback(
  (delta: number) => {
    const highlightCount = slides[slideIndex].highlightCount;
    if (highlightCount > 1 && subSlideIndex + delta < highlightCount) {
      return setSubSlideIndex((prevIndex: number) => {
        const newIndex = prevIndex + delta;
        if (newIndex < 0) return prevIndex;
        return newIndex;
      });
    }

    setSlideIndex((prevIndex) => {
      const newIndex = prevIndex + delta;
      if (newIndex < 0) return prevIndex;
      return newIndex;
    });
    setSubSlideIndex(0);
  },
  [slideIndex, slides, subSlideIndex, setSubSlideIndex],
);
```

---
title: Title number two
background: blue
---

# Another title

Voluptate suscipit fuga **necessitatibus** doloremque magnam, itaque autem illum in
earum at consectetur distinctio. Suscipit, eligendi fugit.

```css |3-4
.test-class {
  background-color: yellow;
  display: flex;
  justify-content: start;
}
```

---
title: Yes Yes
---

# Testing

Some content right here from me :+1:

```css
.test-class-2 {
  color: white;
  background-color: black;
}
```

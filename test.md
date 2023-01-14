---
title: Some title
background: yellow
size: sm
---

# Super awesome title

Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde esse rem quam id
voluptate suscipit fuga necessitatibus doloremque magnam, itaque autem illum in
earum at consectetur distinctio. Suscipit, eligendi fugit.

[note]: First note

```js |3|5-7|9-11|13-19 (11) [15]
const changeSlideIndexByValue = useCallback(
  (delta: number, skipSubs: boolean) => {
    const subSlideCount = slides[currentSlideIndex].subSlideCount; // some ridiculous long comment which should either be a line above or below
    if (
      subSlideIndex + delta < subSlideCount &&
      subSlideIndex + delta >= 0 &&
      skipSubs === false
    ) {
      setSubSlideIndex((prevIndex) => {
        return prevIndex + delta;
      });
    } else {
      setCurrentSlideIndex((prevIndex) => {
        const newIndex = prevIndex + delta;
        if (newIndex < 0) return prevIndex;
        if (newIndex > slides.length - 1) return prevIndex;
        return newIndex;
      });
      setSubSlideIndex(0);
    }
  },
  [slides, currentSlideIndex, subSlideIndex, setSubSlideIndex],
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

[note]: Some note in between

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

[note]: Last note of the slides

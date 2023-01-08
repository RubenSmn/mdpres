import { useState } from "react";
import Input from "./Input";
import Presentation, { ISlide } from "./Presentation";

export default function App() {
  const [slides, setSlides] = useState<ISlide[]>([]);

  return slides.length < 1 ? (
    <>
      <h1>Upload your Markdown presentation file</h1>
      <Input setSlides={setSlides} />
    </>
  ) : (
    <Presentation slides={slides} />
  );
}

import { useState } from "react";
import Input from "./Input";
import { ISlide } from "./interfaces/ISlide";
import Presentation from "./Presentation";
import Preview from "./Preview";
import "./styles/home.css";

export default function App() {
  const [slides, setSlides] = useState<ISlide[]>([]);
  const [startPresenting, setStartPresenting] = useState(false);

  return slides.length < 1 || startPresenting === false ? (
    <>
      <header>
        <h2>MDPres</h2>
        <div className="header-links">
          <a
            href="https://github.com/RubenSmn/mdpres"
            target={"_blank"}
            rel="noreferrer"
          >
            Github
          </a>
        </div>
      </header>
      {slides.length < 1 ? (
        <section>
          <h1>Start presenting your Markdown here</h1>
          <Input setSlides={setSlides} />
        </section>
      ) : (
        <Preview
          startPresenting={() => setStartPresenting(true)}
          slides={slides}
        />
      )}
    </>
  ) : (
    <Presentation slides={slides} />
  );
}

import { useState } from "react";
import Input from "./Input";
import Presentation, { ISlide } from "./Presentation";
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
          <a
            href="https://github.com/RubenSmn"
            target={"_blank"}
            rel="noreferrer"
          >
            👋 I made this
          </a>
        </div>
      </header>
      {slides.length < 1 ? (
        <section>
          <h1>Start presenting your Markdown here</h1>
          <Input setSlides={setSlides} />
        </section>
      ) : (
        <section>
          <h3>Preview the slides</h3>
          <Preview
            startPresenting={() => setStartPresenting(true)}
            slides={slides}
          />
        </section>
      )}
    </>
  ) : (
    <Presentation slides={slides} />
  );
}

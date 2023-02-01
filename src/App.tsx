import { useState } from "react";
import Presentation from "./components/Presentation";
import Preview from "./components/Preview";
import "./styles/home.css";
import { AppProvider, useAppContext } from "./components/AppProvider";
import Home from "./components/Home";
import Header from "./components/Header";

function App() {
  const { slides } = useAppContext();
  const [startPresenting, setStartPresenting] = useState(false);

  return slides.length < 1 || startPresenting === false ? (
    <>
      <Header />
      {slides.length < 1 ? (
        <Home />
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

export default function AppWithProvider() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

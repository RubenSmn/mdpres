import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1>Hello World</h1>
      <button type="button" onClick={() => setCount((x) => x + 1)}>
        Clicked {count} times
      </button>
    </div>
  );
}

export default App;

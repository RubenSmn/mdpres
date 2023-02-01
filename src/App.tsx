import Presentation from "./components/Presentation";
import Preview from "./components/Preview";
import "./styles/home.css";
import { AppProvider } from "./components/AppProvider";
import Home from "./components/Home";
import Header from "./components/Header";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/preview",
    element: <Preview />,
  },
  {
    path: "presentation",
    element: <Presentation />,
  },
]);

function App() {
  return (
    <>
      <Header />
      <RouterProvider router={router} />
    </>
  );
}

export default function AppWithProvider() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

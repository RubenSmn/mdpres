import Presentation from "./components/Presentation";
import Preview from "./components/Preview";
import "./styles/home.css";
import { AppProvider } from "./components/AppProvider";
import Home from "./components/Home";
import Header from "./components/Header";
import ErrorPage from "./components/Error";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/preview",
    element: <Preview />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/presentation",
    element: <Presentation />,
    errorElement: <ErrorPage />,
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

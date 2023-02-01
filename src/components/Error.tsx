import { Link } from "react-router-dom";
import Header from "./Header";

type ErrorProps = {
  title?: string;
  textAfterLink?: string;
};

export default function ErrorPage({
  title = "Whoops something went wrong",
  textAfterLink,
}: ErrorProps) {
  return (
    <>
      <Header />
      <section className="error">
        <h3>{title}</h3>
        <p>
          Go back <Link to="/">home</Link> {textAfterLink}
        </p>
      </section>
    </>
  );
}

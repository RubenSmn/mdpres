import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <Link to="/">
        <h2>MDPres</h2>
      </Link>
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
  );
}

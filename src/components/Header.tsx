import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="header-left">
        <Link to="/">
          <h2>MDPres</h2>
        </Link>
        <Link to="/getting-started">Getting Started</Link>
      </div>
      <div className="header-right">
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

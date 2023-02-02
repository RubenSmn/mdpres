import Header from "./Header";
import styles from "../styles/GettingStarted.module.css";
import {
  basicSlide,
  slideStartSyntax,
  slideWithNotes,
} from "../getting-started-information";
import useClipboard from "../hooks/useClipBoard";

type CopyButtonProps = {
  textToCopy: string;
};

function CopyButton({ textToCopy }: CopyButtonProps) {
  const { hasCopied, onCopy } = useClipboard(textToCopy);

  const handleClick = () => {
    console.log(textToCopy);
    onCopy();
  };

  return (
    <span onClick={handleClick} className={styles.copyButton}>
      {hasCopied ? "COPIED!" : "COPY"}
    </span>
  );
}

type MarkdownPreProps = {
  md: string;
};

function MarkdownPre({ md }: MarkdownPreProps) {
  return (
    <div className={styles.preContainer}>
      <CopyButton textToCopy={md} />
      <pre>{md}</pre>
    </div>
  );
}

type AlertBlockProps = {
  children: React.ReactNode;
};

function AlertBlock({ children }: AlertBlockProps) {
  return (
    <blockquote className={styles.informationBlock}>{children}</blockquote>
  );
}

type ExampleBlockProps = {
  title: string;
  description: React.ReactNode;
  md: string;
};

function ExampleBlock({ title, description, md }: ExampleBlockProps) {
  return (
    <article className={styles.example}>
      <h3>{title}</h3>
      <p>{description}</p>
      <MarkdownPre md={md} />
    </article>
  );
}

export default function GettingStarted() {
  return (
    <>
      <Header />
      <section className={styles.wrapper}>
        <div className={styles.container}>
          <h1>Getting Started</h1>
          <h2 className={styles.demped}>
            MDPres allows you to write your presentations with markdown
          </h2>
          <ExampleBlock
            title="Example of simple slides"
            description="These are some very basic slides, including a title and some text."
            md={basicSlide}
          />
          <AlertBlock>
            Every slide must start with<pre>{slideStartSyntax}</pre>
          </AlertBlock>
          <ExampleBlock
            title="With notes"
            description={
              <>
                You can use notes by using the <code>[note]: your note</code>{" "}
                syntax
              </>
            }
            md={slideWithNotes}
          />
        </div>
      </section>
    </>
  );
}

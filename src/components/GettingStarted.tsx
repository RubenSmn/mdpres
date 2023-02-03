import Header from "./Header";
import styles from "../styles/GettingStarted.module.css";
import {
  basicSlide,
  slideStartSyntax,
  slideWithCode,
  slideWithCodeHighlighting,
  slideWithCodeLineOffset,
  slideWithCustomSize,
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
  children: React.ReactNode;
  title: string;
  md: string;
};

function ExampleBlock({ children, title, md }: ExampleBlockProps) {
  return (
    <article className={styles.example}>
      <h3>{title}</h3>
      <p>{children}</p>
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
          <h2>Creating the Presentation</h2>
          <p>
            Here is some information about making a Markdown presentation. The
            basics to get started from notes to code blocks.
          </p>
          <ExampleBlock title="A simple presentation" md={basicSlide}>
            These are some very basic slides, including a title and some text.
          </ExampleBlock>
          <AlertBlock>
            Every slide must start with:
            <MarkdownPre md={slideStartSyntax} />
          </AlertBlock>
          <ExampleBlock title="With notes" md={slideWithNotes}>
            You can use notes by using the <code>[note]: your note</code>{" "}
            syntax.
          </ExampleBlock>
          <ExampleBlock title="With code" md={slideWithCode}>
            You can use code blocks with the <code>```</code> syntax. You can
            specify the language to apply syntax highlighting.
          </ExampleBlock>
          <AlertBlock>
            Currently you can only have <b>one</b> code block <b>per</b> slide.
          </AlertBlock>
          <ExampleBlock
            title="With code highlighting"
            md={slideWithCodeHighlighting}
          >
            You can use highlight different lines of code by using{" "}
            <code>|1-2|3</code> after <code>```</code> this example first shows{" "}
            <b>all</b> the code then highlights lines <code>1</code> to{" "}
            <code>2</code> and finally line <code>3</code>.
          </ExampleBlock>
          <ExampleBlock
            title="With code line offset"
            md={slideWithCodeLineOffset}
          >
            To have a custom line offset for your code blocks you can use{" "}
            <code>({"<number>"})</code> this will start your line number at the
            number you specified.
          </ExampleBlock>
          <ExampleBlock title="Size configuration" md={slideWithCustomSize}>
            There are a few configurations for the size of your presentation the{" "}
            <b>default</b> is <code>md</code>. These are the available sizes:{" "}
            <code>xs</code> <code>sm</code> <code>md</code> <code>lg</code>{" "}
            <code>xl</code>.
          </ExampleBlock>
          <hr className={styles.divider} />
          <h2>Presenting the Presentation</h2>
          <article className={styles.example}>
            <h3>Navigating around</h3>
            <p>
              You can navigate around the presentation by using the mouse, or
              with the keyboard:{" "}
              <kbd>
                <abbr title="Left Arrow">Left</abbr>
              </kbd>{" "}
              will get you to the previous slide / code highlight and{" "}
              <kbd>
                <abbr title="Right Arrow">Right</abbr>
              </kbd>{" "}
              will go the the next. MDPres aslo allows for some <b>VIM</b>{" "}
              keybindings such as{" "}
              <kbd>
                <abbr title="l">L</abbr>
              </kbd>{" "}
              and{" "}
              <kbd>
                <abbr title="h">H</abbr>
              </kbd>
              .
            </p>
            <p>
              To <b>skip</b> the code lines highlighting and got directly to the
              next slide you can use{" "}
              <kbd>
                <abbr title="Ctrl">Ctrl</abbr>
              </kbd>{" "}
              <kbd>
                <abbr title="Left Arrow">Left</abbr>
              </kbd>{" "}
              or{" "}
              <kbd>
                <abbr title="Ctrl">Ctrl</abbr>
              </kbd>{" "}
              <kbd>
                <abbr title="Right Arrow">Right</abbr>
              </kbd>
              .
            </p>
          </article>
          <article className={styles.example}>
            <h3>The Menu</h3>
            <p>
              The presentation menu can be opened by using{" "}
              <kbd>
                <abbr title="Escape">Esc</abbr>
              </kbd>
              . This will open a menu where you can use different commands such
              as <code>show notes</code> and <code>hide notes</code> to, well...
              show and hide your notes. You can also quickly move to a slide
              using the slide number. <code>3</code> will move you to the{" "}
              <b>third</b> slide and <code>3:2</code> will move you to the{" "}
              <b>third</b> slide, <b>second</b> highlight.
            </p>
          </article>
        </div>
      </section>
    </>
  );
}

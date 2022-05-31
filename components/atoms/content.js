import { Link } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import Media from "./media";

const toUrl = (ref, blob) => {
  switch (ref[0]) {
    case "&":
      if (!blob) return ref;
      return Buffer.from(blob.blob || "");
    case "@":
      // its a feed
      return `/profile/${encodeURIComponent(ref)}`;
    case "%":
      // its a link (to a message?)
      return `/thread/${encodeURIComponent(ref)}`;
    default:
      // unknown
      return ref;
  }
};

const createSsbTheme = (blobs) => {
  return {
    a: (props) => {
      const { children, href } = props;
      return (
        <Link href={toUrl(href)} textDecoration="underline">
          {children}
        </Link>
      );
    },
    img: (props) => {
      return <Media {...props} />;
    },
  };
};

export default function Content({ text, blobs }) {
  const ssbTheme = createSsbTheme(blobs);
  return (
    <ReactMarkdown
      components={ChakraUIRenderer(ssbTheme)}
      children={text}
      skipHtml
    />
  );
}

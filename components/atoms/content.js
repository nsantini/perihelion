import { Img, Link, useColorModeValue } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

const toUrl = (ref, blobs) => {
  switch (ref[0]) {
    case "&":
      // its a blob
      return `data:image/png;base64,${Buffer.from(
        (blobs.find((b) => b.link === ref) || {}).blob || ""
      )}`;
    case "@":
      // its a feed
      return `/profile/${encodeURIComponent(ref)}`;
    case "%":
      // its a link (to a message?)
      return `/feed/${encodeURIComponent(ref)}`;
    default:
      // unknown
      return ref;
  }
};

const createSsbTheme = (blobs) => {
  return {
    a: (props) => {
      const { children, href } = props;
      return <Link href={toUrl(href)}>{children}</Link>;
    },
    img: (props) => {
      return <Img {...props} src={toUrl(props.src, blobs)} />;
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

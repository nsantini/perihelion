import { Img, Link, useColorModeValue } from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";

const toUrl = (ref, blob) => {
  switch (ref[0]) {
    case "&":
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
      const blob = (blobs || []).find((b) => b.link === props.src);
      if (!blob) {
        return <Img {...props} src={props.src} />;
      }
      switch (blob.mimeType) {
        case "video":
          return (
            <video
              controls
              src={`data:video/mp4;base64,${toUrl(props.src, blob)}`}
            />
          );
        case "audio":
          return (
            <audio
              controls
              src={`data:audio/mpeg;base64,${toUrl(props.src, blob)}`}
            />
          );
        case "image":
        default:
          return (
            <Img
              {...props}
              src={`data:image/png;base64,${toUrl(props.src, blob)}`}
            />
          );
      }
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

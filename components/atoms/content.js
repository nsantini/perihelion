import {
  Link,
  Text,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import ChakraUIRenderer from "chakra-ui-markdown-renderer";
import ReactMarkdown from "react-markdown";
import Media from "./media";
import Profile from "../organisms/profile";

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
      if (href[0] === '@') {
        return (
          <Popover trigger="hover">
            <PopoverTrigger>
              <Link href={toUrl(href)} textDecoration="underline">
                {children}
              </Link>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverBody>
                <Profile feedId={href} short={true} />
              </PopoverBody>
            </PopoverContent>
          </Popover>
        );
      }
      return (
        <Link href={toUrl(href)} textDecoration="underline">
          {children}
        </Link>
      );
    },
    img: (props) => {
      return <Media {...props} />;
    },
    blockquote: (props) => {
      return (
        <Text
          fontSize={"18px"}
          fontFamily={"var(--chakra-fonts-mono)"}
          bg={useColorModeValue("snow.100", "polar.300")}
          p={2}
        >
          {props.children}
        </Text>
      );
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

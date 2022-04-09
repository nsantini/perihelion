import { Text, useColorModeValue } from "@chakra-ui/react";
import ssbMarkdown from "ssb-markdown";

const toUrl = (blobs) => (ref) => {
  if (!blobs) return ref;
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

export default function Content({ text, blobs }) {
  return (
    <Text
      overflowX={"scroll"}
      textAlign={"left"}
      color={useColorModeValue("polar.100", "snow.300")}
      px={3}
      mt={2}
      dangerouslySetInnerHTML={{
        __html: ssbMarkdown.block(text, { toUrl: toUrl(blobs) }),
      }}
    />
  );
}

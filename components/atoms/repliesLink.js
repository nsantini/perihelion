import { Center, Link, useColorModeValue } from "@chakra-ui/react";
export default function RepliesLink({ msgId, replyCount, isPrivate }) {
  return (
    <Center>
      <Link
        color={useColorModeValue("frost.700", "frost.500")}
        mt="2"
        href={`/thread/${encodeURIComponent(msgId)}${
          isPrivate ? "private" : ""
        }`}
      >
        {replyCount} {replyCount === 1 ? "reply" : "replies"}
      </Link>
    </Center>
  );
}

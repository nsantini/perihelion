import { Center, Link, useColorModeValue } from "@chakra-ui/react";
export default function RepliesLink({ msgId, replyCount }) {
  return (
    <Center>
      <Link
        color={useColorModeValue("frost.700", "frost.500")}
        mt="2"
        href={`/thread/${encodeURIComponent(msgId)}`}
      >
        {replyCount} {replyCount === 1 ? "reply" : "replies"}
      </Link>
    </Center>
  );
}

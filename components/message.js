import { Avatar, chakra, Flex, Link } from "@chakra-ui/react";
import useProfile from "../hooks/profile";
import ssbMarkdown from "ssb-markdown";

function Author({ author, timestamp }) {
  const { profile, isLoading, isError } = useProfile(author);
  if (isError) return <div>Failed to load user details</div>;
  if (isLoading) return <div>Loading...</div>;
  const postedDate = new Date(timestamp);
  return (
    <Flex direction={"row"} textAlign={"left"}>
      <Avatar
        src={`data:image/png;base64,${Buffer.from(profile.image || "")}`}
        size={"md"}
        alignSelf={"left"}
        m={{ base: "0 0 35px 0", md: "0 0 10px 0" }}
      />
      <Flex direction={"column"} textAlign={"left"} ml="2">
        <Link
          fontFamily={"Work Sans"}
          fontWeight={"bold"}
          fontSize={16}
          href={`/profile/${encodeURIComponent(profile.id)}`}
        >
          {profile.name}
        </Link>
        <chakra.p fontFamily={"Work Sans"} fontSize={12}>
          {postedDate.toLocaleDateString()} — {postedDate.toLocaleTimeString()}
        </chakra.p>
      </Flex>
    </Flex>
  );
}

export default function MessageCard(props) {
  const { author, timestamp, text, index } = props;

  return (
    <Flex
      key={index}
      width="100%"
      direction={"column"}
      rounded={"xl"}
      p={5}
      justifyContent={"left"}
      position={"relative"}
      textAlign={"left"}
    >
      <Author author={author} timestamp={timestamp} />
      <chakra.p
        fontFamily={"Inter"}
        fontWeight={"medium"}
        fontSize={"15px"}
        pl={4}
        dangerouslySetInnerHTML={{ __html: ssbMarkdown.block(text) }}
      />
    </Flex>
  );
}

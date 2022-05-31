import {
  IconButton,
  Flex,
  Text,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";
import { StarIcon } from "@chakra-ui/icons";
import Content from "../atoms/content";
import Author from "./author";
import Avatar from "../atoms/avatar";
import useProfile from "../../hooks/profile";

function Voter({ profileId }) {
  const { profile, isLoading, isError } = useProfile(profileId);
  if (isError) return <div>Failed to load user details</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Flex direction={"row"} textAlign={"left"} p={1}>
      <Avatar image={profile.imageBlob} size={"sm"} />
      <Link
        ml={2}
        pt={1}
        fontFamily={"Work Sans"}
        fontWeight={"bold"}
        fontSize={16}
        href={`/profile/${encodeURIComponent(profile.id)}`}
      >
        {profile.name}
      </Link>
    </Flex>
  );
}

export default function MessageCard(props) {
  const { author, timestamp, text, blobs, index, voters, msgId } = props;
  const vote = async (e) => {
    e.preventDefault();
    const data = {
      msgId,
    };
    const response = await fetch("/api/vote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const rData = await response.json();

    if (!response.ok) {
      console.error(rData.error);
    }
  };
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
      <Content text={text} blobs={blobs} />
      <Flex justifyContent={"right"}>
        <Popover trigger="hover">
          <PopoverTrigger>
            <Text mt={2} mr={1}>
              {voters.length}
            </Text>
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              {voters.map((voter) => (
                <Voter profileId={voter} />
              ))}
            </PopoverBody>
          </PopoverContent>
        </Popover>

        <IconButton onClick={vote} icon={<StarIcon />} />
      </Flex>
    </Flex>
  );
}

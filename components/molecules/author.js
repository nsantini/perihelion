import { chakra, Flex, Link } from "@chakra-ui/react";
import Avatar from "../atoms/avatar";
import useProfile from "../../hooks/profile";

export default function Author({ author, timestamp }) {
  const { profile, isLoading, isError } = useProfile(author);
  if (isError) return <div>Failed to load user details</div>;
  if (isLoading) return <div>Loading...</div>;
  const postedDate = new Date(timestamp);
  return (
    <Flex direction={"row"} textAlign={"left"}>
      <Avatar image={profile.imageBlob} size={"md"} />
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

import { Flex, Link } from "@chakra-ui/react";
import Avatar from "./avatar";
import useProfile from "../../hooks/profile";

export default function Voter({ profileId }) {
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

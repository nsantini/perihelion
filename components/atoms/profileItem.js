import { Flex } from "@chakra-ui/react";
import useProfile from "../../hooks/profile";
import Avatar from "../atoms/avatar";

const ProfileItem = ({ profileId }) => {
  const { profile, isLoading, isError } = useProfile(profileId);
  if (isError) return <div>Failed to load user details</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <Flex direction={"row"} textAlign={"left"} p={1}>
      <Avatar image={profile.imageBlob} size={"sm"} />
      {`[@${profile.name}](${profile.id.slice(1, 1 + 8)})`}
    </Flex>
  );
};

export default ProfileItem;

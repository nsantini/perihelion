
import { Flex } from "@chakra-ui/react";
import { Box, List, ListItem } from "@chakra-ui/layout";
import { FormLabel } from "@chakra-ui/form-control";
import { CloseIcon } from "@chakra-ui/icons";
import useProfiles from "../../hooks/profiles";
import ProfileItem from "../atoms/profileItem";


export default function Profiles({ name, onSelect, setName }) {
  const { profiles, isLoading, isError } = useProfiles(name);
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;

  const handleSelect = (profile) => {
    onSelect(profile);
  };

  if (!name) return <></>;

  return (
    <Box pb={4} mb={4}>
      <List
        mt={2}
        bg="white"
        borderRadius="4px"
        border="1px solid rgba(0,0,0,0.3)"
        boxShadow="6px 5px 8px rgba(0,50,30,0.02)"
        overflowY={"scroll"}
      >
        <ListItem px={2} py={1}>
          <FormLabel>Select a peer to mention</FormLabel>
        </ListItem>
        <ListItem
          px={2}
          py={1}
          borderBottom="1px solid rgba(0,0,0,0.02)"
          bg="inherit"
          key="close"
          onClick={(e) => setName('')}
          style={{ cursor: "pointer" }}
        >
          <Flex direction={"row"} textAlign={"left"} p={1}>
            <CloseIcon mr={2} mt={1} />
            Close
          </Flex>
        </ListItem>
        {profiles.map((profile, index) => (
          <ListItem
            px={2}
            py={1}
            borderBottom="1px solid rgba(0,0,0,0.01)"
            bg="inherit"
            key={`${profile.feedId}${index}`}
            onClick={(e) => handleSelect(profile)}
            style={{ cursor: "pointer" }}
          >
            <Box display="inline-flex" alignItems="center">
              <ProfileItem profileId={profile.feedId} />
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

import React, { useState } from "react";
import { Box, Input, List, ListItem } from "@chakra-ui/react";
import { FormLabel } from "@chakra-ui/form-control";
import Profiles from "./profiles";
import ProfileItem from "../atoms/profileItem";

export default function ProfileSelection({ addRecps }) {
  const [name, setName] = useState("");
  const [selectedProfiles, setSelectedProfiles] = useState([]);
  return (
    <Box mt={2}>
      {selectedProfiles.length > 0 && (
        <List>
          {selectedProfiles.map((profile) => (
            <ListItem>
              <ProfileItem profileId={profile.feedId} />
            </ListItem>
          ))}
        </List>
      )}
      <FormLabel>Search for peers to share this private message with</FormLabel>
      <Input
        value={name}
        placeholder="Start typing a peer's name"
        onChange={(e) => setName(e.target.value)}
      />
      <Profiles
        name={name}
        setName={setName}
        onSelect={(profile) => {
          setName("");
          setSelectedProfiles([profile, ...selectedProfiles]);
          addRecps(profile);
        }}
      />
    </Box>
  );
}

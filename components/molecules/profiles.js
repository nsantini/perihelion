import { useState } from "react";
import { Select } from "@chakra-ui/react";
import useProfiles from "../../hooks/profiles";

export default function Profiles({ name, onSelect }) {
  const { profiles, isLoading, isError } = useProfiles(name);
  const [value, setValue] = useState("");
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  const handleChange = (event) => {
    setValue(event.target.value);
    onSelect(name, event.target.value);
  };
  return (
    <Select placeholder="Mention a user" onChange={handleChange} value={value}>
      {profiles &&
        profiles.map((profile) => (
          <option
            key={profile.feedId}
            value={`[${profile.name}](${profile.feedId})`}
          >
            {profile.name}
          </option>
        ))}
    </Select>
  );
}

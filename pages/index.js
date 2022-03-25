import { Flex, SimpleGrid } from "@chakra-ui/react";
import MessageCard from "../components/message";
import ssbApi from "../ssb/api";

export default function Home({ profile }) {
  return (
    <SimpleGrid columns={{ base: 1 }} width="100%">
      {profile && (
        <div>
          <MessageCard
            name={profile.name}
            avatar={`data:image/png;base64,${Buffer.from(profile.image)}`}
            content={profile.description}
          />
        </div>
      )}
    </SimpleGrid>
  );
}

export async function getServerSideProps(context) {
  try {
    const profile = await ssbApi.getOwnProfile();
    return {
      props: { profile },
    };
  } catch (e) {
    return {
      props: { error: e },
    };
  }
}

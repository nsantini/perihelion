import Head from "next/head";
import ssbApi from "../ssb/api";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import MessageCard from "../components/message";
import NavBar from "../components/navbar";

export default function Home({ isConnected, profile, error }) {
  return (
    <Flex
      textAlign={"center"}
      pt={1}
      justifyContent={"center"}
      direction={"column"}
      width={"full"}
    >
      <Head>
        <title>Perihelion</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <SimpleGrid columns={{ base: 1 }} width="100%" maxW={"820px"} mx={"auto"}>
        {profile && (
          <div>
            <NavBar avatar={profile.image} />
            <MessageCard
              name={profile.name}
              avatar={`data:image/png;base64,${Buffer.from(profile.image)}`}
              content={profile.description}
            />
          </div>
        )}
      </SimpleGrid>
    </Flex>
  );
}

export async function getServerSideProps(context) {
  try {
    const profile = await ssbApi.getOwnProfile();
    return {
      props: { isConnected: true, profile },
    };
  } catch (e) {
    return {
      props: { isConnected: false, error: true },
    };
  }
}

import Head from "next/head";
import NavBar from "./navbar";
import { Flex } from "@chakra-ui/react";
import useProfile from "../hooks/profile"

export default function Layout({ children }) {
  const { profile, isLoading, isError } = useProfile();
  if (isError) return <div>Failed to load</div>;
  if (isLoading) return <div>Loading...</div>;
  return (
    <>
      <Head>
        <title>Perihelion</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Flex
        textAlign={"center"}
        pt={1}
        justifyContent={"center"}
        direction={"column"}
        width={"full"}
        maxW={"820px"}
        mx={"auto"}
      >
        <NavBar avatar={profile.image || ""} />
        <main>{children}</main>
      </Flex>
    </>
  );
}

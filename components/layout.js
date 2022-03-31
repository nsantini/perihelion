import Head from "next/head";
import NavBar from "./navbar";
import { Flex } from "@chakra-ui/react";

export default function Layout({ children }) {
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
        maxW={"1080px"}
        mx={"auto"}
      >
        <NavBar />
        <main>{children}</main>
      </Flex>
    </>
  );
}

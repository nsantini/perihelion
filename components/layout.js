import Head from "next/head";
import NavBar from "./organisms/navbar";
import { Container, Stack } from "@chakra-ui/react";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Perihelion</title>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <Container maxW={"container.lg"} width={"full"}>
        <Stack>
          <NavBar />
          <main>{children}</main>
        </Stack>
      </Container>
    </>
  );
}

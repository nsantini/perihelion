import useSWR from "swr";
import Head from "next/head";
import NavBar from "./navbar";
import { Flex } from "@chakra-ui/react";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Layout({ children }) {
  const { data, error } = useSWR("/api/profile", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;
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
        <NavBar avatar={data.image || ""} />
        <main>{children}</main>
      </Flex>
    </>
  );
}

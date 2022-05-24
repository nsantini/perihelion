import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box,
  Flex,
  HStack,
  Button,
  IconButton,
  Link as ChakraLink,
  useDisclosure,
  useColorMode,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, MoonIcon, SunIcon } from "@chakra-ui/icons";

function ThemeToggleButton() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Search database"
      icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
      onClick={toggleColorMode}
    />
  );
}

const Links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "My Circle",
    path: "/feed/1",
  },
  {
    label: "Extended",
    path: "/feed/2",
  },
  {
    label: "Private",
    path: "/private",
  },
  {
    label: "Settings",
    path: "/settings",
  },
];

const NavLink = ({ children, path }) => {
  const router = useRouter();
  return (
    <Link href={`${path}`}>
      <ChakraLink
        px={2}
        py={1}
        rounded={"md"}
        color={"snow.500"}
        _hover={{
          textDecoration: "none",
          bg: "frost.100",
        }}
        bg={router.asPath === path ? "frost.100" : "frost.700"}
      >
        {children}
      </ChakraLink>
    </Link>
  );
};

export default function NavBar() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("snow.500", "polar.700")} px={4}>
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        <IconButton
          size={"md"}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={"Open Menu"}
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
            {Links.map((link) => (
              <NavLink key={link.label} path={link.path}>
                {link.label}
              </NavLink>
            ))}
          </HStack>
        </HStack>
        <ThemeToggleButton />
      </Flex>

      {isOpen ? (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as={"nav"} spacing={4}>
            {Links.map((link) => (
              <NavLink key={link.label} path={link.path}>
                {link.label}
              </NavLink>
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  );
}

import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  useDisclosure,
  useColorModeValue,
  Stack,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

const Links = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "My Posts",
    path: "/feed/0",
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
    label: "Profile",
    path: "/profile/self",
  },
];

const NavLink = ({ children, path }) => (
  <Link
    px={2}
    py={1}
    rounded={"md"}
    color="polar.700"
    _hover={{
      textDecoration: "none",
      bg: useColorModeValue("frost.500", "frost.700"),
    }}
    href={`${path}`}
  >
    {children}
  </Link>
);

export default function NavBar(props) {
  const { avatar } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg={useColorModeValue("snow.300", "polar.700")} px={4}>
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
        <Flex alignItems={"center"}>
          <Avatar
            size={"sm"}
            src={`data:image/png;base64,${Buffer.from(avatar || "")}`}
          />
        </Flex>
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

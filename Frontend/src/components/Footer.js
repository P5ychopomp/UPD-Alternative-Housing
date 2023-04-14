import {
  Box,
  ChakraProvider,
  Container,
  Image,
  Link,
  SimpleGrid,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as ReactLink} from "next/link";
import Theme from "./Theme";

const ListHeader = ({ children }) => {
  return (
    <Text color="upd.700" fontWeight="bold" fontSize={"lg"} mb={2}>
      {children}
    </Text>
  );
};

export default function Footer() {
  return (
    <ChakraProvider theme={Theme}>
      <Box
        bg={useColorModeValue("gray.50", "gray.900")}
        color={useColorModeValue("gray.700", "gray.200")}
      >
        <Container as={Stack} maxW={"6xl"} py={10} left='0' bottom='0' right='0'>
          <SimpleGrid
            templateColumns={{ sm: "1fr 1fr", md: "4fr 1fr 1fr 1fr" }}
            spacing={8}
            centerContent
          >
            <Stack spacing={6}>
              <Box>
                <Image
                  className="navbar-logo"
                  src="USC-Logo2.png"
                  alt="USC Logo"
                  h="4em"
                  ml="0"
                  mt="0"
                />
              </Box>
              <Text fontSize={"xs"} w="80%">
                © 2023 UP Diliman University Student Council. All rights
                reserved
              </Text>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Organization</ListHeader>
              <Link as={ReactLink} href='/About'>About</Link>
              <Link as={ReactLink} href='/ContactUs'>Contact</Link>
              <Link as={ReactLink} href='/Partners'>Partners</Link>
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Support</ListHeader>
              <Link as={ReactLink} href='/Help'>Help Center</Link>
              <Link as={ReactLink} href='/SearchGuides'>SearchGuides</Link>
              <Link as={ReactLink} href='/PostingGuides'>PostingGuides</Link>
              <Link as={ReactLink} href='/Safety'>Safety</Link>
              <Link as={ReactLink} href='/Terms'>Terms of Service</Link>
              <Link as={ReactLink} href='/Privacy'>Privacy Policy</Link>
              
            </Stack>
            <Stack align={"flex-start"}>
              <ListHeader>Follow Us</ListHeader>
              <a href="https://www.facebook.com/USCUPDiliman" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://www.instagram.com/USCUPDiliman" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://www.twitter.com/USCUPDiliman" target="_blank" rel="noreferrer">Twitter</a>
            </Stack>
          </SimpleGrid>
        </Container>
      </Box>
    </ChakraProvider>
  );
}

// @ts-nocheck
import Link from "next/link";
import "./styles/App.module.css";
import {
  Card,
  CardBody,
  Center,
  Container,
  Flex,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
  ChakraProvider,
} from "@chakra-ui/react";
import React from "react";
import { Image as NextImage } from 'next/image';
import Theme from "@/components/Theme";

const Landing = () => {
  return (
    <ChakraProvider theme={Theme}>
      <Container minW="100%" mt="20" mb="100">
        <VStack minW="10%">
          <Stack alignItems="center">
            <Text
              bgGradient="linear(to-t, #FFD0D6, #792E3F)"
              bgClip="text"
              fontSize="6xl"
              fontWeight="extrabold"
              textAlign="center"
            >
              Find your Isko home
            </Text>
            <Text
              textAlign="center"
              fontSize={"md"}
              color={"gray.500"}
              fontStyle="italic"
              maxW="80%"
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean et
              urna imperdiet, interdum elit eget, scelerisque nunc. Duis
              sagittis feugiat semper.
            </Text>
          </Stack>

          <Center>
            <Image
              as={NextImage}
              mt="20"
              src="landing.png"
              alt="Student dorm room"
              maxW="80%"
            />
          </Center>
        </VStack>
        <Center mt="30">
          <Flex gap="8" flexWrap="wrap" justifyContent="center">
            <Link href="/Listings" variant="unstyled">
              <Card
                maxW="sm"
                boxShadow="0px 0px 5px 1px #dbdbdb"
                className="card"
              >
                <CardBody>
                  <HStack>
                    <Image as={NextImage} src="student.png" maxW="50%" alt='student'/>
                    <Container>
                      <Text fontWeight="extrabold" lineHeight="5">
                        I am looking for a place to stay
                      </Text>
                      <Text
                        mt="3"
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Text>
                    </Container>
                  </HStack>
                </CardBody>
              </Card>
            </Link>
            <Link href="/Landlord/Login" variant="unstyled">
              <Card
                maxW="sm"
                boxShadow="0px 0px 5px 1px #dbdbdb"
                className="card"
              >
                <CardBody>
                  <HStack>
                    <Image as={NextImage} src="landlord.png" maxW="50%" alt='student' />
                    <Container>
                      <Text fontWeight="extrabold" lineHeight="5">
                        I want to rent my space
                      </Text>
                      <Text
                        mt="3"
                        color="gray.500"
                        fontSize="xs"
                        lineHeight="4"
                      >
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      </Text>
                    </Container>
                  </HStack>
                </CardBody>
              </Card>
            </Link>
          </Flex>
        </Center>
      </Container>
    </ChakraProvider>
  );
};

export default Landing;

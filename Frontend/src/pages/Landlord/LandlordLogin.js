import {
  Box,
  Button,
  ChakraProvider,
  Container,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Link,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import Theme from "../../components/Theme";
import { useAuth } from "../../utils/Auth";
import { fetchAuth } from "../../utils/FetchAuth";

const Login = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  Axios.defaults.withCredentials = true;

  const login = async () => {
    setIsLoading(true);
    await Axios.post(
      `${fetchAuth}/login`,
      {
        email: email,
        password: password,
      },
      {
        credentials: "include",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    )
      .then(async (response) => {
        if (response.data.data) {
          localStorage.setItem("id", response.data.data);
          await auth.login();
          navigate("/Landlord/ListedProperties");
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          showToast(
            "Please input the correct email or password",
            "error",
            "Invalid Credentials"
          );
        }
      });
      setIsLoading(false);
  };

  const showToast = (message, status, title) => {
    toast({
      title: title,
      description: message,
      status: status,
      duration: 4000,
      position: "top",
      isClosable: true,
    });
  };

  return (
    <ChakraProvider theme={Theme}>
      <Container mt="100" maxW="100%" align={"center"} mb="10">
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"} color="upd.700">
            Welcome Landlord and Landladies!
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            Help an Isko/Iska by listing your space on our website today. 🏠
          </Text>
        </Stack>
        <Stack maxW={["100%", "100%", "50em", "50em", "50em"]}>
          <Heading mt="20" mb="2" fontSize={"4xl"} color="upd.700">
            Login
          </Heading>

          <Box
            borderRadius="lg"
            overflow="hidden"
            boxShadow="0px 0px 15px 1px #dbdbdb"
            padding="5"
            minW="60%"
          >
            <Grid
              templateRows="repeat(7, 1fr)"
              templateColumns="repeat(10, 1fr)"
              gap={5}
            >
              <GridItem rowSpan={1} colSpan={10}></GridItem>

              <GridItem rowSpan={7} colSpan={1}></GridItem>

              <GridItem rowSpan={5} colSpan={4}>
                <Image
                  boxSize="300px"
                  objectFit="cover"
                  borderRadius="lg"
                  src="../landlord-image-1.png"
                  alt="Landlord Icon"
                />
              </GridItem>

              <GridItem colSpan={4} rowSpan={1}></GridItem>

              <GridItem colSpan={4} rowSpan={1}>
                <Input
                  placeholder="Email"
                  size="lg"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </GridItem>
              <GridItem colSpan={4} rowSpan={1}>
                <InputGroup size="lg">
                  <Input
                    placeholder="Password"
                    type={showPassword ? "text" : "password"}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                  <InputRightElement p="1">
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? (
                        <Icon as={FiEye} color="gray.500" />
                      ) : (
                        <Icon as={FiEyeOff} color="gray.500" />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </GridItem>

              <GridItem colSpan={4} rowSpan={1}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  isLoading={isLoading}
                  size="lg"
                  bg={"upd.400"}
                  color={"white"}
                  _hover={{
                    bg: "upd.700",
                  }}
                  onClick={login}
                >
                  Log in
                </Button>
              </GridItem>
              <GridItem colSpan={4} rowSpan={1}>
                <Text>
                  Don't have an account?{" "}
                  <Link
                    as={ReactLink}
                    to="/Landlord/Register"
                    color={"upd.400"}
                  >
                    Sign up
                  </Link>
                </Text>
              </GridItem>

              <GridItem rowSpan={1} colSpan={10}></GridItem>
            </Grid>
          </Box>
        </Stack>
      </Container>
    </ChakraProvider>
  );
};

export default Login;

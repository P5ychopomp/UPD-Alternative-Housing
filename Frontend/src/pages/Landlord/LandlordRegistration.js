import { PhoneIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  ChakraProvider,
  Divider,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  HStack,
  Heading,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Link,
  Spacer,
  Stack,
  Text,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import Axios from "axios";
import { useFormik } from "formik";
import { useState } from "react";
import { FaFacebook } from "react-icons/fa";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { Link as ReactLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import Theme from "../../components/Theme";
import { useAuth } from "../../utils/Auth";
import { fetchAuth } from "../../utils/FetchAuth";

export default function Register() {
  const toast = useToast();
  const navigate = useNavigate();
  const auth = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      passwordconfirm: "",
      /*       facebook: "",
      phone: "", */
    },
    validationSchema: Yup.object({
      first_name: Yup.string()
        .max(40, "First Name must be 40 characters or less")
        .required("First Name is required"),
      last_name: Yup.string()
        .max(25, "Last Name must be 25 characters or less")
        .required("Last Name is required"),
      email: Yup.string()
        .email("Email address must contain an '@'")
        .required("Email address is required"),
      password: Yup.string().required("Password is required"),
      passwordconfirm: Yup.string().required("Confirm Password is required"),
      /* facebook: Yup.string().max("Invalid email address").required("Required"),
      phone: Yup.string().max("Invalid email address").required("Required"), */
    }),
    onSubmit: async (values) => {
      await Axios.post(`${fetchAuth}/register`, values, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then(async (response) => {
          setIsLoading(true);
          if (response.status === 200) {
            await Axios.post(
              `${fetchAuth}/login`,
              {
                email: formik.values.email,
                password: formik.values.password,
              },
              {
                credentials: "include",
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded",
                },
              }
            ).then(async (response) => {
              if (response.status === 200) {
                await auth.login();
                showToast(
                  "Great! You are now registered. You will be redirected to the Log-in page",
                  "success",
                  "Account Created"
                );
                setTimeout(() => {
                  navigate("/Landlord/Login");
                }, 2500);
              }
            });
          }
        })
        .catch((errors) => {
          //console.log(error.response.data)
          errors.response.data.forEach((err) => {
            showToast(err, "error", "Error");
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
      setIsLoading(false);
    },
  });

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
      <form onSubmit={formik.handleSubmit}>
        <Flex mt="10" align={"center"} mb="10">
          <Stack
            spacing={8}
            mx={"auto"}
            py={12}
            px={6}
            minW={["100%", "100%", "45em", "55em", "55em"]}
          >
            <Stack align={"center"}>
              <Heading fontSize={"4xl"} textAlign={"center"} color="upd.700">
                Registration
              </Heading>
              <Text fontSize={"lg"} textAlign={"center"} color={"gray.600"}>
                Rent your place with just a few requirements 👌
              </Text>
            </Stack>
            <Box
              rounded={"lg"}
              bg={useColorModeValue("white", "gray.700")}
              boxShadow="0px 0px 15px 1px #dbdbdb"
              p={8}
            >
              <Stack spacing={4}>
                <Flex maxWidth={"100%"} flexWrap="wrap">
                  <Box minW={["100%", "100%", "49%"]}>
                    <FormControl
                      name="fname"
                      id="first_name"
                      isRequired
                      isInvalid={
                        formik.errors.first_name && formik.touched.first_name
                      }
                    >
                      <FormLabel>First Name</FormLabel>
                      <Input
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.first_name}
                      />
                      <FormErrorMessage>
                        {formik.errors.first_name}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                  <Spacer />
                  <Box minW={["100%", "100%", "49%"]}>
                    <FormControl
                      name="=lname"
                      id="last_name"
                      isRequired
                      isInvalid={
                        formik.errors.last_name && formik.touched.last_name
                      }
                    >
                      <FormLabel>Last Name</FormLabel>
                      <Input
                        type="text"
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        value={formik.values.last_name}
                      />
                      <FormErrorMessage>
                        {formik.errors.last_name}
                      </FormErrorMessage>
                    </FormControl>
                  </Box>
                </Flex>
                <FormControl
                  name="email"
                  id="email"
                  isRequired
                  isInvalid={formik.errors.email && formik.touched.email}
                >
                  <FormLabel>Email address</FormLabel>
                  <Input
                    type="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                  />
                  <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
                </FormControl>
                <FormControl
                  id="password"
                  isRequired
                  isInvalid={formik.errors.password && formik.touched.password}
                >
                  <FormLabel>Password</FormLabel>
                  <InputGroup>
                    <Input
                      type={showPassword ? "text" : "password"}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.password}
                    />
                    <InputRightElement width="3.5rem">
                      <Button
                        h="2rem"
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
                  {!formik.errors.password ? (
                    <FormHelperText>
                      Password must be 8 characters long and must contain at
                      least 1 special character and number.
                    </FormHelperText>
                  ) : (
                    <FormErrorMessage>
                      {formik.errors.password}
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl
                  id="passwordconfirm"
                  isRequired
                  isInvalid={
                    formik.errors.passwordconfirm &&
                    formik.touched.passwordconfirm
                  }
                >
                  <FormLabel>Confirm Password</FormLabel>
                  <InputGroup>
                    <Input
                      type="password"
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      value={formik.values.passwordconfirm}
                    />
                  </InputGroup>
                  <FormErrorMessage>
                    {formik.errors.passwordconfirm}
                  </FormErrorMessage>
                </FormControl>
              </Stack>
              <Stack spacing={4}>
                <Divider
                  mt="7"
                  mb="2"
                  borderColor="gray.400"
                  variant="dashed"
                />
                <FormControl id="facebook">
                  <FormLabel>Facebook Profile</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <Icon as={FaFacebook} color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="text"
                      onChange={formik.handleChange}
                      value={formik.values.facebook}
                    />
                  </InputGroup>
                </FormControl>
                <FormControl name="phone" id="phone">
                  <FormLabel>Phone Number</FormLabel>
                  <InputGroup>
                    <InputLeftElement pointerEvents="none">
                      <PhoneIcon color="gray.400" />
                    </InputLeftElement>
                    <Input
                      type="tel"
                      onChange={formik.handleChange}
                      value={formik.values.phone}
                    />
                  </InputGroup>
                </FormControl>
                <HStack spacing={10} pt={2} justifyContent="center">
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
                  >
                    Sign up
                  </Button>
                </HStack>
                <Stack pt={6}>
                  <Text align={"center"}>
                    Already a user?{" "}
                    <Link as={ReactLink} to="/Landlord/Login" color={"upd.400"}>
                      Login
                    </Link>
                  </Text>
                </Stack>
              </Stack>
            </Box>
          </Stack>
        </Flex>
      </form>
    </ChakraProvider>
  );
}

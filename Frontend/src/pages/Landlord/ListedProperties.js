import {
  Box,
  Button,
  Checkbox,
  Container,
  IconButton,
  Image,
  InputGroup,
  Stack,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useToast
} from "@chakra-ui/react";
import Axios from "axios";
import { useEffect, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { useNavigate } from "react-router";
import { fetchBaseUrl } from "../../utils/FetchBaseUrl";
import { useAuth } from "../../utils/Auth";

const ListedProperties = () => {
  const auth = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();
  const [props, setProps] = useState([]);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [hoveredRow, setHoveredRow] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const id = localStorage.getItem("id");
    const getUserListings = async () => {
      await Axios.get(`${fetchBaseUrl}?lid=${id}`).then((res) => {
        setProps(res.data);
      });
    };
    getUserListings();
  }, [setProps]);

  const handleRowHover = (property_id) => {
    setHoveredRow(property_id);
  };

  const date = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      month: "2-digit",
      day: "2-digit",
      year: "numeric",
    });

    return formattedDate;
  };

  const handleSelect = (event, property_id) => {
    if (event.target.checked) {
      setSelectedCheckboxes((prevState) => [...prevState, property_id]);
    } else {
      setSelectedCheckboxes((prevState) =>
        prevState.filter((id) => id !== property_id)
      );
    }
  };

  const submitDelete = async (prop) => {
    setIsLoading(true);
    for (const e of prop) {
      console.log(e);
      await Axios.delete(`${fetchBaseUrl}/delete/${e}`, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      })
        .then((response) => {
          if (response.data) {
            showToast(
              "Selected properties successfully deleted.",
              "success",
              "Property Deleted"
            );
          }
        })
        .catch((error) => {
          showToast(
            "Sorry, we could not delete your selected properties at the moment. Please try again later.",
            "error",
            "Something went wrong"
          );
        });
    }
    setIsLoading(false);
    fetchProps();
  };

  const fetchProps = async () => {
    const id = localStorage.getItem("id");
    try {
      const response = await Axios.get(`${fetchBaseUrl}?lid=${id}`);
      setProps(response.data);
    } catch (error) {
      showToast(
        "Failed to fetch properties. Please try again later.",
        "error",
        "Fetch Error"
      );
    }
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

  const handleEdit = async (selected) => {
    await auth.getProps(selected);
    navigate(`/Landlord/UpdateProperty/${selected}`);
  };

  return (
    <Container maxW={{ base: "100%" }} mt="10" p={{ base: "0", lg: "4" }}>
      <Box
        alignItems="center"
        centerContent
        borderRadius="lg"
        boxShadow="0 0 10px 5px #dbdbdb"
        bgColor="white"
        p="5"
      >
        <TableContainer>
          <Table size={{ base: "lg", md: "sm" }}>
            <Thead>
              <Tr>
                <Th>ID</Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Address</Th>
                <Th>Date Added</Th>
                <Th>Edit</Th>
                <Th>Delete</Th>
              </Tr>
            </Thead>
            <Tbody>
              {props?.map((prop, idx) => (
                <Tr
                  key={prop.property_id}
                  onMouseEnter={() => handleRowHover(prop.property_id)}
                  onMouseLeave={() => handleRowHover(null)}
                  style={{
                    backgroundColor:
                      hoveredRow === prop.property_id ? "#F7FAFC" : "white",
                  }}
                >
                  <Td>{prop.property_id}</Td>
                  <Td>
                    <Image
                      boxSize="50px"
                      borderRadius="full"
                      src={prop.image_url}
                      objectFit="cover"
                      alt={"property " + idx}
                    />
                  </Td>
                  <Td>{prop.property_name}</Td>
                  <Td>{`${prop.street_address} ${prop.brgy} ${prop.city_municip}`}</Td>
                  <Td>{date(prop.date_posted)}</Td>
                  <Td>
                    <IconButton
                      variant="outline"
                      colorScheme="upd"
                      aria-label="Edit Property"
                      fontSize="20px"
                      icon={<FiEdit />}
                      onClick={() => handleEdit(prop.property_id)}
                    />
                  </Td>
                  <Td>
                    <InputGroup className="select">
                      <Checkbox
                        colorScheme="upd"
                        size="lg"
                        onChange={(event) =>
                          handleSelect(event, prop.property_id)
                        }
                      />
                    </InputGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
          <Stack
            direction={["column", "row"]}
            justifyContent="flex-end"
            mt="5"
            mb="5"
          >
            {selectedCheckboxes.length > 0 && (
              <Button
                type="submit"
                isLoading={isLoading}
                loadingText="Deleting"
                colorScheme="upd"
                variant="outline"
                onClick={() => submitDelete(selectedCheckboxes)}
              >
                Delete
              </Button>
            )}
            <Button
              colorScheme="upd"
              onClick={() => navigate("/Landlord/CreateProperty")}
            >
              + Add New Property
            </Button>
          </Stack>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ListedProperties;

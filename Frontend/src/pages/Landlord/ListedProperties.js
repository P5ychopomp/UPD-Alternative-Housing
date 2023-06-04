import {
  Box,
  Image,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Container,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { fetchBaseUrl } from "../../utils/FetchBaseUrl";
import { useNavigate } from "react-router";
import Axios from "axios";

const ListedProperties = ({ property }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const id = localStorage.getItem("id");
    if (!id) navigate('/Landlord/Login')
    const getUserListings = () => {
      Axios.get(`${fetchBaseUrl}?landlord_id=${id}`).then((res) => {
      });
    };
    getUserListings();
  }, []);

  return (
    <Container
      maxW={{ base: "100%", md: "90%" }}
      mt="10"
      p={{ base: "0", lg: "4" }}
    >
      <Box
        mt="20"
        alignItems="center"
        centerContent
        borderRadius="lg"
        boxShadow="0 0 10px 5px #dbdbdb"
        bgColor="white"
        p="5"
      >
        <TableContainer>
          <Table variant="simple" size="lg">
            <Thead>
              <Tr>
                <Th></Th>
                <Th>Image</Th>
                <Th>Title</Th>
                <Th>Date Added</Th>
                <Th>ID</Th>
                <Th>Address</Th>
                <Th>Remove</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  <input type="checkbox" id="select" />
                </Td>
                <Td>
                  {" "}
                  <Image
                    boxSize="50px"
                    borderRadius="full"
                    src="../landlord.png"
                    objectFit="cover"
                    alt="Landlord Profile Picture"
                  />{" "}
                </Td>
                <Td>Title</Td>
                <Td>Date Added</Td>
                <Td>ID</Td>
                <Td>Address</Td>
                <Td>
                  <Button>Danger</Button>
                </Td>
                <Td>
                  <Button>...</Button>
                </Td>
              </Tr>
            </Tbody>
            <Tfoot>
              <Tr>
                <Td>
                  {" "}
                  <Button> + Add New Property</Button>
                </Td>
              </Tr>
            </Tfoot>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default ListedProperties;

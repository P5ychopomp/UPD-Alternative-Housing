import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { ChakraProvider, Container, Spinner, Text } from "@chakra-ui/react";
import { ArrowForwardIcon, ArrowBackIcon } from "@chakra-ui/icons";
import Listings from "../components/Listings";
import Search from "../components/Search";
import SearchFilters from "../components/SearchFilters";
import NoData from "../components/NoData";
import Theme from "../components/Theme";
import { fetchBaseUrl } from "../utils/FetchBaseUrl";
import styles from "./styles/Home.module.css";
import axios from "axios";

function Home() {
  const [query, setQuery] = useState("");
  const [keywords, setKeywords] = useState(query);
  const [properties, setListings] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchFilters, setSearchFilters] = useState("");
  const [sfVisible, setSfVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [totalpage, setTotalpage] = useState(20);
  const [none, setNone] = useState(true);

  useEffect(() => {
    const getListings = () => {
      setIsLoading(true);
      axios.get(`${fetchBaseUrl}?${query}${searchFilters}`).then((res) => {
        const house = res.data;
        if (house.data.length === 0) setNone(false);
        setTotalpage(house.data.length);
        setpageCount(Math.ceil(totalpage / 20));
        axios
          .get(`${fetchBaseUrl}?page=${page + 1}&${query}${searchFilters}`)
          .then((res) => {
            setIsLoading(false);
            const house = res.data;
            setListings(house.data);
          });
      });

      //const total = res.headers.get("x-total-count");
    };
    getListings();
  }, [query, page, searchFilters, totalpage, setTotalpage]);

  const handlePageClick = async (data) => {
    setPage(data.selected);
  };
  if (typeof window !== "undefined") {
    window.onload = function () {
      sessionStorage.clear();
    };
  }

  return (
    <div>
      <ChakraProvider theme={Theme}>
        <Container maxW="100%">
          <Search
            keywords={keywords}
            setKeywords={setKeywords}
            query={query}
            setQuery={setQuery}
            sfVisible={sfVisible}
            setSfVisible={setSfVisible}
          />
          {sfVisible && (
            <Container minWidth="90%" mt="-5">
              <SearchFilters
                setKeywords={setKeywords}
                keywords={keywords}
                setQuery={setQuery}
                setPage={setPage}
                setFilters={setSearchFilters}
                filters={searchFilters}
              />
            </Container>
          )}

          <Container mt="2em" mb="2em" centerContent>
            <ReactPaginate
              previousLabel={<ArrowBackIcon style={{ fontSize: 18 }} />}
              nextLabel={<ArrowForwardIcon style={{ fontSize: 18 }} />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"item pagination-page "}
              pageLinkClassName={"item page-link"}
              previousClassName={"item previous"}
              previousLinkClassName={"item page-link"}
              nextClassName={"item next"}
              nextLinkClassName={"item page-link"}
              breakClassName={"item"}
              breakLinkClassName={"item page-link"}
              activeClassName={"page-active"}
              disabledClassName={"disabled-page"}
              forcePage={page}
            />
          </Container>

          {!isLoading ? (
            <Listings properties={properties} />
          ) : (
            <Container mt="20" centerContent>
              <Spinner color="gray.600" size="xl" />
              <Text color="gray.600" fontWeight="bold" mt="5">
                Fetching Listings...
              </Text>
            </Container>
          )}
          <Container mt="5em" centerContent>
            <ReactPaginate
              previousLabel={<ArrowBackIcon style={{ fontSize: 18 }} />}
              nextLabel={<ArrowForwardIcon style={{ fontSize: 18 }} />}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={1}
              pageRangeDisplayed={3}
              onPageChange={handlePageClick}
              containerClassName={"pagination"}
              pageClassName={"item pagination-page "}
              pageLinkClassName={"item page-link"}
              previousClassName={"item previous"}
              previousLinkClassName={"item page-link"}
              nextClassName={"item next"}
              nextLinkClassName={"item page-link"}
              breakClassName={"item"}
              breakLinkClassName={"item page-link"}
              activeClassName={"page-active"}
              disabledClassName={"disabled-page"}
              forcePage={page}
            />
          </Container>
        </Container>
      </ChakraProvider>
    </div>
  );
}

export default Home;

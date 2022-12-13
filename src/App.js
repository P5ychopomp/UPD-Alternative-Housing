import { BrowserRouter as Router} from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import { ChakraProvider, Container } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Navbar from './components/Navbar'
import Listings from './components/Listings'
import Search from './components/Search'
import Footer from './components/Footer';
import SearchFilters from './components/SearchFilters';
import Theme from './components/Theme'
import './styles/App.css';


function App() {
  const [query, setQuery] = useState('');
  const [properties, setListings] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchFilters, setSearchFilters] = useState('');
  const [sfVisible, setSfVisible] = useState(false);

  useEffect(() => {
      const getListings = async () => {
        const res = await fetch(`http://192.168.1.100:8080/listings?_page=${page+1}&_sort=property_id&_order=desc&q=${query}${searchFilters}`);
        const data = await res.json();
        const total = res.headers.get("x-total-count");
        setpageCount(Math.ceil(total / 10));
        setListings(data);
      }
      getListings()

  }, [query,page,searchFilters])

  const handlePageClick = async (data) => {
    setPage(data.selected);
  };
  
    return (
      <Router>
      <Navbar />
      <div className='container'>
        <ChakraProvider theme={Theme}>
          <Search query={query} setQuery={setQuery} sfVisible={sfVisible} setSfVisible={setSfVisible}/>
          {sfVisible && <Container minWidth='90%' mt='-5'>
            <SearchFilters setFilters={setSearchFilters} filters={searchFilters}/>
          </Container>}
          </ChakraProvider>
        <Container mt='2em' mb='2em' centerContent>
          <ReactPaginate
            previousLabel={<ArrowBackIcon style={{ fontSize: 18 }} />}
            nextLabel={<ArrowForwardIcon style={{ fontSize: 18 }} />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={'item pagination-page '}
            pageLinkClassName={"item page-link"}
            previousClassName={"item previous"}
            previousLinkClassName={"item page-link"}
            nextClassName={"item next"}
            nextLinkClassName={"item page-link"}
            breakClassName={"item"}
            breakLinkClassName={"item page-link"}
            activeClassName={"page-active"}
            disabledClassName={'disabled-page'}
            forcePage={(page)}
          />
        </Container>
        <Listings properties={properties}/>
        <Container mt='5em' centerContent>
          <ReactPaginate
            previousLabel={<ArrowBackIcon style={{ fontSize: 18 }} />}
            nextLabel={<ArrowForwardIcon style={{ fontSize: 18 }} />}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={"pagination"}
            pageClassName={'item pagination-page '}
            pageLinkClassName={"item page-link"}
            previousClassName={"item previous"}
            previousLinkClassName={"item page-link"}
            nextClassName={"item next"}
            nextLinkClassName={"item page-link"}
            breakClassName={"item"}
            breakLinkClassName={"item page-link"}
            activeClassName={"page-active"}
            disabledClassName={'disabled-page'}
            forcePage={(page)}
          />
        </Container>
        
      </div>
      <Footer />
    </Router>
      
    )
}

export default App;

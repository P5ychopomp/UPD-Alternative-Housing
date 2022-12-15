import { Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import { ChakraProvider, Container } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';
import Navbar from './components/Navbar'
import Listings from './components/Listings'
import Search from './components/Search'
import Footer from './components/Footer';
import SearchFilters from './components/SearchFilters';
import Theme from './components/Theme';
import Properties from './pages/Properties';
import Faqs from './pages/Faqs';
import About from './pages/About';
import TermsofService from './pages/TermsofService';
import Privacy from './pages/Privacy';
import ContactUs from './pages/ContactUs';
import PostingGuides from './pages/PostingGuides';
import Safety from './pages/Safety';
import SearchGuides from './pages/SearchGuides';
import { fetchBaseUrl } from './utils/FetchBaseUrl';
import './styles/App.css';


function App() {
  const [query, setQuery] = useState('');
  const [keywords, setKeywords] = useState(query);
  const [properties, setListings] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(0);
  const [searchFilters, setSearchFilters] = useState('');
  const [sfVisible, setSfVisible] = useState(false);

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`${fetchBaseUrl}?${query}${searchFilters}`);
      const house = await res.json();
      const total = res.headers.get("x-total-count");
      setpageCount(Math.ceil(total / 10));
      setListings(house.data);

    }
    getListings()

  }, [query, page, searchFilters])

  const handlePageClick = async (data) => {
    setPage(data.selected);
  };

  window.onload = function () {
    sessionStorage.clear();
  }

  return (
    <div>
      <div className='container' style={{ overflow: "hidden" }}>
        <Navbar />
        <div>
          <Routes>
            <Route path='/' element={
              <Container>
                <ChakraProvider theme={Theme}  >
                  <Search keywords={keywords} setKeywords={setKeywords} query={query} setQuery={setQuery} sfVisible={sfVisible} setSfVisible={setSfVisible} />
                  {sfVisible && <Container minWidth='90%' mt='-5'>
                    <SearchFilters setKeywords={setKeywords} keywords={keywords} setQuery={setQuery} setPage={setPage} setFilters={setSearchFilters} filters={searchFilters} />
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
                <Listings properties={properties} />
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
              </Container>
            } />
            <Route path='/AboutUs' element={<About />} />
            <Route path='/Faqs' element={<Faqs />} />
            <Route path='/:id' element={<Properties />} />
            <Route path='/TermsofService' element={<TermsofService />} />
            <Route path='/Privacy' element={<Privacy />} />
            <Route path='/ContactUs' element={<ContactUs />} />
            <Route path='/PostingGuides' element={<PostingGuides />} />
            <Route path='/SearchGuides' element={<SearchGuides />} />
            <Route path='/Safety' element={<Safety />} />
          </Routes>
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default App;

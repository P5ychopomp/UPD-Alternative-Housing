import { BrowserRouter as Router} from 'react-router-dom'
import { useState, useEffect } from 'react'
import ReactPaginate from "react-paginate";
import Navbar from './components/Navbar'
import Listings from './components/Listings'
import Search from './components/Search'
import Footer from './components/Footer';
import './App.css';
import { Button, ChakraProvider, Container, Input, Spinner } from '@chakra-ui/react'
import { ArrowForwardIcon, ArrowBackIcon } from '@chakra-ui/icons';

function App() {
  const [query, setQuery] = useState('');
  const [properties, setListings] = useState([]);
  const [errMessage, setErrMessage] = useState('');
  const [pageCount, setpageCount] = useState(0);
  const [page, setPage] = useState(0);

  useEffect(() => {
      const getListings = async () => {
        const res = await fetch(`http://192.168.1.100:8080/listings?_page=${page+1}&_sort=property_id&_order=desc&q=${query}`);
        const data = await res.json();
          const total = res.headers.get("x-total-count");
          setpageCount(Math.ceil(total / 10));
          setListings(data);
      }
      getListings()
  }, [query,page])

  const fetchListings = async (currentPage) => {
      const res = await fetch(`http://192.168.1.100:8080/listings?_page=${currentPage}&_sort=property_id&_order=desc&q=${query}`);
      if (res.status !== 200) {
        const err = await res.json();
        setErrMessage('Error: '+err);
        // eslint-disable-next-line no-throw-literal
        throw {message: err.message, status:err.cod};
      } 
      const data = await res.json();
      data.length === 0 ? setErrMessage('No data fetched :<') : setErrMessage('');
      return data;
  };

  const handlePageClick = async (data) => {
    console.log(data.selected);

    let currentPage = data.selected + 1;

    setPage(data.selected);

    const FromServer = await fetchListings(currentPage);

    setListings(FromServer);
  };
  
    return (
      <Router>
      <Navbar />
      <div className='container'>
        <Search properties={properties} setProperties={setListings} query={query} setQuery={setQuery}/>
        <Container mb='2em' centerContent>
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
        {errMessage && (<Container centerContent> {errMessage} </Container>)}
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

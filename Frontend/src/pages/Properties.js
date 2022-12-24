import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBaseUrl } from '../utils/FetchBaseUrl';
import Property from '../components/Property'

const Properties = () => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const getListings = async () => {
      if (/^-?\d+$/.test(id) === true) {
        const res = await fetch(`${fetchBaseUrl}/${id}`);
        const data = await res.json();
        setData(data.data[0]);
        window.scrollTo(0, 0)
      }
    }
    getListings()

  }, [id])

  return (
    <div style={{ marginTop: "5em" }}>
      <Property property={ data }/>
    </div>
  )
}

export default Properties
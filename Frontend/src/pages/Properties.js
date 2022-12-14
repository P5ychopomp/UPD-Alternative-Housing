import { React, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { fetchBaseUrl } from '../utils/FetchBaseUrl';

const Properties = (props) => {
  const { id } = useParams();
  const [data, setData] = useState({});

  useEffect(() => {
    const getListings = async () => {
      const res = await fetch(`${fetchBaseUrl}/${id}`);
      const data = await res.json();
      setData(data);
    }
    getListings()

  }, [])

  return (
    <div style={{ marginTop: "5em" }}>{JSON.stringify(data)}</div>
  )
}

export default Properties
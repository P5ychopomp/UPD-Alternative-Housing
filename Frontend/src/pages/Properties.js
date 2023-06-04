import { React, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchBaseUrl } from "../utils/FetchBaseUrl";
import Property from "../components/Property";
import Axios from "axios";

const Properties = () => {
  const { id } = useParams();
  const [data, setData] = useState({});
  useEffect(() => {
    const getListings = () => {
      if (/^-?\d+$/.test(id) === true) {
        Axios.get(`${fetchBaseUrl}/${id}`).then((res) => {
          setData(res.data[0]);
          window.scrollTo(0, 0);
        });
      }
    };
    getListings();
  }, [id]);

  return (
    <div style={{ marginTop: "5em" }}>
      <Property property={data} />
    </div>
  );
};

export default Properties;

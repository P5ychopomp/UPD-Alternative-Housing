import { React, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { fetchBaseUrl } from "../utils/FetchBaseUrl";
import Property from "../components/Property";
import axios from "axios";


export async function getServerSideProps(context) {
  const { id } = context.query;
  const res = await fetch(`${fetchBaseUrl}/${id}`);
    const data = await res.json();
    return { props: { data } }
}

const Properties = ({ data }) => {
console.log(data.data[0])

  return (
    <div style={{ marginTop: "5em" }}>
      <Property property={data.data[0]} />
    </div>
  );
};

export default Properties;

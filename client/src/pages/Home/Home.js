import React, { useEffect } from "react";
import axios from "axios";
import Layout from "../../components/Layout";

function Home() {
  const getData = async () => {
    try {
      const response = await axios.post(
        "/api/user/get-user-info-by-id",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log(response.data);
    } catch (error) {
      console.log(error.response.data);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout>
      <h1>Homepage</h1>
    </Layout>
  );
}

export default Home;

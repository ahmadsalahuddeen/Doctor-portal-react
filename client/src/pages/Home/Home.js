import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout"; 
import { useSelector } from "react-redux";

function Home() {
  const {user} = useSelector((state => state.user))

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
    <Layout >
      <h1>Homepage</h1>
      asklduyfhlakjsdhflkjahsdf
      asdljkfhalsdkjfh
    </Layout>
    
  );
}

export default Home;

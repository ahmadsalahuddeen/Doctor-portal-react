import React, { useEffect, useState } from "react";
import axios from "axios";
import Layout from "../../components/Layout"; 
import { useSelector } from "react-redux";

function Home() {
  const {user} = useSelector((state => state.user))

  return (
    <Layout >
      <h1>Homepage</h1>
      asklduyfhlakjsdhflkjahsdf
      asdljkfhalsdkjfh
    </Layout>
    
  );
}

export default Home;

import React, { useEffect, useState } from "react";
import { authAxios } from "../middlewares/AxiosInstance";

import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import Layout from "../components/Layout";

function DoctorsList() {

  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState([]);
  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await authAxios.get("/admin/get-doctor-list");

      dispatch(hideLoading());
      if (res.data.data) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log("failed to laod doctor list");
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Layout>
      <div>DoctorsList</div>
    </Layout>
  );
}

export default DoctorsList;

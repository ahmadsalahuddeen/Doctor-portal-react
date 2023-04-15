import Layout from "../components/Layout";
import React from "react";
import "../App.css";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import toast from "react-hot-toast";
import axios from "axios";
import DoctorForm from "../components/DoctorForm"; 
function ApplyDoctor() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post(
        "/api/user/apply-doctor-account",
        { ...values, userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <DoctorForm
        buttonText="Submit"
        title="Doctor Application Form"
        handleSubmit={handleSubmit}
      />
    </Layout>
  );
}

export default ApplyDoctor;

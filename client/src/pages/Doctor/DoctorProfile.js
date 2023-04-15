import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/Layout";
import React, { useEffect, useState } from "react";

import { authAxios } from "../../middlewares/AxiosInstance";

import { useNavigate } from "react-router-dom";

import { hideLoading, showLoading } from "../../redux/alertSlice";
import toast from "react-hot-toast";
import DoctorForm from "../../components/DoctorForm";

function DoctorProfile() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [doctor, setDoctor] = useState(null);

  const getUserData = async () => {
    try {
      dispatch(showLoading());
      const res = await authAxios.get("/doctor/get-doctor-info-by-userId", {
        userId: user?._id,
      });

      dispatch(hideLoading());
      if (res.data.data) {
        setDoctor(res.data.data);
      }
    } catch (error) {
      dispatch(hideLoading());

      console.log("failed to laod doctor list");
    }
  };

  const handleSubmit = async (values) => {
    try {
      dispatch(showLoading());
      const response = await authAxios.post("/doctor/update-doctor-info", {
        ...values,
        userId: user._id,
      });

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

  useEffect(() => {
    getUserData();
  }, []);
  return (
    <Layout>
      {doctor && (
        <DoctorForm
          buttonText="Update"
          title="Doctor Profile"
          handleSubmit={handleSubmit}
          initialValues={doctor}
        />
      )}
    </Layout>
  );
}

export default DoctorProfile;

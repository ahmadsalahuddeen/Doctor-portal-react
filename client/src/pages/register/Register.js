import React from "react";
import "./index.css";
import "../../App.css";
import { Button, Input, Form } from "antd";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";
function Register() {
const dispatch = useDispatch()
  const navigate = useNavigate()
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())
      const response = await axios.post("/api/user/register", values);
dispatch(hideLoading())
      if (response.data.success) {
        toast.success(response.data.message);
        toast('redirected to Login')
        navigate('/login')

      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading())

      toast.error("form submit failed", error);
    }
  };
  return (
    <div className="auth">
      <div className="auth-form card p-4">
        <h1 className="card-title">Create an Account</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Name" name="name">
            <Input placeholder="Name" />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="password" />
          </Form.Item>
          <Button className="primary-button mt-3 my-3" htmlType="submit1">
            Signup
          </Button>
          <Link className="anchor " to="/login">
            click here to login
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Register;

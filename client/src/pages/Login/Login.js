import React from "react";
import "../../App.css";
import { Button, Input, Form } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { hideLoading, showLoading } from "../../redux/alertSlice";

function Login() {

// const {loading} = useSelector(state => state.alerts)
// console.log(loading)

const dispatch = useDispatch()
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading())

      const response = await axios
        .post("/api/user/login", values)
        dispatch(hideLoading())
       if (response.data.data) {
        toast.success('logged succefully')
        localStorage.setItem('token', response.data.data)
        toast('redirecting to home page')
        navigate('/')
       } else {
        toast.error(response.data.message)
       }
        
    } catch (error) {
dispatch(hideLoading())

toast.error('something went  wrong')
    }
  };

  return (
    <div className="auth">
      <div className="auth-form card p-4">
        <h1 className="card-title pb-3">Login to your Account</h1>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input type="email" placeholder="email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" placeholder="password" />
          </Form.Item>
          <Button className="primary-button mt-3 my-2" htmlType="submit1">
            {" "}
            Signup
          </Button>
          <Link className="anchor" to="/register">
            click here to Create and Account
          </Link>
        </Form>
      </div>
    </div>
  );
}

export default Login;

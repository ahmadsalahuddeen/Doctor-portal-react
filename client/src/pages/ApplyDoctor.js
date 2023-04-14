import Layout  from '../components/Layout'
import React from 'react'
import '../App.css'
import { Col, Form, Input, Row, TimePicker, Button  } from 'antd'
import { resolvePath, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'
import toast  from 'react-hot-toast'
import axios from 'axios'
function ApplyDoctor() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.user)
    const handleSubmit = async(values) =>{
    try {
        dispatch(showLoading())
        const response = await axios.post('/api/user/apply-doctor-account', {...values, userId: user._id}, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        }) 
        
        dispatch(hideLoading())
        if(response.data.success){
toast.success(response.data.message)
navigate('/')
        }else{
toast.error(response.data.message)
        }

    } catch (error) {
        dispatch(hideLoading())
        toast.error('something went wrong')
    }
    }
  return (
<Layout>
    <h1 className='page-title'>Doctor Application</h1>
        <hr />
    <Form layout='vertical' onFinish={handleSubmit}  >
        <h1 className="card-title mt-3">
            Personal Information
        </h1>
     <Row gutter={20} >
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='firstName' label='First Name' rules={[{required : true}]}>
            <Input placeholder='Enter you First Name' />
        </Form.Item>
        </Col>
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='lastName' label='Last Name' rules={[{required : true}]}>
            <Input placeholder='Enter you Last Name' />
        </Form.Item>
        </Col>
      
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='mobileNumber' label='Mobile Number' rules={[{required : true}]}>
            <Input placeholder='Enter you phone' />
        </Form.Item>
        </Col>
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='address' label='Address' rules={[{required : true}]}>
            <Input placeholder='Enter Address' />
        </Form.Item>
        </Col>
        
        </Row>    
        <hr />
        <h1 className="card-title mt-3">
            Proffesional Information
        </h1>
     <Row gutter={20} >
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='specialization' label='Specialization' rules={[{required : true}]}>
            <Input placeholder='Enter you specialization' />
        </Form.Item>
        </Col>
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='experience' label='Experience' rules={[{required : true}]}>
            <Input min={0} placeholder='Enter you experience' type='number' />
        </Form.Item>
        </Col>
       
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='feePerConsultation'  label='Fee per Consultation' rules={[{required : true}]}>
            <Input min={0} placeholder='Enter you phone'  type='number'/>
        </Form.Item>
        </Col>
        <Col lg={8} span={8} xs={24} sm={24} >
        <Form.Item required name='timings' label='Timing' rules={[{required : true}]}>
        <TimePicker.RangePicker  />
        </Form.Item>
        </Col>
        </Row> 
        <div className="d-flex justify-content-end">
            <Button className='primary-button-apply' htmlType='submit'  >SUBMIT</Button>
        </div>
    </Form>
</Layout>
  )
}

export default ApplyDoctor
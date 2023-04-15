import React from 'react'
import { Col, Form, Input, Row, TimePicker, Button  } from 'antd'

function DoctorForm({title, handleSubmit,buttonText}) {
  return (
    <>
    <h1 className='page-title'>{title}</h1>
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
            <Button className='primary-button-apply' htmlType='submit'  >{buttonText}</Button>
        </div>
    </Form>
    </>
  )
}

export default DoctorForm
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios' 
import { setUser } from '../redux/userSlice'
import { showLoading, hideLoading } from '../redux/alertSlice'

function ProtectedComponents(props) {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const {user} = useSelector(state => state.user)
const getUser = async()=>{
  try {
    dispatch(showLoading())
  const response = await   axios.post('/api/user/get-user-info-by-id',{},
    {
      headers:{
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  })
  dispatch(hideLoading())

if (response.data.success) {
  dispatch(setUser(response.data.data))

} else {
  localStorage.clear()
  navigate('/login')
}
  } catch (error) {
    dispatch(hideLoading())
  localStorage.clear()
    
navigate('/login')
  }
}
useEffect(()=>{
 if(!user ){
  getUser()
 }
},[])

  if (localStorage.getItem('token')) {
    return props.children
  } else {
    return <Navigate to='/login' /> 
  }
    
}

export default ProtectedComponents  
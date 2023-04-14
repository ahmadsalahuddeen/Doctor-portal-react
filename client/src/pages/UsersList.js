import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'
import { authAxios } from '../middlewares/AxiosInstance'

function UsersList() {
    const dispatch = useDispatch()
const [user, setUsers] = useState([])
const getUserData = async()=>{
try {
    dispatch(showLoading())
 const response = await authAxios.post('/admin/get-user-details')

    dispatch(hideLoading())
    
    
} catch (error) {
    dispatch(hideLoading())

    toast.error('Failed to load users')
}

}


useEffect(()=>{
getUserData()
},[])

  return (
    <div>UsersList</div>
  )
}

export default UsersList
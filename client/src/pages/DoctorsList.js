import React, { useEffect, useState } from 'react'
import { authAxios } from '../middlewares/AxiosInstance'
import { getUserInfo } from '../../../controllers/userController'
import toast from 'react-hot-toast'

function DoctorsList() {
    const 
cont [user, setUserData ] = useState([])
    const getUsers = async ()=>{
    try {
        
    } catch (error) {
        toast.error('failed to load doctors List')
    }
   
}
useEffect(()=>{
getUsers()
},[])

  return (
    <div>DoctorsList</div>
  )
}

export default DoctorsList
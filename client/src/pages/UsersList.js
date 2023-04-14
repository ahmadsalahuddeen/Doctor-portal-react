import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { hideLoading, showLoading } from '../redux/alertSlice'
import { authAxios } from '../middlewares/AxiosInstance'
import Layout from '../components/Layout'

function UsersList() {
    const dispatch = useDispatch()
const [user, setUsers] = useState([])
const getUserData = async()=>{
try {
    dispatch(showLoading())
 const res = await authAxios.get('/admin/get-user-list')
 dispatch(hideLoading())

 if (res.data.data) {
    setUsers(res.data.data)
 }

    
    
} catch (error) {
    dispatch(hideLoading())

console.log('failed to load users list')
}

}


useEffect(()=>{
getUserData()
},[])

  return (
    <Layout>

        <div>UsersList</div>
    </Layout>
  )
}

export default UsersList
import { Tabs } from 'antd'
import Layout  from '../components/Layout'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Notification() {
    const navigate = useNavigate()
    const {user} = useSelector((state) => state.user)
  return (
    <Layout>
<h1 className='page-title' >Notifications</h1>
<Tabs>
    <Tabs.TabPane tab='unseen' key={0} >
<div className="d-flex justify-content-end ">
    <h1 className="anchor cursorPointer">
        Mark all as seen
    </h1>

</div>

{user.unseenNotification.map(notification =>{
return <div  className='card p-2 my-2 cursorPointer' onClick={()=>{navigate(notification.onClickPath)}}>
    <div className="card-text">
       {notification.message}
 
    </div>
</div>
})}
    </Tabs.TabPane>
    <Tabs.TabPane tab='seen' key={1} >
    <div className="d-flex justify-content-end ">
    <h1 className="anchor">
        Delete All
    </h1>
</div>
    </Tabs.TabPane>
</Tabs>
    </Layout>
  )
}

export default Notification
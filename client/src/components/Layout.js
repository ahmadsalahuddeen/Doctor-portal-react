import React, { useEffect, useState } from "react";
import "./Layout.css";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { useLocale } from "antd/es/locale";
import useSelection from "antd/es/table/hooks/useSelection";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../redux/alertSlice";
import { Badge } from "antd";
import { reset, setUser } from "../redux/userSlice";

function Layout({ children ,   }) {
 
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const {user} = useSelector((state => state.user))
const navigate = useNavigate()
const dispatch = useDispatch()

  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    {
      name: "Appoinments",
      path: "/appoinments",
      icon: "ri-file-list-3-line",
    },
    {
      name: "Apply Doctor",
      path: "/apply-doctor",
      icon: "ri-hospital-line",
    },
    {
      name: "Profile",
      path: "/profile",
      icon: "ri-user-3-line",
    },
  
  ];
  const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    {
      name: "Appoinments",
      path: "/appoinments",
      icon: "ri-file-list-3-line",
    },
  
    {
      name: "Profile",
      path: `/doctor/profile/${user._id}`,
      icon: "ri-user-3-line",
    },
  
  ];
  const adminMenu = [
    {
      name: "Home",
      path: "/",
      icon: "ri-home-smile-2-fill",
    },
    {
name: 'Users',
path: '/users',
icon: 'ri-user-line'
    },
    {
      name: 'Doctors',
      path: '/doctors',
      icon: 'ri-shield-user-line'
    },
 
    // { hided beacuse thers a path to profile in header
    //   name: "Profile",
    //   path: "/profile",
    //   icon: "ri-user-3-line",
    // },
    
  ];

  

  // console.log('object ', data)

  const menuToBeRendered = user?.isAdmin ? adminMenu : user?.isDoctor ? doctorMenu : userMenu
  return (
    <div className="main">
      <div className="d-flex layout">
        <div className="sidebar">
          <div className="sidebar-header">
            <h1 className="Title">{!collapsed ?`B'Healthy` : '❤️‍🩹'} </h1>
          </div>
          <div className="menu">
            {menuToBeRendered.map((menu) => {
              const isActive = location.pathname === menu.path;
              return (
                <div
                  className={`d-flex menu-item ${
                    isActive && "active-menu-item"
                  }`}
                >
                  <i className={menu.icon}></i>
                  {!collapsed && (
                    <Link className="pe-4" to={menu.path}>
                      {menu.name}
                    </Link>
                  )}
                </div>
              );
            })}
            <div onClick={()=>{
             localStorage.clear()
             dispatch(reset())
              navigate('/login')
            }}
                  className={`d-flex menu-item `}
                >
                  <i className='ri-logout-circle-line'></i>
                  {!collapsed && (
                    <Link className="pe-4">
                      LogOut
                    </Link>
                  )}
                </div>
          </div>
        </div>
        <div className="content">
          <div className="header">
            {collapsed ? (
              <i
                className="ri-menu-2-line close-icon"
                onClick={() => {
                  setCollapsed(false);
                }}
              ></i>
            ) : (
              <i
                className="ri-close-line close-icon"
                onClick={() => {
                  setCollapsed(true);
                }}
              ></i>
            )}

<div className="d-flex align-items-center px-4 ">
<Badge count={user?.unseenNotification.length} onClick={()=>navigate('/notification')}>

<i className="ri-notification-line close-icon  "></i>
    </Badge>
<Link className="bg-info px-4 py-2  ms-4  linkProfile" to='/profile'>{user?.name}</Link>

</div>

          </div>
          <div className="body">{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;

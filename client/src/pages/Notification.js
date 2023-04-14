import { Tabs } from "antd";
import Layout from "../components/Layout";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hideLoading, showLoading } from "../redux/alertSlice";
import Axios from "axios";
import { setUser } from "../redux/userSlice";

function Notification() {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const markAsSeen = async () => {
    try {
        

      const res = await Axios.post(
        '/api/user/notification/mark-all-as-seen',
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data))
        toast.success(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong 🙈");
    }
  };

  const deleteNotification = async () => {
    try {
      dispatch(showLoading());
      const res = await Axios.post(
        "/api/user/notification/delete-notification",
        { userId: user._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      dispatch(hideLoading());
      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success(res.data.message);
      } else {
        toast.success(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("something went wrong");
    }
  };
  return (
    <Layout>
      <h1 className="page-title">Notifications</h1>
      <Tabs>
        <Tabs.TabPane tab="unseen" key={0}>
          <div className="d-flex justify-content-end  ">
            <h1 className="anchor cursorPointer" onClick={markAsSeen}>
              Mark all as seen
            </h1>
          </div>

          {user?.unseenNotification.map((notification) => {
            return (
              <div className="card p-2 my-2 cursorPointer">
                <div
                  className="card-text"
                  onClick={() => {
                    navigate(notification.onClickPath);
                  }}
                >
                  {notification.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="seen" key={1}>
          <div className="d-flex justify-content-end ">
            <h1 className="anchor cursorPointer" onClick={deleteNotification}>
              Delete All
            </h1>
          </div>
          {user?.seenNotifications.map((notification) => {
            return (
              <div className="card p-2 my-2 cursorPointer">
                <div
                  className="card-text"
                  onClick={() => {
                    navigate(notification.onClickPath);
                  }}
                >
                  {notification.message}
                </div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
}

export default Notification;

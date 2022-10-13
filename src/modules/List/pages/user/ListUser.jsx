import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import scss from "../project/style.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getAllUser,getdetailUser } from "modules/List/slices/userSlices";

const { Header, Sider, Content } = Layout;

const ListUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { users } = useSelector((state) => state.user);
  // console.log(users[0]);
  const dispatch = useDispatch();
  // console.log(projects)

  // const user = JSON.parse(localStorage.getItem("user"));
//  const reUser = users?.reverse()
   const userz = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    // const user = JSON.parse(localStorage.getItem("user"));
    dispatch(getAllUser());
  }, []);
  const handleDelte = (userId)=>{
    // console.log(userz.accessToken)
      console.log(userId)
      dispatch(deleteUser({userId:userId,acc:userz.accessToken}))
  }
  const handleSelect = (user)=>{
    localStorage.setItem("userdetail", JSON.stringify(user));
    // dispatch(getdetailUser(user ))
    // console.log(user.userId)   
     navigate(`/user/${user.userId}`)
  }

 
  return (
    <div>
      <div className="row">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={scss.logo} />
        <div onClick={()=>{
          navigate("/")
        }} className={scss.iho} >
          <UserOutlined className={scss.icon} />
          <a className=" text-decoration-none text-white ">Projet List</a>
        </div>
        <div className={scss.iho} onClick ={()=>{
          navigate("/CreateUser")
        }} >
          <VideoCameraOutlined className={scss.icon} />
          <a className="text-decoration-none text-white">Create user</a>
        </div>
        <div className={scss.iho} >
          <UploadOutlined className={scss.icon} />
          <a className="text-decoration-none text-white">User List</a>
        </div>
      </Sider>
        <div className="col-sm-10">
         <h1 className="text-center"> USERS LIST</h1>
         <table className="table table-striped">
            <thead>
              <tr>
                <th>Id</th>
                <th>avatar</th>
                <th>name</th>
                <th>email</th>
                <th>phoneNumber</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user) => {
                return (
                  <tr key={user.userId}>
                    <td>{user.userId}</td>
                    <td>
                      <img src={user.avatar} alt="" />
                    </td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.phoneNumber}</td>
                    <td>
                     <button className="btn btn-success" onClick={()=>handleSelect(user)} >update</button>
                     <button className="btn btn-danger" onClick={()=>handleDelte(user.userId)}>Delete</button>
                    </td>
                  </tr>
                );
              }).reverse()}
            </tbody>
          </table>

        </div>
      </div>
      
    </div>
   
  );
};

export default ListUser;
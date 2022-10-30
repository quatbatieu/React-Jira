import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import scss from "../project/style.module.scss";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUser,
  getAllUser,
  getdetailUser,
} from "modules/List/slices/userSlices";
import { Button, Modal } from "antd";

const { Header, Sider, Content } = Layout;
const { confirm } = Modal;

const ListUser = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const { users } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // const user = JSON.parse(localStorage.getItem("userId"));
  // console.log(user);
  // const userIds = user.userId;
  const userz = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    dispatch(getAllUser());
  }, []);

  const showConfirm = (userIds) => {
    console.log(userIds);
    confirm({
      title: 'Do you Want to delete user ?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelte(userIds)
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  const handleDelte = (userIds) => {
    dispatch(deleteUser({ userId: userIds, acc: userz.accessToken }));
  };
  const handleSelect = (user) => {
    localStorage.setItem("userdetail", JSON.stringify(user));
    navigate(`/user/${user.userId}`);
  };

  return (
    <>
      {/* <Modal
        title="Có muốn xóa user ?"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Button
          className="btn btn-danger "
          // onClick={() => (
          //   handleDelte(userIds),
          //   handleCancel(),
          //   handleOk()
          //   )}
        >
          Có
        </Button>
      </Modal> */}
      <div className="row">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className={scss.logo} />
          <div
            onClick={() => {
              navigate("/");
            }}
            className={scss.iho}
          >
            <UserOutlined className={scss.icon} />
            <a className=" text-decoration-none text-white ">Projet List</a>
          </div>
          <div
            className={scss.iho}
            onClick={() => {
              navigate("/CreateUser");
            }}
          >
            <VideoCameraOutlined className={scss.icon} />
            <a className="text-decoration-none text-white">Create user</a>
          </div>
          <div className={scss.iho}>
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
              {users
                ?.map((user) => {
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
                        <button
                          className="btn btn-success"
                          onClick={() => handleSelect(user)}
                        >
                          update
                        </button>
                        <Button
                          className="btn btn-danger"
                          onClick={() => showConfirm(user.userId)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  );
                })
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default ListUser;

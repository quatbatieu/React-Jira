import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, notification } from "antd";
import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import scss from "./style.module.scss";
import { useNavigate, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  getAllProject,
  deleteProject,
  getUser,
  assignUserProject,
} from "modules/List/slices/projectSlices";
import { getProjectDetails } from "modules/List/slices/taskSlices";
import { removeUserz } from "modules/List/slices/projectSlices";
import { logout } from "modules/Authentication/slices/authSlice";

const { Header, Sider, Content } = Layout;

const ListProject = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: projects, listuser: users } = useSelector(
    (state) => state.project
  );
  const { data1: tasks } = useSelector((state) => state.task);

  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user);

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      projectId: "",
      userId: "",
    },
  });

  const handleDelete = (projectId, acces) => {
    dispatch(deleteProject({ projectId, acces }));
  };
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleClick1 = () => {
    navigate("/");
  };

  const handleClick2 = () => {
    navigate("/addproject");
  };

  const handleClick3 = () => {
    navigate("/user");
  };

  const handleClick4 = (taskId, acce) => {
    dispatch(getProjectDetails({ taskId, acce }));
  };

  const handleClick5 = (acces) => {
    dispatch(getUser(acces));
  };

  const UpdateProject = (projectId) => {
    navigate(`/updateproject/${projectId}`);
  };

  const handleTask = (projectId) => {
    navigate(`/task/${projectId}`);
  };

  const handleChange = (evt) => {
    const type = evt.target.value;
    setValue("userId", type);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/Login");
  };

  const handleRegister = () => {
    navigate("/Register");
  };

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    console.log(values);
    try {
      await dispatch(assignUserProject({ values, acces })).unwrap();
      dispatch(getProjectDetails());
      notification.success({
        message: "thêm user thành công",
      });
    } catch (error) {
      notification.error({
        message: "thêm user thất bại",
        description: error,
      });
    }
  };
  const removeUser = (projectId, userId) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    dispatch(removeUserz({ values: { projectId, userId }, acces }));
  };

  const handleClick6 = () => {};
  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={scss.logo} />
        <div className={scss.iho} onClick={() => handleClick1()}>
          <UserOutlined className={scss.icon} />
          <a style={{ color: "white" }}>Projet List</a>
        </div>
        <div className={scss.iho} onClick={() => handleClick2()}>
          <VideoCameraOutlined className={scss.icon} />
          <a style={{ color: "white" }}>Create Project</a>
        </div>
        <div className={scss.iho} onClick={handleClick3}>
          <UploadOutlined className={scss.icon} />
          <a style={{ color: "white" }}>User List</a>
        </div>
      </Sider>
      <Layout className="site-layout">
        <Header
          className="site-layout-background"
          style={{
            padding: 0,
            background: "#fff",
            fontSize: 20,
          }}
        >
          <h1 style={{ padding: "0 0 0 50px" }}>Project Management</h1>
          {user ? (
            <div className={scss.head}>
              <div className={scss.anpha}>
                <span>
                  <UserOutlined />
                </span>
                <strong>{user.name}</strong>
              </div>
              <div className={scss.beta}>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </div>
          ) : null}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100%",
          }}
        >
          <table className={scss.table}>
            <thead>
              <tr>
                <th>Id</th>
                <th>Project Name</th>
                <th>Calegory</th>
                <th>Creator</th>
                <th>Members</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {projects?.map((project) => {
                return (
                  <tr key={project.id}>
                    {setValue("projectId", project.id)}
                    <td>{project.id}</td>
                    <td
                      className={scss.colors}
                      onClick={() => handleTask(project.id)}
                    >
                      {project.projectName}
                    </td>
                    <td>{project.categoryName}</td>
                    <td>{project.creator.name}</td>
                    <td>
                      {project.members.map((member) => {
                        return (
                          <img key={member.userId} src={member.avatar}></img>
                        );
                      })}
                      <button
                        onClick={() => {
                          showModal();
                          handleClick4(project.id, user.accessToken);
                          handleClick5(user.accessToken);
                        }}
                      >
                        <PlusCircleOutlined />
                      </button>
                      <Modal
                        title="Members"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        <table className={scss.tables}>
                          <thead>
                            <tr>
                              <th style={{ padding: "5px 40px" }}>Id</th>
                              <th style={{ padding: "5px 40px" }}>Avatar</th>
                              <th style={{ padding: "5px 40px" }}>Name</th>
                              <th style={{ padding: "5px 40px" }}>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {tasks?.members?.map((member) => {
                              // console.log(member);
                              return (
                                <tr key={member.userId}>
                                  <td style={{ padding: "5px 40px" }}>
                                    {member.userId}
                                  </td>
                                  <td style={{ padding: "5px 40px" }}>
                                    <img src={member.avatar}></img>
                                  </td>
                                  <td style={{ padding: "5px 40px" }}>
                                    {member.name}
                                  </td>
                                  <td style={{ padding: "5px 40px" }}>
                                    <button
                                      onClick={() =>
                                        removeUser(project.id, member.userId)
                                      }
                                      className={scss.buttons}
                                    >
                                      <DeleteOutlined />
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                        <h4>Add User</h4>
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <select
                            className={scss.selects}
                            onChange={handleChange}
                          >
                            <option value="">chọn user</option>
                            {users.map((usera) => {
                              return (
                                <option key={usera.userId} value={usera.userId}>
                                  {usera.name}
                                </option>
                              );
                            })}
                          </select>
                          <button
                            className={scss.buttons}
                            onClick={() => {
                              handleClick6();
                            }}
                          >
                            <PlusCircleOutlined />
                          </button>
                        </form>
                      </Modal>
                    </td>
                    <td>
                      <button onClick={() => UpdateProject(project.id)}>
                        <EditOutlined />
                      </button>
                      <button
                        onClick={() =>
                          handleDelete(project.id, user.accessToken)
                        }
                      >
                        <DeleteOutlined />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListProject;

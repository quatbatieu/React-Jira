import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Layout, Menu, notification } from "antd";
import { Button, Modal, Space } from "antd";
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

const { Header, Sider, Content, Footer } = Layout;

const { confirm } = Modal;

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

  useEffect(() => {
    dispatch(getAllProject());
  }, []);

  const { handleSubmit, setValue } = useForm({
    defaultValues: {
      projectId: "",
      userId: "",
    },
  });

  const showConfirm = (projectId, acces) => {
    confirm({
      title: "Do you Want to delete project ?",
      icon: <ExclamationCircleOutlined />,
      onOk() {
        handleDelete(projectId, acces);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

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

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
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

  if (!user) {
    return <Navigate to="/login" />;
  }
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
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
              return (
                <tr key={member.userId}>
                  <td style={{ padding: "5px 40px" }}>{member.userId}</td>
                  <td style={{ padding: "5px 40px" }}>
                    <img src={member.avatar}></img>
                  </td>
                  <td style={{ padding: "5px 40px" }}>{member.name}</td>
                  <td style={{ padding: "5px 40px" }}>
                    <button
                      onClick={() => removeUser(tasks.id, member.userId)}
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
          <select className={scss.selects} onChange={handleChange}>
            <option value="">chọn user</option>
            {users.map((usera) => {
              return (
                <option key={usera.userId} value={usera.userId}>
                  {usera.name}
                </option>
              );
            })}
          </select>
          <button className={scss.buttons}>
            <PlusCircleOutlined />
          </button>
        </form>
      </Modal>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="logo" />
        <h1 className="text-white text-center">JIRA</h1>
        <Menu
          // className="mt-5"
          theme="dark"
          mode="inline"
        />
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
      <Layout>
        <Header style={{ background: "white", padding: "0px" }}>
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
          style={{
            margin: "24px 16px 0",
            background: "white",
          }}
        >
          <div>
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
                {projects
                  ?.map((project) => {
                    return (
                      <tr key={project.id}>
                        {setValue("projectId", project.id)}
                        <td>{project.id}</td>
                        <td
                          className={scss.colors}
                          onClick={() => handleTask(project.id)}
                          style={{ wordWrap: "break-word" }}
                        >
                          <span style={{ wordWrap: "break-word" }}>
                            {project.projectName}
                          </span>
                        </td>
                        <td>{project.categoryName}</td>
                        <td>{project.creator.name}</td>
                        <td>
                          {project.members.map((member) => {
                            return (
                              <img
                                key={member.userId}
                                src={member.avatar}
                              ></img>
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
                        </td>
                        <td>
                          <button onClick={() => UpdateProject(project.id)}>
                            <EditOutlined />
                          </button>
                          <button
                            onClick={() =>
                              showConfirm(project.id, user.accessToken)
                            }
                          >
                            <DeleteOutlined />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                  .reverse()}
              </tbody>
            </table>
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default ListProject;

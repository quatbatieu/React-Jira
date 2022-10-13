import {
  EditOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DeleteOutlined,
  PlusCircleOutlined,
  ProfileOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import { Modal } from "antd";
import React, { useState, useEffect } from "react";
import scss from "./style.module.scss";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getProjectDetails,
  getAllComment,
  insertComment,
  deleteComment,
  updateComment,
} from "modules/List/slices/taskSlices";
import { removeTaskz } from "modules/List/slices/taskSlices";
import { updateTasks } from "modules/List/slices/taskSlices";
import { render } from "@testing-library/react";
import { Alert } from "bootstrap";
const { Header, Sider, Content } = Layout;

const ListProject = () => {
  const [open, setOpen, collapsed, setCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem("user"));
  const acces = user.accessToken;
  const [rederbut, setRenderbut] = useState(false);
  const { taskId } = useParams();
  localStorage.setItem("projecidjira", JSON.stringify(taskId));
  const { data1: tasks, comment } = useSelector((state) => state.task);
  console.log(comment);
  // console.log(tasks);

  useEffect(() => {
    dispatch(getProjectDetails({ taskId, acces }));
  }, []);

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      id: "",
      taskId: "",
      contentComment: "",
    },
  });

  const showModalb = (a) => {
    dispatch(getAllComment(a));
    console.log(a);
    setValue("taskId", a);
    setOpen(true);
  };

  const handleOkb = () => {
    setModalText("The modal will be closed after two seconds");
    setConfirmLoading(true);
    setOpen(false);
    setConfirmLoading(false);
  };

  const handleCancelb = () => {
    setRenderbut(false);
    setOpen(false);
    setValue("contentComment", " ");
    setValue("id", "");
  };

  const UpdateTask = (taskId) => {
    navigate(`/task/updatetask/${taskId}`);
  };

  const handleDelete = (taskIds, acce, taskId) => {
    console.log(taskIds, acce, taskId);
    dispatch(removeTaskz({ taskIds, acce, taskId }));
  };

  const handleClick1 = (taskId) => {
    navigate(`/task/${taskId}/addtask`);
  };

  const handleDeleteComment = (commentId, acces, taskId) => {
    dispatch(deleteComment({ commentId, acces, taskId }));
  };

  const handle1 = () => {
    navigate("/")
  };

  const onSubmit = async (values) => {
    console.log(values);
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      if (values.id === "") {
        dispatch(insertComment({ values, acces }));
        setValue("contentComment", " ");
        notification.success({
          message: "thêm comment thành công",
        });
      } else {
        dispatch(updateComment({ values, acces }));
      }
    } catch (error) {
      notification.error({
        message: "thêm comment thất bại",
        description: error,
      });
    }
  };
  const handleGetdetail = (comment) => {
    setRenderbut(true);
    console.log(comment);
    setValue("contentComment", comment.contentComment);
    setValue("id", comment.id);
  };

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className={scss.logo} />
        <div className={scss.iho} onClick={() => handle1()}>
          <UserOutlined className={scss.icon}  />
          <a style={{ color: "white" }}>Project List</a>
        </div>
        <div className={scss.iho} onClick={() => handleClick1(taskId)}>
          <VideoCameraOutlined className={scss.icon} />
          <a style={{ color: "white" }}>Create Task</a>
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
          <h1 style={{ padding: "0 0 0 50px" }}>Task Management</h1>
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: "100%",
          }}
        >
          <div className="container">
            <div className="row">
              {tasks?.lstTask?.map((task) => {
                return (
                  <div key={task.statusId} className="col-sm-3 ">
                    <div className="bg-primary">
                      <p>{task.statusName}</p>

                      {task.lstTaskDeTail.map((lstTask) => {
                        {
                          /* console.log(lstTask); */
                        }
                        return (
                          <div className="row bg-white ms-0 me-0  mb-3">
                            <div
                              className="col-sm-7"
                              key={lstTask.taskId}
                              style={{ margin: "10px 0", color: "red" }}
                              // className= "bg-white col-sm-8 "
                            >
                              <div>
                                <span className=" text-dark me-1">
                                  TASK NAME:
                                </span>
                                <span>{lstTask.taskName}</span>
                              </div>
                              <div className="mt-3">
                                <span className=" text-dark  me-1">
                                  DESCRIPTION :{" "}
                                </span>
                                <span>{lstTask.description}</span>
                              </div>
                              <div className="row mt-3">
                                <div className="col-sm-6">
                                  {lstTask.priorityTask.priority}
                                </div>
                                <div className="col-sm-6 row">
                                  {lstTask.assigness.map((assignes) => {
                                    return (
                                      <div className="col-sm-4">
                                        <img
                                          className={scss.img}
                                          src={assignes.avatar}
                                          alt=""
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            </div>
                            <div className="col-sm-4 mt-1">
                              <button
                                style={{ width: "95px" }}
                                className="btn btn-success mb-3"
                                onClick={() => UpdateTask(lstTask.taskId)}
                              >
                                Update
                              </button>
                              <button
                                style={{ width: "95px" }}
                                className="btn btn-primary mb-3"
                                onClick={() => showModalb(lstTask.taskId)}
                              >
                                Comment
                              </button>
                              <button
                                style={{ width: "95px" }}
                                className="btn btn-danger"
                                onClick={() =>
                                  handleDelete(
                                    lstTask.taskId,
                                    user.accessToken,
                                    taskId
                                  )
                                }
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
            <Modal
              title="Comments"
              open={open}
              onOk={handleOkb}
              confirmLoading={confirmLoading}
              onCancel={handleCancelb}
            >
              <div className={scss.text1}>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <textarea
                    cols="70"
                    rows="5"
                    placeholder="Comment..."
                    {...register("contentComment")}
                  />
                  {rederbut ? (
                    <button>Update</button>
                  ) : (
                    <button>comment</button>
                  )}
                </form>
              </div>
              <div className={scss.text2}>
                <div className="row">
                  {comment.map((com) => {
                    {
                      /* console.log(com); */
                    }
                    return (
                      <div className="row">
                        <div className="col-sm-2">
                          <span>
                            <img src={com.user.avatar} alt="" />
                          </span>
                        </div>
                        <div className="col-sm-4 ps-0 pe-0">
                          <p className="mt-1">{com.contentComment}</p>
                        </div>

                        <div className="col-sm-6">
                          <button
                            onClick={() => {
                              handleGetdetail(com);
                            }}
                          >
                            <EditOutlined />
                          </button>
                          <button
                            onClick={() =>
                              handleDeleteComment(com.id, acces, com.taskId)
                            }
                          >
                            <DeleteOutlined />
                          </button>
                          {rederbut ? (
                            <button
                              onClick={() => {
                                setRenderbut(false);

                                setValue("contentComment", "");
                                setValue("id", "");
                              }}
                              style={{ backgroundColor: "red" }}
                            >
                              <ReloadOutlined />
                            </button>
                          ) : (
                            ""
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Modal>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ListProject;
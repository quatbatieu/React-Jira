import React, { useEffect, useState } from "react";
import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  getAll,
  getAllpri,
  getAlltas,
  getProjectDetails,
  createTask,
} from "modules/List/slices/taskSlices";
import { Select } from "antd";
const { Option } = Select;

const CreateTask = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("user"));
  const acce = user.accessToken;
  const { taskId } = useParams();

  const {
    data1: tasks,
    getall,
    getallpri,
    getalltas,
  } = useSelector((state) => state.task);

  useEffect(() => {
    dispatch(getProjectDetails({ taskId, acce }));
    dispatch(getAll());
    dispatch(getAllpri(taskId));
    dispatch(getAlltas());
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      listUserAsign: [],
      taskName: "",
      description: "",
      statusId: "",
      originalEstimate: "",
      timeTrackingSpent: "",
      timeTrackingRemaining: "",
      projectId: taskId,
      typeId: "",
      priorityId: "",
    },
    mode: "onTouched",
  });

  const handleChange1 = (evt) => {
    const type = evt.target.value;
    setValue("statusId", type);
  };

  const handleChange2 = (evt) => {
    const type = evt.target.value;
    setValue("priorityId", type);
  };

  const handleChange3 = (evt) => {
    const type = evt.target.value;
    setValue("typeId", type);
  };

  const handleChange4 = (evt) => {
    setValue("listUserAsign", evt);
  };

  const onSubmit = async (values) => {
    const user = JSON.parse(localStorage.getItem("user"));
    const acces = user.accessToken;
    try {
      await dispatch(createTask({ values, acces })).unwrap();
      navigate(`/task/${taskId}`);
      notification.success({
        message: "tạo task thành công",
      });
    } catch (error) {
      notification.error({
        message: "tạo task thất bại",
        description: error,
      });
    }
  };
  return (
    <div className={scss.title}>
      <div className={scss.center}>
        <h3>Create Task</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <h6>Project</h6>
            <input
              type="text"
              style={{ width: "100%", padding: "3px 10px" }}
              value={tasks?.projectName}
            />
          </div>
          <div>
            <h6>Task Name</h6>
            <input
              type="text"
              style={{ width: "100%", padding: "3px 10px" }}
              {...register("taskName", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            {errors.taskName && (
              <p style={{ color: "red" }}>{errors.taskName.message}</p>
            )}
          </div>
          <div>
            <h6>Status</h6>
            <select
              style={{ display: "block" }}
              onChange={handleChange1}
              {...register("statusId", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            >
              <option>chọn status</option>
              {getall?.map((get) => {
                return (
                  <option key={get.statusId} value={get.statusId}>
                    {get.statusName}
                  </option>
                );
              })}
            </select>
            {errors.statusId && (
              <p style={{ color: "red" }}>{errors.statusId.message}</p>
            )}
          </div>
          <div className={scss.col1}>
            <div>
              <h6>Priority</h6>
              <select
                onChange={handleChange2}
                {...register("priorityId", {
                  required: {
                    value: true,
                    message: "không được để trống",
                  },
                })}
              >
                <option>chọn priority</option>
                {getallpri?.map((getpri) => {
                  return (
                    <option key={getpri.priorityId} value={getpri.priorityId}>
                      {getpri.priority}
                    </option>
                  );
                })}
              </select>
              {errors.priorityId && (
                <p style={{ color: "red" }}>{errors.priorityId.message}</p>
              )}
            </div>
            <div>
              <h6>Task Type</h6>
              <select
                onChange={handleChange3}
                {...register("typeId", {
                  required: {
                    value: true,
                    message: "không được để trống",
                  },
                })}
              >
                <option>chọn typeId</option>
                {getalltas?.map((gettas) => {
                  return (
                    <option key={gettas.id} value={gettas.id}>
                      {gettas.taskType}
                    </option>
                  );
                })}
              </select>
              {errors.typeId && (
                <p style={{ color: "red" }}>{errors.typeId.message}</p>
              )}
            </div>
          </div>
          <div>
            <h6>Assignees</h6>
            <Select
              mode="tags"
              style={{
                width: "100%",
              }}
              placeholder="add user"
              onChange={handleChange4}
            >
              {tasks?.members?.map((task) => {
                return <Option key={task.userId}>{task.name}</Option>;
              })}
            </Select>
          </div>
          <div className={scss.col1}>
            <div>
              <h6>Original Estimete</h6>
              <input
                type="text"
                {...register("originalEstimate", {
                  required: {
                    value: true,
                    message: "không được để trống",
                  },
                })}
              />
              {errors.originalEstimate && (
                <p style={{ color: "red" }}>
                  {errors.originalEstimate.message}
                </p>
              )}
            </div>
            <div>
              <h6>Time Spent</h6>
              <input
                type="text"
                {...register("timeTrackingSpent", {
                  required: {
                    value: true,
                    message: "không được để trống",
                  },
                })}
              />
              {errors.timeTrackingSpent && (
                <p style={{ color: "red" }}>
                  {errors.timeTrackingSpent.message}
                </p>
              )}
            </div>
            <div>
              <h6>Time remaining</h6>
              <input
                type="text"
                {...register("timeTrackingRemaining", {
                  required: {
                    value: true,
                    message: "không được để trống",
                  },
                })}
              />
              {errors.timeTrackingRemaining && (
                <p style={{ color: "red" }}>
                  {errors.timeTrackingRemaining.message}
                </p>
              )}
            </div>
          </div>
          <div>
            <h6>Decription</h6>
            <textarea
              rows={5}
              cols={50}
              style={{ width: "100%", padding: "3px 10px" }}
              {...register("description", {
                required: {
                  value: true,
                  message: "không được để trống",
                },
              })}
            />
            {errors.description && (
              <p style={{ color: "red" }}>{errors.description.message}</p>
            )}
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;

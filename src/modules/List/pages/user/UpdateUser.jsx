import React, { useEffect } from "react";
// import scss from "./styles.module.scss";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { CreateUsers,updateUser } from "modules/List/slices/userSlices";
import scss from "../project/styles.module.scss";
import { useParams } from "react-router-dom";
const CreateUser = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //  const Params = useParams()
  //  console.log(Params)
  //  const {detaisUser} = useSelector((state) => state.user);
  //  console.log(detaisUser)
  //  useEffect(() => {
  //   console.log(Params)
  //   // dispatch(getAllUserdetail(Params))


  //  }, [])
   const userDetail = JSON.parse(localStorage.getItem("userdetail"))

 

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      id: userDetail.userId,
      email: "",
      // passWord:null,
      name: "",
      phoneNumber: "",
    },
    mode: "onTouched",
  });

  const abc =()=>{
    setValue("name",userDetail.name)
    
    setValue("email",userDetail.email)
    setValue("phoneNumber",userDetail.phoneNumber)
  }

  const onSubmit = async (values) => {
    console.log(values)
    const user = JSON.parse(localStorage.getItem("user"));
    const acce = user.accessToken;
    try {
      await dispatch(updateUser(values)).unwrap();
      navigate("/user");
      notification.success({
        message: "tạo project thành công",
      });
    } catch (error) {
      notification.error({
        message: "tạo project thất bại",
        description: error,
      });
    }
  };
 
  return (
    <div className={scss.center}>
      <h1 className={scss.h1}>Create Project</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={scss.form}>
        <div className={scss.field}>
          <input
            // hidden
            type="text"
            {...register("email", {
              required: {
                value: true,
                message: "không được để trống",
              },
            })}
          />
          <span></span>
          <label>email</label>
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        {/* <div className={scss.field}>
          <input
            // hidden
            type="text"
            {...register("passWord", {
              required: {
                value: true,
                message: "không được để trống",
              },
            })}
          />
          <span></span>
          <label>passWord</label>
          {errors.passWord && <p>{errors.passWord.message}</p>}
        </div> */}
        <div className={scss.field}>
          <input
            // hidden
            type="text"
            {...register("name", {
              required: {
                value: true,
                message: "không được để trống",
              },
            })}
          />
          <span></span>
          <label>name</label>
          {errors.name && <p>{errors.name.message}</p>}
        </div>
        <div className={scss.field}>
          <input
            // hidden
            type="text"
            {...register("phoneNumber", {
              required: {
                value: true,
                message: "không được để trống",
              },
            })}
          />
          <span></span>
          <label>phoneNumber</label>
          {errors.phoneNumber && <p>{errors.phoneNumber.message}</p>}
        </div>
        {abc()}
        <button>Create user</button>
      </form>
    </div>
  );
};

export default CreateUser;

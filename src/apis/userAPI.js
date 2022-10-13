import axiosClient from "./axiosClient";
const userAPI ={
    getAllUser:()=>{
        return axiosClient.get("Users/getUser")
    },
    deleteUserApi: (userId, acces) => {
        console.log(userId, acces)
        return axiosClient.delete("Users/deleteUser", {
          headers: {
            Authorization: `Bearer ${acces}`,
          },
          params: {
            id: userId,
          },
        });
      },
      createUserApi:(values)=>{
        return axiosClient.post("Users/signup", values);
      },
      getAllUserdetailz:(userId)=>{
        console.log(userId)
        return axiosClient.get(`Users/getUser?userId=${userId}`)
    },
    updateUserApi:(values)=>{
      console.log(values)
      return axiosClient.put("Users/editUser", {
        ...values,
        
      });
    }
}
export default userAPI
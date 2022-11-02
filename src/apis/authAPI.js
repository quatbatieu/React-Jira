import axiosClientz from "./axiosClientz";

const AuthAPI = {
  registers: (values) => {
    return axiosClientz.post("Users/signup", {
      ...values,
    });
  },
  login: (values) =>{
    return axiosClientz.post("Users/signin", values)
  }
};

export default AuthAPI;

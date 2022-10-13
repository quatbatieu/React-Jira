import axios from "axios";
import store from "../store";

// Setup các cấu hình mặc định cho axios
const axiosClient = axios.create({
  baseURL: "http://jiranew.cybersoft.edu.vn/api/",
  headers: {
    TokenCybersoft:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5Mb3AiOiJCb290Y2FtcCAyNyIsIkhldEhhblN0cmluZyI6IjIxLzAxLzIwMjMiLCJIZXRIYW5UaW1lIjoiMTY3NDI1OTIwMDAwMCIsIm5iZiI6MTY0NjE1NDAwMCwiZXhwIjoxNjc0NDA2ODAwfQ.5JfRY7XxLBvxphVDGE6br_uBYC9AbkqaSEmNTGvzWtQ",
  },
});

// interceptors
axiosClient.interceptors.request.use((config) => {
  // config: nội dung request gửi lên server
  // ta sẽ thay đổi headers trong request trước khi nó được gửi lên server
  const { accessToken } = store.getState().auth.user || {};

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  // thành công
  (response) => {
    // Ta có thể thay đổi response trước khi response được trả ra cho nơi gọi request.
    // response.data: format của axios
    // .content: format của cybersoft
    return response.data.content;
  },
  // thất bại
  (error) => {
    // Ta có thể thay đổi error trước khi error được trả ra cho nơi gọi request.
    return Promise.reject(error.response?.data.content);
  }
);

export default axiosClient;

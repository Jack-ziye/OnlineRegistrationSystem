import axios from "axios";
import { message, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { getToken, removeToken, getRefreshToken, setToken } from "./token";

let isRefreshing = false; // 标记是否正在刷新 token
let requests = []; // 存储待重发请求的数组
let tokenExpireModal = null;

const http = axios.create({
  baseURL: process.env.REACT_APP_APIURL,
  timeout: 20000,
});

// 刷新 access_token 的接口
const refreshToken = () => {
  return http.get("/talent/token/refresh", { headers: { "Refresh-Token": getRefreshToken() } });
};

http.interceptors.request.use(
  (config) => {
    config.headers.Token = getToken() || "";
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

const httpCode = {
  401: "请求访问未授权",
  404: "请求地址不存在，请联系管理员",
  500: "服务器错误，请联系管理员",
  default: "服务器连接失败",
};

http.interceptors.response.use(
  (res) => {
    if (res.data.code === 1000 && res.data.message !== "success") {
      message.success(res.data.message);
      return res.data.data || res.data;
    } else if (res.data.code === 3000) {
      if (tokenExpireModal === null) {
        tokenExpireModal = Modal.confirm({
          title: "提示",
          icon: <ExclamationCircleOutlined />,
          content: res.data.message,
          onOk() {
            removeToken();
            tokenExpireModal = null;
            window.location.href = "/login";
          },
          onCancel() {
            removeToken();
          },
        });
      }
      return Promise.reject(res.data);
    } else if (res.data.code === 3001 && !res.config.url.includes("/talent/token/refresh")) {
      const { config } = res;
      if (!isRefreshing) {
        isRefreshing = true;
        return refreshToken()
          .then((response) => {
            const { access_token, refresh_token } = response;
            setToken(access_token, refresh_token);
            // 重发
            config.headers.Authorization = access_token;
            requests.forEach((request) => request());
            requests = [];
            return http(config);
          })
          .catch((error) => {
            return Promise.reject(error);
          })
          .finally(() => {
            isRefreshing = false;
          });
      } else {
        return new Promise((resolve) => {
          requests.push(() => resolve(http(config)));
        });
      }
    } else if (res.data.message && res.data.message !== "success") {
      message.error(res.data.message);
      return Promise.reject(res.data);
    }
    return res.data.data || res.data;
  },
  (error) => {
    if (error.response === undefined) {
      return Promise.reject();
    } else if (error.code === "ECONNABORTED") {
      message.error("请求超时，请检查网络");
    } else {
      message.error(httpCode[error.response?.status || "default"]);
    }

    return Promise.reject(error);
  }
);

export default http;

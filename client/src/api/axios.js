import axios from "axios";
// import router from "../router";
import { Snackbar } from "@varlet/ui";
import { useRouter } from "vue-router";
const router = useRouter();
const localStorage = window.localStorage;

// 提示
const Tip = (msg) => {
  Snackbar({
    content: msg,
    duration: 1000,
  });
};
// 校验token 不满足让他重新登陆
const toLogin = () => {
  router.push({
    name: "login",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};
// 注册
const regIster = () => {
  router.replace({
    path: "/regIster",
    query: {
      redirect: router.currentRoute.fullPath,
    },
  });
};
// 如果请求失败 则触发errorHandle
const errorHandle = async (status, other) => {
  switch (status) {
    case 401:
      Tip("token不存在，请登录");
      // localStorage.removeItem('token')
      setTimeout(async () => {
        // await toLogin()
      }, 1000);
      break;
    case 402:
      Tip("登陆过期，请重新登陆");
      localStorage.removeItem("token");
      setTimeout(async () => {
        await toLogin();
      }, 1000);
      break;
    case 404:
      Tip("请求资源不存在");
      break;
    default:
      console.log(other);
  }
};
let instance = axios.create({
  timeout: 1000 * 12,
});
instance.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";
// if(localStorage.getItem('token')) {
//   instance.defaults.headers.common['token'] = localStorage.getItem('token')
// }

// 请求拦截 带token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  },
  (error) => Promise.error(error)
);

instance.interceptors.response.use(
  (res) => {
    if (res.data && res.data.token) {
      localStorage.setItem("token", res.data.token);
    }
    if (res.status.toString().substr(0, 2) != "20") {
      errorHandle(res.status, res.data.message);
    }
    return Promise.resolve(res);
  },
  (error) => {
    const { response } = error;
    if (response) {
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      // 没返回，可能没网
      if (!window.navigator.onLine) {
        return new Error("喵的没网");
      } else {
        return Promise.reject(response);
      }
    }
  }
);

export default instance;

import axios from "axios";
import { logout } from "redux/modules/authSlice";

let store;
import("redux/config/configStore").then((module) => (store = module.default()));

// axios를 인스턴스로(객체) 가공하여 만든다
// baseURL에 .env 파일에 설정한 서버 주소를 담아준다
// timeout은 요청 후 응답 시간이 5초를 넘으면 오류 메세지가 출력된다
export const authApi = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  headers: {
    "Content-Type": "application/json",
  },
});

export const JsonApi = axios.create({
  baseURL: "http://localhost:5000",
  "Content-Type": "application/json",
});

// 헤더에 토큰 넣기
authApi.interceptors.request.use(
  async function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
  },
  function (error) {
    console.log("토큰이 존재하지 않습니다.");
    if (
      error.response.data.message ===
      "토큰이 만료되었습니다. 다시 로그인 해주세요."
    ) {
      // dispatch는 함수컴포넌트 안에서만 사용 가능하기때문에 store를 불러와서 사용한다
      return store.dispatch(logout());
    }
    return Promise.reject(error);
  }
);

authApi.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    console.log("로그아웃 토큰 만료 실패");
    return Promise.reject(error);
  }
);

// interceptors를 이용해 토큰확인(미들웨어)
// 요청;
authApi.interceptors.request.use(
  async function (config) {
    const { data } = await authApi.get("/user");
    if (data.success) {
      console.log("config", config);
      return config;
    }
  },
  function (error) {
    console.log("토큰 인증이 실패했습니다.");
    return Promise.reject(error);
  }
);

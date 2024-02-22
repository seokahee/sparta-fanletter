import axios from "axios";

// axios를 인스턴스로(객체) 가공하여 만든다
// baseURL에 .env 파일에 설정한 서버 주소를 담아준다
// timeout은 요청 후 응답 시간이 5초를 넘으면 오류 메세지가 출력된다
const instance = axios.create({
  baseURL: "https://moneyfulpublicpolicy.co.kr",
  timeout: 1000,
});

// interceptors를 이용해 요청-응답 상태 확인

// 요청
instance.interceptors.request.use(
  function (config) {
    console.log("인터셉터 요청 성공");
    return config;
  },
  function (error) {
    console.log("인터셉터 요청 실패");
    return Promise.reject(error);
  }
);

// 응답
instance.interceptors.response.use(
  function (config) {
    console.log("인터셉터 응답 성공");
    return config;
  },
  function (error) {
    console.log("인터셉터 응답 실패");
    return Promise.reject(error);
  }
);

export default instance;

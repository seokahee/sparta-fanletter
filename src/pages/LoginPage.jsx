import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import api from "../axios/api";
import { login } from "redux/modules/authSlice";
import { toast } from "react-toastify";

function LoginPage() {
  // input states
  const [userId, setUserId] = useState({
    id: "",
  });
  const [userPwd, setUserPwd] = useState({
    password: "",
  });
  const [userNickName, setUserNickName] = useState({
    nickname: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 포커스를 위한 useRef
  const userIdRef = useRef(null);
  const userPwdRef = useRef(null);
  const userNickNameRef = useRef(null);

  // handler 함수
  const userIdHandler = (e) => setUserId(e.target.value);
  const userPwdHandler = (e) => setUserPwd(e.target.value);
  const userNickNameHandler = (e) => setUserNickName(e.target.value);

  // false일땐 로그인, true일때 회원가입폼으로 변환되기 위한 Boolean을 가진 state
  const [isRegister, setIsRegister] = useState(false);

  // isRegister상태에 따라 로그인, 회원가입 폼으로 변환할 수 있는 p태그
  const isModeChange = () => {
    if (isRegister) {
      setIsRegister(false);
    } else {
      console.log("isRegister", isRegister);
      setIsRegister(true);
    }
  };

  // 서버에 저장된 데이터 가져오기
  // const fetchUsers = async () => {
  //   const { data } = await api.get("/user", {
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${process.env.ACCESS_TOKEN}`,
  //     },
  //   });
  //   console.log("data", data);
  // };
  // useEffect(() => {
  //   fetchUsers();
  // }, []);

  // 회원 가입
  const fetchRegister = async (e) => {
    e.preventDefault();
    // 유효성 검사
    if (userId.length < 4 || userId.length > 10) {
      alert("아이디는 4~10글자로 입력 바랍니다");
      return userIdRef.current.focus();
    } else if (userPwd.length < 4 || userPwd.length > 15) {
      alert("비밀번호는 4~15글자로 입력 바랍니다");
      return userPwdRef.current.focus();
    } else if (userNickName.length < 1 || userNickName.length > 10) {
      alert("닉네임은 1~10글자로 입력 바랍니다");
      return userNickNameRef.current.focus();
    }
    toast.success("회원가입 성공!!");

    // 회원 가입이 완료되면 로그인 화면으로 바꾸로 state 비워주기
    setIsRegister(false);
    setUserId("");
    setUserPwd("");
    setUserNickName("");
  };

  // 로그인
  const fetchLogin = async (e) => {
    e.preventDefault();

    if (userId.length < 4 || userId.length > 10) {
      alert("아이디는 4~10글자로 입력 바랍니다");
      return userIdRef.current.focus();
    } else if (userPwd.length < 4 || userPwd.length > 15) {
      alert("비밀번호는 4~15글자로 입력 바랍니다");
      return userPwdRef.current.focus();
    }

    // 디스패치로 로그인 함수 호출
    dispatch(login());

    // 로그인 완료 시 홈으로 이동
    navigate("/");
  };

  return (
    <LoginContainer>
      <h1>{isRegister ? "회원가입" : "로그인"}</h1>
      <LoginForm onSubmit={isRegister ? fetchRegister : fetchLogin}>
        <input
          value={userId.id}
          onChange={userIdHandler}
          ref={userIdRef}
          type="text"
          placeholder="아이디 (4~10글자)"
        />
        <input
          value={userPwd.password}
          onChange={userPwdHandler}
          ref={userPwdRef}
          type="password"
          placeholder="비밀번호 (4~15글자)"
        />
        {isRegister && (
          <input
            value={userNickName.nickname}
            onChange={userNickNameHandler}
            ref={userNickNameRef}
            type="password"
            placeholder="닉네임 (1~10글자)"
          />
        )}
        <button type="submit">{isRegister ? "회원가입" : "로그인"}</button>
        <p onClick={isModeChange}>{isRegister ? "로그인" : "회원가입"}</p>
      </LoginForm>
    </LoginContainer>
  );
}

export default LoginPage;

const LoginContainer = styled.div`
  width: 30%;
  height: 70vh;
  margin: 5% auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid black;
  border-radius: 10px;

  h1 {
    font-size: 30px;
    font-weight: 700;
  }
  p {
    text-align: center;
    cursor: pointer;
  }
`;

const LoginForm = styled.form`
  height: 35vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  input {
    padding: 20px;
    border: none;
    border-bottom: 1px solid #eee;
    font-size: 15px;
  }
  button {
    width: 30%;
    margin: 0 auto;
    padding: 10px;
    border: none;
    border-radius: 5px;
    background-color: #eee;
    font-size: 16px;
    &:hover {
      cursor: pointer;
      background-color: black;
      color: white;
    }
  }
`;

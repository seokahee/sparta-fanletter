import useInput from "hooks/useInput";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// 계정이 이미 있으면 로그인 시 로그인이 됨, 없으면 회원가입창으로 보내면 됨 기준은 Id
// 회원가입 시 계정이 있으면 있는 계정이라고 로그인으로 보내면 됨 폼을 같이 쓸 수 있음

function LoginPage() {
  // 인풋과 체인지함수에 커스텀 훅 사용
  const [userId, userIdHandler] = useInput();
  const [userPwd, userPwdHandler] = useInput();
  const [userName, userNameHandler] = useInput();

  const navigate = useNavigate();

  const userIdRef = useRef(null);
  const userPwdRef = useRef(null);
  const userNameRef = useRef(null);

  // isOn 이 false일땐 로그인, true일때 회원가입폼으로 변환되기 위한 Boolean을 가진 state
  const [isOn, setIsOn] = useState(false);

  // isOn상태에 따라 로그인, 회원가입 폼으로 변환할 수 있는 p태그
  const isOnChange = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      console.log("isOn", isOn);
      setIsOn(true);
    }
  };

  // 로그인, 회원가입 폼
  const authAndAccountHandler = (e) => {
    e.preventDefault();

    // 로그인 상태
    if (!isOn) {
      if (userId.length < 4 || userId.length > 10) {
        alert("아이디는 4~10글자로 입력 바랍니다");
        return userIdRef.current.focus();
      } else if (userPwd.length < 4 || userPwd.length > 15) {
        alert("비밀번호는 4~15글자로 입력 바랍니다");
        return userPwdRef.current.focus();
      }
    }

    // 회원가입 상태
    if (isOn) {
      if (userId.length < 4 || userId.length > 10) {
        alert("아이디는 4~10글자로 입력 바랍니다");
        return userIdRef.current.focus();
      } else if (userPwd.length < 4 || userPwd.length > 15) {
        alert("비밀번호는 4~15글자로 입력 바랍니다");
        return userPwdRef.current.focus();
      } else if (userName.length < 1 || userName.length > 10) {
        alert("닉네임은 1~10글자로 입력 바랍니다");
        return userNameRef.current.focus();
      }
    }
    // id랑 pw가 모두 있으면 홈으로 이동(로그인)
    if (userId && userPwd) {
      return navigate("/");
    }
  };

  return (
    <LoginContainer>
      <h1>{isOn ? "회원가입" : "로그인"}</h1>
      <LoginForm onSubmit={authAndAccountHandler}>
        <input
          value={userId}
          onChange={userIdHandler}
          ref={userIdRef}
          type="text"
          placeholder="아이디 (4~10글자)"
        />
        <input
          value={userPwd}
          onChange={userPwdHandler}
          ref={userPwdRef}
          type="password"
          placeholder="비밀번호 (4~15글자)"
        />
        {isOn && (
          <input
            value={userName}
            onChange={userNameHandler}
            ref={userNameRef}
            type="password"
            placeholder="닉네임 (1~10글자)"
          />
        )}
        <button type="submit">{isOn ? "회원가입" : "로그인"}</button>
        <p onClick={isOnChange}>{isOn ? "로그인" : "회원가입"}</p>
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

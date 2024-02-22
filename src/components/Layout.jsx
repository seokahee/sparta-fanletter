import React from "react";
import { useDispatch } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import { logout } from "redux/modules/authSlice";
import styled from "styled-components";

function Layout() {
  const dispatch = useDispatch();
  return (
    <div>
      <NavContainer>
        <Link to="/">Home</Link>
        <UserNavigation>
          <Link to="myPage">마이페이지</Link>
          <Link
            onClick={() => {
              dispatch(logout());
            }}
          >
            로그아웃
          </Link>
        </UserNavigation>
      </NavContainer>
      {/* 라우터 컴포넌트에서 Routes안에  <Route element={<Layout />}>로 넣어주면 Outlet에 다른 컴포넌트들이 연결되어 Layout컴포넌트가 다른 컴포넌트로 이동해도 배치된곳에 고정해 둘 수 있다*/}
      <Outlet />
    </div>
  );
}

export default Layout;
const NavContainer = styled.div`
  height: 5vh;
  background-color: gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 2%;
  font-weight: 600;

  user-select: none; // 사용자가 드래그하지 못하게 막음
  a {
    // Link는 a태그와 같기때문에 text-decoration: none;을 쓰려면 a태그로 지정해서 사용해야함
    text-decoration: none;
    color: black;
    &:hover {
      color: #eee;
    }
  }
`;
const UserNavigation = styled.div`
  width: 12%;
  display: flex;
  justify-content: space-between;
`;

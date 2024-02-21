import Detail from "pages/Detail";
import Home from "pages/Home";
import LoginPage from "pages/LoginPage";
import MyPage from "pages/MyPage";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
  // authSlice에서 만든 isLogin 상태에 따라 라우터 경로 설정
  const isLogin = useSelector((state) => state.auth.isLogin);
  return (
    <BrowserRouter>
      {isLogin ? (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/loginPage" element={<LoginPage />} />
          <Route path="*" element={<Navigate replace to="/loginPage" />} />
        </Routes>
      )}
    </BrowserRouter>
  );
}

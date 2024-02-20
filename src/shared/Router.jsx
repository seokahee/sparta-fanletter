import Detail from "pages/Detail";
import Home from "pages/Home";
import LoginPage from "pages/LoginPage";
import MyPage from "pages/MyPage";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginPage" element={<LoginPage />} />
        <Route path="/myPage" element={<MyPage />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

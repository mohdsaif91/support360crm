import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./Component/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import LoadingGif from "./Images/loading.gif";

import AdminHome from "./AdminPage/AdminHome";
import AdminHeader from "./Component/AdminSideBar";
import AdminEmployeeHome from "./AdminPage/AdminEmployee/AdminEmployeeHome";
import { setUserData } from "./Redux/Slices/LoginSlice";
import AdminData from "./AdminPage/AdminData";
import UnAuthorized from "./util/UnAuthorized";
import EmployeeProfile from "./Pages/EmployeeProfile";

function App() {
  const loadingState = useSelector((state) => state.loading);
  const userState = useSelector((state) => state.login);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let userData = null;
    if (!sessionStorage.getItem("userData")) {
      navigate("/login");
    } else if (userState.tokenExpire) {
      navigate("/unAutorized");
    } else {
      userData = JSON.parse(sessionStorage.getItem("userData"));
    }
    if (userData && !userState?.user) {
      dispatch(setUserData(userData));
    }
    if (userData?.user?.role == "admin") {
      navigate("/adminHome");
    } else if (userData?.user?.role == "customer") {
      navigate("/");
    }
  }, [userState]);

  const routesHtml = useMemo(() => {
    console.log("useMEMO <");
    return (
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/unAutorized" element={<UnAuthorized />} />
        <Route path="/profile" element={<EmployeeProfile />} />

        {/* AdminRoute */}
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminEmployee" element={<AdminEmployeeHome />} />
        <Route path="/adminData" element={<AdminData />} />
      </Routes>
    );
  }, []);

  return (
    <div className="App">
      {loadingState.loadingState ? (
        <div className="loading-container">
          <img src={LoadingGif} alt="Loading..." className="show-loading" />
        </div>
      ) : (
        <>
          {location.pathname !== "/login" && <Header />}
          {location.pathname.includes("admin") && <AdminHeader />}
          {routesHtml}
          {/* <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unAutorized" element={<UnAuthorized />} />
            <Route path="/profile" element={<EmployeeProfile />} />

            {/* AdminRoute */}
          {/* <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/adminEmployee" element={<AdminEmployeeHome />} />
            <Route path="/adminData" element={<AdminData />} />
          </Routes> */}
        </>
      )}
    </div>
  );
}

export default App;

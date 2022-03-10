import { useEffect, useLayoutEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./Component/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import LoadingGif from "./Images/loading.gif";

import AdminHome from "./AdminPage/AdminHome";
import AdminHeader from "./Component/AdminSideBar";
import AdminEmployee from "./AdminPage/AdminEmployee";
import { setUserData } from "./Redux/Slices/LoginSlice";
import AdminData from "./AdminPage/AdminData";
import UnAuthorized from "./util/UnAuthorized";

function App() {
  const [hide, setHide] = useState(true);

  const loadingState = useSelector((state) => state.loading);
  const userState = useSelector((state) => state.login);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    let userData = null;
    if (!sessionStorage.getItem("userData")) {
      navigate("/login");
    } else {
      userData = JSON.parse(sessionStorage.getItem("userData"));
    }
    userState.tokenExpire && navigate("/unAutorized");
    if (userData && !userState?.user) {
      dispatch(setUserData(userData));
    }
    if (userData?.user?.role == "admin") {
      navigate("/adminHome");
    } else if (userData?.user?.role == "customer") {
      navigate("/");
    }
  }, [userState]);

  useLayoutEffect(() => {
    setHide(location.pathname !== "/login");
  }, [location.pathname]);

  return (
    <div className="App">
      {loadingState.loadingState ? (
        <div className="loading-container">
          <img src={LoadingGif} alt="Loading..." className="show-loading" />
        </div>
      ) : (
        <>
          {hide && <Header />}
          {location.pathname.includes("admin") && <AdminHeader />}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/unAutorized" element={<UnAuthorized />} />

            {/* AdminRoute */}
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/adminEmployee" element={<AdminEmployee />} />
            <Route path="/adminData" element={<AdminData />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

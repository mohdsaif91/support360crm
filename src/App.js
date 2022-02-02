import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Header from "./Component/Header";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import LoadingGif from "./Images/loading.gif";

import AdminHome from "./AdminPage/AdminHome";
import AdminHeader from "./Component/AdminSideBar";
import AdminEmployee from "./AdminPage/AdminEmployee";

function App() {
  const [hide, setHide] = useState(true);

  const loadingState = useSelector((state) => state.loading);
  const location = useLocation();
  const navigate = useNavigate();

  useLayoutEffect(() => {
    setHide(location.pathname !== "/login");
  }, [location.pathname]);

  return (
    <div className={`App `}>
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

            {/* AdminRoute */}
            <Route path="/adminHome" element={<AdminHome />} />
            <Route path="/adminEmployee" element={<AdminEmployee />} />
          </Routes>
        </>
      )}
    </div>
  );
}

export default App;

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FilterComponent from "./FilterComponent";

export default function Home() {
  const userData = useSelector((state) => state.login);
  const navigate = useNavigate();
  useEffect(() => {
    // !userData.user && navigate("/login");
  }, []);
  return (
    <div>
      <FilterComponent />
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import ModalPopUp from "../Component/ModalPopUp";
import { getCountFunc, getAddedCustomer } from "../Redux/Slices/EmployeeSlice";

export default function FilterComponent() {
  const [show, setShow] = useState(false);

  const loginState = useSelector((state) => state.login);
  const customerState = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loginState?.user?.userName) {
      dispatch(getAddedCustomer(loginState?.user?.userName));
    }
  }, [loginState?.user]);

  return (
    <div className="filter">
      <div className="filterComponent">
        <div className="filter-continer">
          <div className="employee-name">
            Emplyee Logged-In: <b>{loginState?.user?.userName}</b>
          </div>
        </div>
        <div className="actio-container">
          <button className="add-btn btn" onClick={() => setShow(!show)}>
            Add Data
          </button>
        </div>
      </div>
      <div className="cardscontainer">
        <div className="card total-container">
          <div className="card-heading">Total Entries</div>
          <div className="card-count total">
            {customerState?.employeeAddedcust?.data?.total}
          </div>
        </div>
        <div className="card day-container">
          <div className="card-heading">Daily Entries</div>
          <div className="card-count">
            {customerState?.employeeAddedcust?.data?.daily === 0
              ? "- -"
              : customerState?.employeeAddedcust?.data?.daily}
          </div>
          <button
            className="btn btn-daily"
            onClick={() =>
              dispatch(
                getCountFunc({ type: "daily", user: loginState.user.userName })
              )
            }
          >
            Daily data
          </button>
        </div>
        <div className="card month-container">
          <div className="card-heading">Monthly Entries</div>
          <div className="card-count">
            {customerState?.employeeAddedcust?.data?.monthly === 0
              ? "- -"
              : customerState?.employeeAddedcust?.data?.monthly}
          </div>
          <button
            className="btn btn-monthly"
            onClick={() =>
              dispatch(
                getCountFunc({
                  type: "monthly",
                  user: loginState.user.userName,
                })
              )
            }
          >
            Monthly data
          </button>
        </div>
        <div className="card year-container">
          <div className="card-heading">Yearly Entries</div>
          <div className="card-count">
            {customerState?.employeeAddedcust?.data?.yearly === 0
              ? "- -"
              : customerState?.employeeAddedcust?.data?.yearly}
          </div>
          <button
            className="btn btn-yearly"
            onClick={() =>
              dispatch(
                getCountFunc({
                  type: "yearly",
                  user: loginState.user.userName,
                })
              )
            }
          >
            Yearly data
          </button>
        </div>
      </div>
      {show && <ModalPopUp closePopup={() => setShow(false)} />}
    </div>
  );
}

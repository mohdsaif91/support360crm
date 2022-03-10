import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEmployees } from "../Redux/Slices/EmployeeSlice";

export default function AdminHome() {
  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!employee.allEmployee) {
      dispatch(getEmployees());
    }
  }, [employee]);

  return (
    <div className="admin-page-margin">
      <div className="cardscontainer pt-32">
        <div className="card total-container">
          <div className="card-heading">Total Employes</div>
          <div className="card-count total">
            {employee?.allEmployee?.length}
          </div>
        </div>
        <div className="card day-container">
          <div className="card-heading">Absent Employee</div>
          <div className="card-count">
            {/* {customerState?.employeeAddedcust?.daily === 0
              ? "- -"
              : customerState?.employeeAddedcust?.daily} */}
          </div>
        </div>
        <div className="card day-container">
          <div className="card-heading">present Employee</div>
          <div className="card-count">
            {/* {customerState?.employeeAddedcust?.daily === 0
              ? "- -"
              : customerState?.employeeAddedcust?.daily} */}
          </div>
        </div>
      </div>
    </div>
  );
}

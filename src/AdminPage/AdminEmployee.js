import React, { useState } from "react";
import { useDispatch } from "react-redux";

import AddIcon from "../Images/adminImage/plus.png";
import ClearIcon from "../Images/close.png";
import { addEmployeeFun } from "../Redux/Slices/EmployeeSlice";

const initialAddEmployee = {
  userName: "",
  password: "",
  confirmPassword: "",
  role: "employee",
};

const initialAddEmployeeError = {
  userName: false,
  password: false,
  confirmPassword: false,
  role: "employee",
  main: false,
};

export default function AdminEmployee() {
  const [employee, setEmployee] = useState({ ...initialAddEmployee });
  const [error, setError] = useState({ ...initialAddEmployeeError });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    setEmployee({ ...employee, [e.target.name]: e.target.value });
  };

  const clearForm = () => {
    setEmployee({ ...initialAddEmployee });
    setError({ ...initialAddEmployeeError });
  };

  const addEmployee = () => {
    const { confirmPassword, ...restProps } = employee;
    if (
      employee.userName === "" ||
      employee.password === "" ||
      employee.confirmPassword === ""
    ) {
      setError({ ...error, main: true });
    } else {
      dispatch(addEmployeeFun(restProps));
    }
  };

  return (
    <div className="admin-page-margin">
      <div className="add-employee-form">
        <div className="form">
          <div className="input-element">
            <div className="input-label">User name</div>
            <input
              className="form-input"
              onBlur={() =>
                setError({ ...error, userName: employee.userName === "" })
              }
              type="text"
              name="userName"
              value={employee.userName}
              onChange={(e) => handleChange(e)}
            />
            {error.userName && (
              <div className="error-text">UserName is required</div>
            )}
          </div>
          <div className="input-element">
            <div className="input-label">Password</div>
            <input
              className="form-input"
              onBlur={() =>
                setError({ ...error, password: employee.userName === "" })
              }
              type="password"
              name="password"
              value={employee.password}
              onChange={(e) => handleChange(e)}
            />
            {error.userName && (
              <div className="error-text">Password is required</div>
            )}
          </div>
          <div className="input-element">
            <div className="input-label">Confirm Password</div>
            <input
              className="form-input"
              onBlur={() =>
                setError({
                  ...error,
                  confirmPassword: employee.userName === "",
                })
              }
              type="password"
              name="confirmPassword"
              value={employee.confirmPassword}
              onChange={(e) => handleChange(e)}
            />
            {error.userName && (
              <div className="error-text">UserName is required</div>
            )}
            {employee.confirmPassword !== employee.password && (
              <div className="error-text">Password did not match</div>
            )}
          </div>
          {error.main && (
            <div className="error-text">Required Feilds are empty</div>
          )}
          <div className="btn-container">
            <button className="btn clear-btn" onClick={() => clearForm()}>
              <img className="add-btn-icon" src={ClearIcon} /> Clear
            </button>
            <button className="btn add-btn" onClick={() => addEmployee()}>
              <img className="add-btn-icon" src={AddIcon} />
              Add Emplyee
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

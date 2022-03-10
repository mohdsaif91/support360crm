import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddIcon from "../Images/adminImage/plus.png";
import ClearIcon from "../Images/close.png";
import { addEmployeeFun, getEmployees } from "../Redux/Slices/EmployeeSlice";

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

  const employeeData = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!employeeData.allEmployee) {
      dispatch(getEmployees());
    }
  }, [employeeData]);

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
    setEmployee({ ...initialAddEmployee });
  };

  console.log(employeeData.allEmployee);

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
        <div className="employee-list">
          <div className="w3-container">
            <ul className="w3-ul w3-card-4">
              {employeeData.allEmployee.map((m) => (
                <li className="employee-li">
                  <img
                    src="https://www.w3schools.com/w3css/img_avatar2.png"
                    className="emp-image"
                  />
                  <div className="emp-name">{m.userName}</div>
                  <div
                    onclick="this.parentElement.style.display='none'"
                    className="emp-delete-icon"
                  >
                    <img className="add-btn-icon" src={ClearIcon} />
                  </div>
                </li>
              ))}

              {/* <li className="employee-li">
                <span
                  onclick="this.parentElement.style.display='none'"
                  className="w3-bar-item w3-button w3-white w3-xlarge w3-right"
                >
                  ×
                </span>
                <img
                  src="https://www.w3schools.com/w3css/img_avatar5.png"
                  className="bg w3-bar-item w3-circle w3-hide-small"
                />
                <div className="w3-bar-item">
                  <span className="w3-large">Jill</span>
                  <br />
                  <span>Support</span>
                </div>
              </li>

              <li className="employee-li">
                <img
                  src="https://www.w3schools.com/w3css/img_avatar6.png"
                  className="bg w3-bar-item w3-circle w3-hide-small"
                />
                <div className="w3-bar-item">
                  <span className="w3-large">Jane</span>
                  <br />
                  <span>Accountant</span>
                </div>
                <span
                  onclick="this.parentElement.style.display='none'"
                  className="w3-bar-item w3-button w3-white w3-xlarge w3-right"
                >
                  ×
                </span>
              </li> */}
            </ul>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import AddEmployee from "./AddEmployee";
import EmployeeDirectory from "./EmployeeDirectory";
import { getEmployees } from "../../Redux/Slices/EmployeeSlice";
import { setTabIndexAction } from "../../Redux/Slices/utilSlice";

function AdminEmployeeHome() {
  const [tabIndex, setTabIndex] = useState(0);

  const employeeData = useSelector((state) => state.employee);
  const tabIndexValue = useSelector((state) => state.UtilReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    setTabIndex(tabIndexValue.tabIndexValue);
  }, [tabIndexValue]);

  useEffect(() => {
    if (!employeeData.allEmployee) {
      dispatch(getEmployees());
    }
  }, [employeeData]);

  const options = employeeData.allEmployee
    ? employeeData.allEmployee.map((m) => {
        return { label: m.userName, value: m.userName };
      })
    : [];

  return (
    <div className="admin-page-margin">
      <div className="admin-employee-tabs">
        <div className="admin-employee-tab-list">
          <button
            className={`tab-btn ${tabIndex == 0 && "tab-active"}`}
            onClick={() => dispatch(setTabIndexAction(0))}
          >
            Employee Directory
          </button>
          <button
            className={`tab-btn ${tabIndex == 1 && "tab-active"}`}
            onClick={() => dispatch(setTabIndexAction(1))}
          >
            Add Employee
          </button>
        </div>
        <div className="tab-panel">
          {tabIndex == 0 ? (
            <EmployeeDirectory
              employeeData={employeeData.allEmployee || []}
              employeeList={options}
            />
          ) : tabIndex == 1 ? (
            <AddEmployee />
          ) : (
            <h2>Any content 2</h2>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminEmployeeHome;

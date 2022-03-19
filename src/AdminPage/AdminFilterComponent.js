import React, { useEffect, useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getEmployees } from "../Redux/Slices/EmployeeSlice";
import { getFilteredEmployeeData } from "../Redux/Slices/Admin/AdminCustomerSlice";

const initialFilter = {
  startDate: moment().startOf("day").toDate(),
  endDate: moment().endOf("day").toDate(),
  employeeName: [],
  agentName: "",
};

export default function AdminFilterComponent() {
  const [filter, setFilter] = useState({ ...initialFilter });

  const employee = useSelector((state) => state.employee);
  const adminCustomer = useSelector((state) => state.adminCustomer);

  const dispatch = useDispatch();

  useEffect(() => {
    const { employeeName, ...restProps } = filter;
    dispatch(getFilteredEmployeeData(restProps));
  }, []);

  useEffect(() => {
    if (!employee.allEmployee) {
      dispatch(getEmployees());
    }
  }, [employee]);

  const employeeData =
    employee.allEmployee &&
    employee.allEmployee.map((m) => {
      return { value: m.userName, label: m.userName };
    });
  const customerData =
    employee.allEmployee &&
    employee.allEmployee.map((m) => {
      return { value: m.userName, label: m.userName };
    });

  const handleInputChange = (data, type) => {
    let filterData = null;
    switch (true) {
      case type === "startDate":
        filterData = { ...filter, startDate: data };
        setFilter({ ...filter, startDate: data });
        break;
      case type === "endDate":
        filterData = { ...filter, endDate: data };
        setFilter({ ...filter, endDate: data });
        break;
      case type === "agentName":
        filterData = { ...filter, agentName: data };
        setFilter({ ...filter, agentName: data });
        break;
      default:
        return filter;
    }
    const { employeeName, ...restProps } = filterData;
    const agentName = restProps?.agentName?.value;
    restProps.agentName = agentName;
    dispatch(getFilteredEmployeeData(restProps));
  };

  return (
    <div className="admin-filter-container">
      <div className="date-container">
        <label>Start Date</label>
        <ReactDatePicker
          dateFormat="dd/MM/yyyy HH:mm"
          className="date-picker-component"
          selected={filter.startDate}
          onChange={(date) => handleInputChange(date, "startDate")}
        />
      </div>
      <div className="date-container">
        <label>End Date</label>
        <ReactDatePicker
          dateFormat="dd/MM/yyyy HH:mm"
          className="date-picker-component"
          selected={filter.endDate}
          onChange={(date) => handleInputChange(date, "endDate")}
        />
      </div>
      <div className="date-container">
        <label>Employee Name</label>
        <Select
          value={filter.agentName}
          className="employee-select-component"
          onChange={(date) => handleInputChange(date, "agentName")}
          options={employeeData}
        />
      </div>
      <div className="date-container">
        <label>Customer contact Number</label>
        <Select
          value={filter.agentName}
          className="employee-select-component"
          onChange={(date) => handleInputChange(date, "agentName")}
          options={employeeData}
        />
      </div>
      <div className="date-container">
        <label>Customer Number</label>
        <Select
          value={filter.agentName}
          className="employee-select-component"
          onChange={(date) => handleInputChange(date, "agentName")}
          options={employeeData}
        />
      </div>
    </div>
  );
}

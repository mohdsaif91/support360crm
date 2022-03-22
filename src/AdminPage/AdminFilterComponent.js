import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredEmployeeData } from "../Redux/Slices/Admin/AdminCustomerSlice";

const initialFilter = {
  startDate: moment().startOf("day").toDate(),
  endDate: moment().endOf("day").toDate(),
  employeeName: [],
  agentName: "",
  customerName: "",
};

export default function AdminFilterComponent() {
  const [filter, setFilter] = useState({ ...initialFilter });

  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  // console.log(employee);

  const employeeData =
    employee.allEmployee &&
    employee.allEmployee.map((m) => {
      return { value: m.userName, label: m.userName };
    });

  const customerData =
    employee.customerName &&
    employee.customerName.map((m) => {
      return { value: m, label: m };
    });

  const handleInputChange = (data, type) => {
    let filterData = null;

    console.log(type);
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
      case type === "employeeText":
        console.log("hi here");
        filterData = { ...filter, employeeText: data };
        setFilter({ ...filter, employeeText: data });
        break;
      default:
        return filter;
    }
    const { employeeName, ...restProps } = filterData;
    const agentName = restProps?.agentName?.value;
    const employeeText = restProps?.employeeText?.value;
    restProps.agentName = agentName;
    restProps.employeeText = employeeText;
    console.log(restProps);
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
        <label>Customer Name</label>
        <Select
          value={filter.employeeText}
          className="employee-select-component"
          onChange={(data) => handleInputChange(data, "employeeText")}
          options={customerData}
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

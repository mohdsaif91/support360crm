import React, { useState, useEffect } from "react";
import ReactDatePicker from "react-datepicker";
import Select from "react-select";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import { getFilteredEmployeeData } from "../Redux/Slices/Admin/AdminCustomerSlice";

const initialFilter = {
  startDate: moment().startOf("day").toDate(),
  endDate: moment().endOf("day").toDate(),
  agentName: { label: "", value: "" },
  customerName: "",
  customerPhoneNumber: { label: "", value: "" },
  selectedcustomer: { label: "", value: "" },
};

export default function AdminFilterComponent() {
  const [filter, setFilter] = useState({ ...initialFilter });

  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();

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

  const custonmerNumber =
    employee.customerNumber &&
    employee.customerNumber.map((m) => {
      return { value: m, label: m };
    });

  useEffect(() => {
    let newFilter = {
      createdAt: {
        $gte: filter.startDate,
        $lte: filter.endDate,
      },
    };
    if (filter.agentName && filter.agentName.value !== "") {
      newFilter.agentName = filter.agentName.value;
    }
    if (filter.selectedcustomer && filter.selectedcustomer.value !== "") {
      newFilter.customerName = filter.selectedcustomer.value;
    }
    if (filter.customerPhoneNumber && filter.customerPhoneNumber.value !== "") {
      newFilter.phoneNumber = filter.customerPhoneNumber.value;
    }

    dispatch(getFilteredEmployeeData(newFilter));
  }, [dispatch, filter]);

  return (
    <div className="admin-filter-container">
      <div className="date-container">
        <label>Start Date</label>
        <ReactDatePicker
          dateFormat="dd/MM/yyyy HH:mm"
          className="date-picker-component"
          selected={filter.startDate}
          onChange={(date) => setFilter({ ...filter, startDate: date })}
        />
      </div>
      <div className="date-container">
        <label>End Date</label>
        <ReactDatePicker
          dateFormat="dd/MM/yyyy HH:mm"
          className="date-picker-component"
          selected={filter.endDate}
          onChange={(date) => setFilter({ ...filter, endDate: date })}
        />
      </div>
      <div className="date-container">
        <label>Agent Name</label>
        <Select
          isClearable={true}
          value={filter.agentName}
          className="employee-select-component"
          onChange={(value) => setFilter({ ...filter, agentName: value })}
          options={employeeData}
        />
      </div>
      <div className="date-container">
        <label>Customer Name</label>
        <Select
          isClearable={true}
          value={filter.selectedcustomer}
          className="employee-select-component"
          onChange={(value) =>
            setFilter({ ...filter, selectedcustomer: value })
          }
          options={customerData}
        />
      </div>
      <div className="date-container">
        <label>Customer Number</label>
        <Select
          isClearable={true}
          placeholder="Select"
          value={filter.customerPhoneNumber}
          className="employee-select-component"
          onChange={(value) =>
            setFilter({ ...filter, customerPhoneNumber: value })
          }
          options={custonmerNumber}
        />
      </div>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import AdminFilterComponent from "./AdminFilterComponent";
import AdminTable from "./AdminTable";
import { getFilteredEmployeeData } from "../Redux/Slices/Admin/AdminCustomerSlice";
import { getEmployees } from "../Redux/Slices/EmployeeSlice";

const initialFilter = {
  startDate: moment().startOf("day").toDate(),
  endDate: moment().endOf("day").toDate(),
  employeeName: [],
  agentName: "",
};

export default function AdminData() {
  const [filter] = useState({ ...initialFilter });

  const employee = useSelector((state) => state.employee);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!employee.allEmployee) {
      dispatch(getEmployees());
    }
  }, [dispatch, employee]);

  useEffect(() => {
    let newFilter = {};
    newFilter.createdAt = {
      $gte: filter.startDate,
      $lte: filter.endDate,
    };
    dispatch(getFilteredEmployeeData(newFilter));
  }, [dispatch, filter]);

  return (
    <div className="admin-page-margin">
      <AdminFilterComponent />
      <div className="table-container">
        <AdminTable />
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { useSelector } from "react-redux";
import Table from "../Component/Table";

export default function UserTable() {
  const employeeTableData = useSelector((state) => state.employee);
  return (
    <div>
      <Table data={employeeTableData.employeeTableData} />
    </div>
  );
}

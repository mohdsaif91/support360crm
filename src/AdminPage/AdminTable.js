import React from "react";
import { useSelector } from "react-redux";

import Table from "../Component/Table";

export default function AdminTable() {
  const adminCustomer = useSelector((state) => state.adminCustomer);
  const role = useSelector((state) => state.login);

  return (
    <div className="admin-table">
      <Table
        loading={adminCustomer.loader}
        role={role.user}
        data={adminCustomer.filteredCustomer?.filterData}
      />
    </div>
  );
}

import React from "react";

import AdminFilterComponent from "./AdminFilterComponent";
import AdminTable from "./AdminTable";

export default function AdminData() {
  return (
    <div className="admin-page-margin">
      <AdminFilterComponent />
      <div className="table-container">
        <AdminTable />
      </div>
    </div>
  );
}

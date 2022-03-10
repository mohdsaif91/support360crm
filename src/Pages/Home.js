import React from "react";

import FilterComponent from "./FilterComponent";
import UserTable from "./UserTable";

export default function Home() {
  return (
    <div>
      <FilterComponent />
      <div className="table-container">
        <UserTable />
      </div>
    </div>
  );
}

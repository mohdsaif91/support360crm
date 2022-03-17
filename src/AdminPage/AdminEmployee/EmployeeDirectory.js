import React, { useEffect, useRef, useState } from "react";
import { useTable, useExpanded } from "react-table";
import Select from "react-select";
import moment from "moment";
import { useDispatch } from "react-redux";

import { removeEmployeeFun } from "../../Redux/Slices/EmployeeSlice";
import ModalComponent from "../../Component/ModalComponent";

function EmployeeDirectory({ employeeList, employeeData }) {
  const [empData, setEmpData] = useState([]);
  const [selectValue, setSelectValue] = useState({ value: "", label: "" });
  const [modalIsOpen, setIsOpen] = useState(false);

  const dispatch = useDispatch();
  const selectRef = useRef();

  useEffect(() => {
    if ([...empData] !== [...employeeData]) {
      setEmpData([...employeeData]);
    }
  }, [...employeeData]);

  useEffect(() => {
    console.log(selectValue, "<>? ");
    if (!selectValue) {
      setEmpData([...employeeData]);
    } else {
      setEmpData([
        ...employeeData.filter((f) => f.userName === selectValue.value),
      ]);
    }
  }, [selectValue]);

  const removeEmployee = (id) => {
    console.log(id);
    setIsOpen(true);
    // dispatch(removeEmployeeFun({ id }));
  };

  const columns = React.useMemo(
    () => [
      { Header: "Employee Name", accessor: "userName" },
      { Header: "Gender", accessor: "gender" },
      {
        Header: "Joined Date",
        accessor: ({ dateOfJoining }) =>
          moment(dateOfJoining).format("YYYY-MM-DD"),
      },
      { Header: "Mobile Number", accessor: "mobileNumber" },
      {
        Header: "Age",
        accessor: ({ dateOfBirth }) => (
          <div>
            {dateOfBirth ? moment(dateOfBirth).format("YYYY-MM-DD") : "NA"}
          </div>
        ),
      },
      {
        Header: "Action",
        columns: [
          {
            Header: "Remove",
            accessor: ({ _id }) => (
              <button
                className="btn remove-emp-btn"
                onClick={() => removeEmployee(_id)}
              >
                Remove
              </button>
            ),
          },
          {
            Header: "Update password",
            accessor: ({ _id }) => (
              <button
                className="btn update-emp-btn"
                onClick={() => removeEmployee(_id)}
              >
                Update Password
              </button>
            ),
          },
        ],
      },
    ],
    []
  );

  const selectEmp = (v) => {
    console.log(v, " value ");
    setSelectValue(v);
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state: {},
  } = useTable(
    {
      columns,
      data: empData,
    },
    useExpanded
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const onCloseModal = () => {
    setIsOpen(false);
  };

  return (
    <div className="employee-directory-container">
      <div className="employee-filter">
        <Select
          ref={selectRef}
          isClearable={true}
          value={selectValue}
          className="employee-select"
          options={employeeList}
          onChange={(v) => selectEmp(v)}
        />
      </div>
      <ModalComponent
        onCloseModal={() => onCloseModal()}
        openModal={() => openModal()}
        flag={modalIsOpen}
      />
      <div className="table-container">
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    {...column.getHeaderProps({
                      style: { minWidth: column.minWidth, width: column.width },
                    })}
                  >
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <React.Fragment key={row.getRowProps().key}>
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, index) => {
                      return (
                        <td key={index} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default EmployeeDirectory;

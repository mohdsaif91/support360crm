import React, { useEffect, useMemo, useRef, useState } from "react";
import { useTable, useExpanded } from "react-table";
import Select from "react-select";
import moment from "moment";
import { useDispatch } from "react-redux";

import { removeEmployeeFun } from "../../Redux/Slices/EmployeeSlice";
import ModalComponent from "../../Component/ModalComponent";
import PasswordUpdate from "../../Component/PasswordUpdate";

const initialUpdate = {
  data: {},
  flag: false,
};

function EmployeeDirectory({ employeeList, employeeData }) {
  const [empData, setEmpData] = useState([]);
  const [selectValue, setSelectValue] = useState({ value: "", label: "" });
  const [modalIsOpen, setIsOpen] = useState({ flag: false, id: "" });
  const [updateModal, setUpdateModal] = useState({ ...initialUpdate });

  const dispatch = useDispatch();
  const selectRef = useRef();

  useEffect(() => {
    if ([...empData] !== [...employeeData]) {
      setEmpData([...employeeData]);
    }
  }, [employeeData]);

  useEffect(() => {
    if (!selectValue || selectValue.value === "") {
      setEmpData([...employeeData]);
    } else {
      setEmpData([
        ...employeeData.filter((f) => f.userName === selectValue.value),
      ]);
    }
  }, [selectValue]);

  const removeEmployee = (id) => {
    setIsOpen({ ...modalIsOpen, flag: true, id });
  };

  const updateEmpPassword = (id, index) => {
    setUpdateModal({
      ...updateModal,
      data: employeeData[index],
      flag: true,
    });
  };

  const confirmRemoveEmployee = () => {
    dispatch(removeEmployeeFun({ id: modalIsOpen.id }));
    setIsOpen({ flag: false, id: "" });
  };

  const selectEmp = (v) => {
    setSelectValue(v);
  };

  const onCloseModal = () => {
    setIsOpen({ ...modalIsOpen, flag: false, id: "" });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Employee",
        columns: [
          { Header: "Name", accessor: "userName" },
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
        ],
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
            accessor: ({ _id }, index) => (
              <button
                className="btn update-emp-btn"
                onClick={() => updateEmpPassword(_id, index)}
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
      {modalIsOpen.flag && (
        <ModalComponent
          onCloseModal={() => onCloseModal()}
          flag={modalIsOpen.flag}
          removeEmployee={() => confirmRemoveEmployee()}
        />
      )}
      {updateModal.flag && (
        <PasswordUpdate
          closeUpdateModal={() => setUpdateModal({ ...initialUpdate })}
          data={updateModal.data}
        />
      )}

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

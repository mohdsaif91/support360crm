import React, { useEffect, useState } from "react";
import { useTable, useExpanded } from "react-table";

import DateCell from "./TableCellComponent/DateCell";
import RightIcon from "../Images/next.png";
import DownIcon from "../Images/down.png";
import LoadingGif from "../Images/loading.gif";

export default function Table(props) {
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    if (props?.data) {
      setTableData([...props.data]);
    }
  }, [props]);

  const renderRowSubComponent = (row) => {
    return (
      <div className="expand-container">
        <div className="sub-container">
          <div className="expand-label">
            <div>
              Billing Address :
              <span className="data">{row.original.billingAddress}</span>
            </div>
          </div>
          <div className="expand-label">
            <div>
              Shipping Address :
              <span className="data">{row.original.shippingAddress}</span>
            </div>
          </div>
        </div>
        <div className="sub-container">
          <div className="expand-label">
            <div>
              Email :<span className="data">{row.original.email}</span>
            </div>
          </div>
          <div className="expand-label">
            <div>
              Phone :<span className="data">{row.original.phoneNumber}</span>
            </div>
          </div>
        </div>
        <div className="sub-container">
          <div className="expand-label">
            <div>
              Card Number :
              <span className="data">{row.original.cardNumber}</span>
            </div>
          </div>
          <div className="expand-label">
            <div>
              Card Expiry :<span className="data">{row.original.cardExp}</span>
            </div>
          </div>
          <div className="expand-label">
            <div>
              Card CVV :<span className="data">{row.original.cardCVV}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };
  const columns = React.useMemo(
    () => [
      {
        Header: "Agent",
        columns: [
          {
            Header: "Created At",
            className: "date-col",
            minWidth: 240,
            width: 240,
            accessor: ({ createdAt }) => <DateCell data={createdAt} />,
          },
          {
            id: "admin",
            Header: () => "Name",
            width: 120,
            accessor: ({ agentName }) => agentName,
          },
          {
            // Build our expander column
            id: "expander", // Make sure it has an ID
            Header: ({ getToggleAllRowsExpandedProps, isAllRowsExpanded }) => {
              return (
                <span {...getToggleAllRowsExpandedProps()}>
                  {isAllRowsExpanded ? (
                    <img className="icon" alt="" src={DownIcon} />
                  ) : (
                    <img className="icon" alt="" src={RightIcon} />
                  )}
                </span>
              );
            },
            Cell: ({ row }) => (
              <span {...row.getToggleRowExpandedProps()}>
                {row.isExpanded ? (
                  <img className="icon" alt="" src={DownIcon} />
                ) : (
                  <img className="icon" alt="" src={RightIcon} />
                )}
              </span>
            ),
            minWidth: 80,
            width: 80,
          },
        ],
      },

      {
        Header: "Customer",
        columns: [
          {
            Header: "Name",
            accessor: "customerName",
            className: "",
            minWidth: 180,
            width: 180,
          },
          // {
          //   Header: "Email",
          //   accessor: "email",
          // },
          // {
          //   Header: "Phone",
          //   accessor: "phoneNumber",
          // },
          { Header: "City", accessor: "city" },
          { Header: "State", accessor: "state" },

          { Header: "Zip-Code", accessor: "zipCode" },
        ],
      },

      {
        Header: "Card",
        columns: [
          // { Header: "Number", accessor: "cardNumber" },
          // { Header: "Expiry", accessor: "cardExp" },
        ],
      },

      {
        Header: "Product",
        columns: [
          {
            Header: "Name",
            accessor: "productName",
          },
          {
            Header: "Quantity",
            accessor: "quantity",
            minWidth: 40,
            width: 40,
          },
          { Header: "Amount", accessor: "amount", minWidth: 40, width: 40 },
        ],
      },
      // {
      //   Header: "Address",
      //   columns: [
      //     {
      //       Header: "Billing",
      //       accessor: "billingAddress",
      //     },
      //     {
      //       Header: "Shipping",
      //       accessor: "shippingAddress",
      //     },
      //   ],
      // },
    ],
    []
  );

  // props?.role?.role === "admin" &&
  //   columns.splice(1, 0, {
  //     Header: "Agent",
  //     width: 120,
  //     accessor: "agentName",
  //   });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    visibleColumns,
    state: { expanded },
  } = useTable(
    {
      columns,
      data: tableData,
    },
    useExpanded
  );

  return (
    <>
      {props.loading ? (
        <div className="loading-container">
          <img src={LoadingGif} alt="Loading..." className="show-loading" />
        </div>
      ) : tableData.length === 0 ? (
        <div className="center-message">No Data or select any filter</div>
      ) : (
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
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded && (
                    <td colSpan={visibleColumns.length}>
                      {renderRowSubComponent(row)}
                    </td>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
}

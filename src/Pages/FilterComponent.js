import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalPopUp from "../Component/ModalPopUp";
import { getCustomer } from "../Redux/Slices/CustomerSlice";

export default function FilterComponent() {
  const [show, setShow] = useState(false);

  const customerData = useSelector((state) => state.customer);
  const dispatch = useDispatch();

  console.log(customerData);

  return (
    <div className="filter">
      <div className="filterComponent">
        <div className="filter-continer">Filters</div>
        <div className="actio-container">
          <button className="add-btn btn" onClick={() => setShow(!show)}>
            Add Data
          </button>
        </div>
        {/* <button className="add-btn btn" onClick={() => dispatch(getCustomer())}>
          get Data
        </button> */}
      </div>
      {show && (
        // <div className="modal-container">
        <ModalPopUp closePopup={() => setShow(false)} />
        // </div>
      )}
    </div>
  );
}

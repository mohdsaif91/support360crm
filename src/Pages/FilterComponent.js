import React, { useState } from "react";
import ModalPopUp from "../Component/ModalPopUp";

export default function FilterComponent() {
  const [show, setShow] = useState(false);

  return (
    <div className="filter">
      <div className="filterComponent">
        <div className="filter-continer">Filters</div>
        <div className="actio-container">
          <button className="add-btn btn" onClick={() => setShow(!show)}>
            Add Data
          </button>
        </div>
      </div>
      {show && (
        // <div className="modal-container">
        <ModalPopUp closePopup={() => setShow(false)} />
        // </div>
      )}
    </div>
  );
}

import React, { useEffect, useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

function ModalComponent(props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(props.flag === true);
  }, [props.flag]);

  return (
    <div>
      <Modal open={open} onClose={() => props.onCloseModal()} center>
        <div className="modal-container">
          <div className="modal-text">
            Are you sure you want to remove this employee ?
          </div>
          <div className="btn-container">
            <button
              className="btn cancle-modal-btn"
              onClick={() => props.onCloseModal()}
            >
              Cancle
            </button>
            <button
              className="btn remove-modal-btn"
              onClick={() => props.removeEmployee()}
            >
              remove
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ModalComponent;

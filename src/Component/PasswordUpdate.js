import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Modal } from "react-responsive-modal";

import "react-responsive-modal/styles.css";
import { updatePasswordFun } from "../Redux/Slices/LoginSlice";

function PasswordUpdate(props) {
  const [open, setOpen] = useState({ data: {} });
  const [password, setPassword] = useState({
    passwordChange: "",
    confirmPassword: "",
  });
  const [text, setText] = useState({ flag: false });

  const dispatch = useDispatch();

  useEffect(() => {
    setOpen({ data: props.data });
  }, [props.data]);

  const updatePassword = () => {
    if (password.passwordChange === password.confirmPassword) {
      const data = {
        employeeId: open.data._id,
        newPassword: password.passwordChange,
      };
      dispatch(updatePasswordFun({ ...data }));
    } else {
      return null;
    }
  };

  return (
    <Modal open={true} onClose={() => props.closeUpdateModal()} center>
      <div className="modal-container">
        <div className="modal-text-input">
          <label className="username-text">
            Password chage for- {open.data?.userName}
          </label>
          <form autoComplete="off" className="form-container form">
            <div className="input-img-container">
              <input
                type={`${text.flag ? "text" : "password"}`}
                className="input-ele"
                onChange={(e) => {
                  setPassword({ ...password, passwordChange: e.target.value });
                }}
                placeholder="New Password"
                value={password.password}
                name="passwordChange"
              />
            </div>
            <div className="input-img-container">
              <input
                type={`${text.flag ? "text" : "password"}`}
                className="input-ele"
                placeholder="Confirm Password"
                value={password.confirmPassword}
                name="confirmpassword"
                onChange={(e) =>
                  setPassword({ ...password, confirmPassword: e.target.value })
                }
              />
            </div>
            <div className="check-box-container">
              <input
                type="checkbox"
                className="show-checkbox"
                id="show-password"
                onChange={() =>
                  setText({
                    ...text,
                    flag: !text.flag,
                  })
                }
              />
              <label htmlFor="show-password" className="show-password-label">
                Show Password
              </label>
            </div>
          </form>
          <label className="error-text">
            {((password.confirmPassword !== "" &&
              password.passwordChange !== password.confirmPassword) ||
              password.passwordChange !== password.confirmPassword) &&
              "Both password is not same !"}
          </label>
        </div>

        <div className="btn-container">
          <button
            className="btn cancle-modal-btn"
            onClick={() => props.closeUpdateModal()}
          >
            Cancle
          </button>
          <button
            className="btn remove-modal-btn"
            onClick={() => updatePassword()}
          >
            Update Password
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default PasswordUpdate;

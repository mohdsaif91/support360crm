import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ReactDatePicker from "react-datepicker";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";

import {
  getAddedCustomer,
  updateProfilefun,
} from "../Redux/Slices/EmployeeSlice";
import { phoneValidation } from "../util/util";

const initialUser = {
  dateOfBirth: "",
  dateOfJoining: "",
  gender: "",
  mobileNumber: "",
  password: "",
  present: false,
  role: "",
  token: "",
  userName: "",
  _id: "",
};
const initialValidation = {
  mobileError: false,
  error: false,
};

function EmployeeProfile() {
  const [user, setUser] = useState({ ...initialUser });
  const [validation, setValidate] = useState({ ...initialValidation });

  const loginState = useSelector((state) => state.login);
  useEffect(() => {
    if (loginState?.user) {
      setUser(loginState?.user);
    }
  }, [loginState?.user]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (date) => {
    setUser({ ...user, dateOfBirth: date });
  };

  const updateProfile = () => {
    dispatch(updateProfilefun(user));
  };

  const updateMobileNumber = (e) => {
    if (phoneValidation(e.target.value)) {
      setValidate({ ...validation, mobileError: false, error: false });
    } else {
      setValidate({ ...validation, mobileError: true, error: true });
    }
    setUser({ ...user, mobileNumber: e.target.value });
  };

  return (
    <div className="employee-profile-container">
      <div className="navigate-container">
        <label className="navigate-label" onClick={() => navigate("/")}>
          Home
        </label>
        <label className="navigate-label nav-active">/Profile</label>
      </div>
      <div className="profile-form">
        <div className="form-control">
          <label className="label-component">User Name {user.userName}</label>
        </div>
        <div className="form-control">
          <label className="label-component">
            Date of Joining {moment(user.dateOfJoining).format("YYYY-MM-DD")}
          </label>
        </div>
        <div className="form-control">
          <label className="label-component">Mobile Number</label>
          <input
            name="mobileNumber"
            value={user.mobileNumber}
            className="input-element"
            onChange={(e) => updateMobileNumber(e)}
          />
          {validation.mobileError && (
            <div className="error-text no-center">Mobile Number is invalid</div>
          )}
        </div>

        <div className="form-control">
          <label className="label-component">Date of birth</label>
          <ReactDatePicker
            dateFormat="dd/MM/yyyy"
            className="input-element"
            selected={
              user.dateOfBirth !== ""
                ? moment(user?.dateOfBirth).toDate()
                : moment().startOf("day").toDate()
            }
            onChange={(date) => handleInputChange(date)}
          />
        </div>
        <div className="form-control">
          <label className="label-component">Gender</label>
          <div className="radio-container">
            <div className="radio-ele">
              <input
                type="radio"
                className="radio-btn-element"
                id="male"
                checked={user.gender === "male"}
                name="fav_language"
                value="male"
                onChange={() => setUser({ ...user, gender: "male" })}
              />
              <label htmlFor="male">Male</label>
            </div>
            <div className="radio-ele">
              <input
                type="radio"
                id="female"
                checked={user.gender === "female"}
                name="fav_language"
                value="female"
                onChange={() => setUser({ ...user, gender: "female" })}
              />
              <label htmlFor="female">Female</label>
            </div>
          </div>
        </div>
        <div className="btn-container">
          <button
            className={`btn profile-update-btn ${
              validation.error && "btn-disable"
            }`}
            onClick={() => updateProfile()}
            disabled={validation.error}
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmployeeProfile;

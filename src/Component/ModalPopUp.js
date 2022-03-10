import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "../Images/close.png";
import { addCustomer } from "../Redux/Slices/CustomerSlice";
import {
  cardExpiryValidation,
  cvvValidation,
  emailValidation,
  phoneValidation,
} from "../util/util";

const initialFormData = {
  agentName: "",
  cardNumber: "",
  cardExp: "",
  cardCVV: "",
  customerName: "",
  billingAddress: "",
  city: "",
  state: "",
  zipCode: "",
  phoneNumber: "",
  shippingAddress: "",
  email: "",
  productName: "",
  quantity: "",
  amount: "",
};

const initialFormDataFocus = {
  agentName: false,
  cardNumber: false,
  cardExp: false,
  cardCVV: false,
  customerName: false,
  billingAddress: false,
  city: false,
  state: false,
  zipCode: false,
  phoneNumber: false,
  shippingAddress: false,
  email: false,
  productName: false,
  quantity: false,
  amount: false,
};

const validationData = {
  emailValid: false,
  phoneValid: false,
  cardNumber: false,
  cardExpiry: false,
  cardCVV: false,
};

export default function ModalPopUp(props) {
  const [formData, setFormData] = useState({ ...initialFormData });
  const [error, setError] = useState(false);
  const [focus, setFocus] = useState({ ...initialFormDataFocus });
  const [validation, setValidation] = useState({ ...validationData });

  const loginState = useSelector((state) => state.login);

  useEffect(() => {
    setFormData({ ...formData, agentName: loginState?.user?.userName });
  }, []);

  const dispatch = useDispatch();

  const heandleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    switch (true) {
      case e.target.name == "email":
        if (!emailValidation(e.target.value)) {
          setValidation({ ...validation, emailValid: true });
        } else {
          setValidation({ ...validation, emailValid: false });
        }
        break;
      case e.target.name == "phoneNumber":
        if (phoneValidation(e.target.value)) {
          setValidation({ ...validation, phoneValid: false });
        } else {
          setValidation({ ...validation, phoneValid: true });
        }
        break;
      case e.target.name == "cardNumber":
        if (e.target.value.length === 16) {
          setValidation({ ...validation, cardNumber: false });
        } else {
          setValidation({ ...validation, cardNumber: true });
        }
        break;
      case e.target.name == "cardExp":
        if (cardExpiryValidation(e.target.value)) {
          setValidation({ ...validation, cardExpiry: false });
        } else {
          setValidation({ ...validation, cardExpiry: true });
        }
        break;
      case e.target.name == "cardCVV":
        if (cvvValidation(e.target.value)) {
          setValidation({ ...validation, cardCVV: false });
        } else {
          setValidation({ ...validation, cardCVV: true });
        }
        break;
      default:
        return "";
    }
  };

  const checkforEmpty = () => {
    if (
      formData.agentName === "" ||
      formData.cardNumber === "" ||
      formData.cardExp === "" ||
      formData.cardCVV === "" ||
      formData.customerName === "" ||
      formData.billingAddress === "" ||
      formData.city === "" ||
      formData.state === "" ||
      formData.zipCode === "" ||
      formData.phoneNumber === "" ||
      formData.shippingAddress === "" ||
      formData.email === "" ||
      formData.productName === "" ||
      formData.quantity === "" ||
      formData.amount === ""
    ) {
      setError(true);
      return true;
    } else {
      setError(false);
      return false;
    }
  };

  const submitData = () => {
    if (checkforEmpty()) {
    } else {
      dispatch(addCustomer(formData));
    }
  };

  const focusEvent = (e) => {
    if (formData[e.target.name] === "") {
      setFocus({ ...focus, [e.target.name]: true });
    }
  };

  return (
    <div className="modal-popup">
      <div className="modal-header">
        <div className="">Add Customer Data</div>
        <img
          onClick={() => props.closePopup()}
          className="icon"
          src={CloseIcon}
        />
      </div>
      <form className="form-container" autoComplete="off" autoCorrect="off">
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>Customer Name</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.customerName === "" &&
                focus.customerName &&
                "input-error"
              } input-text`}
              name="customerName"
              type="text"
              value={formData.customerName}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.customerName === "" && focus.customerName && (
              <div className="error-text">Customer name Required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Card Number</label>
              <label>Required</label>
            </div>
            <input
              autocomplete="off"
              onBlur={(e) => focusEvent(e)}
              name="cardNumber"
              className={`${
                formData.cardNumber === "" && focus.cardNumber && "input-error"
              } input-text`}
              type="text"
              value={formData.cardNumber}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.cardNumber === "" && focus.cardNumber && (
              <div className="error-text">Card number Required !</div>
            )}
            {validation.cardNumber && (
              <div className="error-text">Invalid Card number !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Card CVV</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.cardCVV === "" && focus.cardCVV && "input-error"
              } input-text`}
              type="text"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.cardCVV === "" && focus.cardCVV && (
              <div className="error-text">Card CVV Required !</div>
            )}
            {validation.cardCVV && (
              <div className="error-text">Invalid Card CVV !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Card Expiry</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.cardExp === "" && focus.cardExp && "input-error"
              } input-text`}
              type="text"
              name="cardExp"
              value={formData.cardExp}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.cardExp === "" && focus.cardExp && (
              <div className="error-text">Card Expiry Required !</div>
            )}
            {validation.cardExpiry && (
              <div className="error-text">Invalid date !</div>
            )}
          </div>
        </div>
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>Product Name</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.productName === "" &&
                focus.productName &&
                "input-error"
              } input-text`}
              type="text"
              name="productName"
              value={formData.productName}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.productName === "" && focus.productName && (
              <div className="error-text">Product Name Required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Product Quantity</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.quantity === "" && focus.quantity && "input-error"
              } input-text`}
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.quantity === "" && focus.quantity && (
              <div className="error-text">Product quantity required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Product Amount</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.amount === "" && focus.amount && "input-error"
              } input-text`}
              type="text"
              name="amount"
              value={formData.amount}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.amount === "" && focus.amount && (
              <div className="error-text">Product amount Required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Agent Name</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.agentName === "" && focus.agentName && "input-error"
              } input-text`}
              type="text"
              name="agentName"
              value={formData.agentName}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.agentName === "" && focus.agentName && (
              <div className="error-text">Agent name Required !</div>
            )}
          </div>
        </div>
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>City</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.city === "" && focus.city && "input-error"
              } input-text`}
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.city === "" && focus.city && (
              <div className="error-text">City Required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Zip Code</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.zipCode === "" && focus.zipCode && "input-error"
              } input-text`}
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.zipCode === "" && focus.zipCode && (
              <div className="error-text">Zipcode Required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>State</label>
              <label>Required</label>
            </div>
            <input
              onBlur={(e) => focusEvent(e)}
              name="state"
              className={`${
                formData.state === "" && focus.state && "input-error"
              } input-text`}
              type="text"
              value={formData.state}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.state === "" && focus.state && (
              <div className="error-text">State Required !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Billing Address</label>
              <label>Required</label>
            </div>
            <textarea
              onBlur={(e) => focusEvent(e)}
              className={`${
                formData.billingAddress === "" &&
                focus.billingAddress &&
                "input-error"
              } input-text width-auto`}
              name="billingAddress"
              cols={4}
              rows={4}
              value={formData.billingAddress}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.billingAddress === "" && focus.billingAddress && (
              <div className="error-text">Billing address Required !</div>
            )}
          </div>
        </div>
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>Customer Email ID</label>
              <label>Required</label>
            </div>
            <input
              className={`${
                (formData.email === "" && focus.email && "input-error") ||
                (validation.emailValid && "input-error")
              } input-text`}
              type="text"
              onBlur={(e) => focusEvent(e)}
              name="email"
              value={formData.email}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.email === "" && focus.email && (
              <div className="error-text">Email id Required !</div>
            )}
            {validation.emailValid && (
              <div className="error-text">Email is invalid !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Customer Mobile</label>
              <label>Required</label>
            </div>
            <input
              className={`${
                formData.phoneNumber === "" &&
                focus.phoneNumber &&
                "input-error"
              } input-text`}
              type="text"
              autocomplete="off"
              onBlur={(e) => focusEvent(e)}
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.phoneNumber === "" && focus.phoneNumber && (
              <div className="error-text">Phone number Required !</div>
            )}
            {validation.phoneValid && (
              <div className="error-text">Invalid Phone number !</div>
            )}
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Shipping Address</label>
              <label>Required</label>
            </div>
            <textarea
              className={`${
                formData.shippingAddress === "" &&
                focus.shippingAddress &&
                "input-error"
              } input-text width-auto`}
              onBlur={(e) => focusEvent(e)}
              name="shippingAddress"
              cols={4}
              rows={4}
              value={formData.shippingAddress}
              onChange={(e) => heandleOnChange(e)}
            />
            {formData.shippingAddress === "" && focus.shippingAddress && (
              <div className="error-text">Shipping address Required !</div>
            )}
          </div>
        </div>
      </form>
      <div className="modal-footer">
        <div className="btn-container">
          <button className="btn clear-btn">Clear</button>
          <button
            className={`${
              (formData.agentName === "" ||
                formData.cardNumber === "" ||
                formData.cardExp === "" ||
                formData.cardCVV === "" ||
                formData.customerName === "" ||
                formData.billingAddress === "" ||
                formData.city === "" ||
                formData.state === "" ||
                formData.zipCode === "" ||
                formData.phoneNumber === "" ||
                formData.shippingAddress === "" ||
                formData.email === "" ||
                formData.productName === "" ||
                formData.quantity === "" ||
                formData.amount === "") &&
              "disable-btn"
            } btn add-btn`}
            onClick={() => submitData()}
            disabled={
              formData.agentName === "" ||
              formData.cardNumber === "" ||
              formData.cardExp === "" ||
              formData.cardCVV === "" ||
              formData.customerName === "" ||
              formData.billingAddress === "" ||
              formData.city === "" ||
              formData.state === "" ||
              formData.zipCode === "" ||
              formData.phoneNumber === "" ||
              formData.shippingAddress === "" ||
              formData.email === "" ||
              formData.productName === "" ||
              formData.quantity === "" ||
              formData.amount === ""
            }
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

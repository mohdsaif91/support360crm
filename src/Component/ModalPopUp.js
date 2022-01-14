import React, { useRef, useState } from "react";

import CloseIcon from "../Images/close.png";

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

export default function ModalPopUp(props) {
  const [formData, setFormData] = useState({ ...initialFormData });

  const heandleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitData = () => {};

  const checkAllFeilds = () => {
    const {
      agentName,
      cardNumber,
      cardExp,
      cardCVV,
      customerName,
      billingAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      shippingAddress,
      email,
      productName,
      quantity,
      amount,
    } = formData;
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
              className={`input-text`}
              name="customerName"
              type="text"
              value={formData.customerName}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Card Number</label>
              <label>Required</label>
            </div>
            <input
              name="cardNumber"
              className={`input-text`}
              type="text"
              value={formData.cardNumber}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Card CVV</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="cardCVV"
              value={formData.cardCVV}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Card Expiry</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="cardExp"
              value={formData.cardExp}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
        </div>
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>Product Name</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="productName"
              value={formData.productName}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Product Quantity</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="quantity"
              value={formData.quantity}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>product Amount</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="amount"
              value={formData.amount}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Agent Name</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              value={formData.agentName}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
        </div>
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>City</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="city"
              value={formData.city}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Zip Code</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>State</label>
              <label>Required</label>
            </div>
            <input
              name="state"
              className={`input-text`}
              type="text"
              value={formData.state}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Billing Address</label>
              <label>Required</label>
            </div>
            <textarea
              className={`input-text width-auto`}
              name="billingAddress"
              cols={4}
              rows={4}
              value={formData.billingAddress}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
        </div>
        <div>
          <div className="input-item">
            <div className="input-label">
              <label>Customer Email ID</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="email"
              value={formData.email}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Customer Mobile</label>
              <label>Required</label>
            </div>
            <input
              className={`input-text`}
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
          <div className="input-item">
            <div className="input-label">
              <label>Shipping Address</label>
              <label>Required</label>
            </div>
            <textarea
              className={`input-text width-auto`}
              name="shippingAddress"
              cols={4}
              rows={4}
              value={formData.shippingAddress}
              onChange={(e) => heandleOnChange(e)}
            />
          </div>
        </div>
      </form>
      <div className="modal-footer">
        <div className="btn-container">
          <button className="btn clear-btn">Clear</button>
          <button
            className="btn add-btn"
            onClick={() => submitData()}
            disabled={checkAllFeilds()}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}

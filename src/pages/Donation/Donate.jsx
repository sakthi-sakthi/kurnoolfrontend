import React, { useState } from "react";
import Swal from "sweetalert2";

const Donate = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    pan: "",
    address: "",
    amount: "",
    paymentType: "online", // Default to online payment
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const mobileRegex = /^\d{10}$/;
    const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]$/;

    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.amount
    ) {
      showError("Please fill in all required fields");
    } else if (!mobileRegex.test(formData.mobile)) {
      showError("Invalid Mobile Number. Please enter a 10-digit number.");
    } else if (!panRegex.test(formData.pan)) {
      showError("Invalid PAN Number. Please enter a valid PAN format.");
    } else {
      setLoading(true);

      setTimeout(() => {
        showSuccess("Donation submitted successfully");
        setLoading(false);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          pan: "",
          address: "",
          amount: "",
          paymentType: "online",
        });
      }, 2000);
    }
  };

  const showError = (message) => {
    Swal.fire("Error", message, "error");
  };

  const showSuccess = (message) => {
    Swal.fire("Success", message, "success");
  };
  return (
    <>
      <div className="popupmsg mt-5 mb-4">
        {" "}
        <b style={{ color: "red" }}> Note: </b>
        <strong>
          We regret to inform you that our online payment system is currently
          experiencing technical difficulties. However, your generous
          contributions are crucial to our cause, and we deeply appreciate your
          willingness to support us. To proceed with your donation, please
          contact us directly at <a href="tel:9645279101">+91-9645279101</a>.
          Our team will assist you promptly to ensure your donation is processed
          correctly.
          <br /> <center>Thank You</center>
        </strong>
      </div>
      <div className="donation-container mt-5 mb-4">
        <div className="donation-header">
          <h2>Make a Donation</h2>
          <p>Your support helps us make a difference.</p>
        </div>

        <form
          id="donationForm"
          className="donation-form"
          onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="John Doe"
                onChange={handleChange}
                value={formData.name}
                autoFocus
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="john@example.com"
                onChange={handleChange}
                value={formData.email}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="mobile">Mobile Number</label>
              <input
                type="tel"
                className="form-control"
                id="mobile"
                name="mobile"
                placeholder="1234567890"
                onChange={handleChange}
                value={formData.mobile}
                maxLength={10}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="pan">PAN Number</label>
              <input
                type="text"
                className="form-control"
                id="pan"
                name="pan"
                placeholder="ABCDE1234F"
                onChange={handleChange}
                value={formData.pan}
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group col-md-6">
              <label htmlFor="amount">Donation Amount (USD)</label>
              <input
                type="number"
                className="form-control"
                id="amount"
                name="amount"
                placeholder="Enter amount"
                min="1"
                onChange={handleChange}
                value={formData.amount}
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="paymentType">Payment Type</label>
              <select
                className="form-control"
                id="paymentType"
                name="paymentType"
                onChange={handleChange}
                value={formData.paymentType}>
                <option value="online">Online Payment</option>
                <option value="offline">Offline Payment</option>
              </select>
            </div>
          </div>

          {formData.paymentType === "online" && (
            <div className="alert alert-info" role="alert">
              Choose an online payment option (e.g., credit card, PayPal).
              <p>
                Contact Number : <a href="tel:9645279101">+91-9645279101</a>
              </p>
            </div>
          )}

          {formData.paymentType === "offline" && (
            <div className="alert alert-warning" role="alert">
              Make an offline payment through bank transfer.
              <p>Bank: XYZ Bank</p>
              <p>
                Contact Number : <a href="tel:9645279101">+91-9645279101</a>
              </p>
              <p>Account Number: **************</p>
            </div>
          )}

          <div className="form-group">
            <label htmlFor="address">Address</label>
            <textarea
              className="form-control"
              id="address"
              name="address"
              rows="3"
              placeholder="Enter your address"
              onChange={handleChange}
              value={formData.address}></textarea>
          </div>

          <button type="submit" className="btn btn-primary btn-block" disabled>
            {loading ? "Loading..." : "Donate Now"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Donate;

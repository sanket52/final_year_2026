import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE, getToken, authHeaders } from "../../utils/api";

function AdoptForm(props) {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const pet = props.pet || location.state?.pet;

  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [userName, setUserName] = useState("");
  const [address, setAddress] = useState("");
  const [message, setMessage] = useState("");
  const [livingSituation, setLivingSituation] = useState("");
  const [previousExperience, setPreviousExperience] = useState("");
  const [familyComposition, setFamilyComposition] = useState("");
  const [formError, setFormError] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [ErrPopup, setErrPopup] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [SuccPopup, setSuccPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (user) {
      setEmail(user.email || "");
      setUserName(user.name || "");
      setPhoneNo(user.phone || "");
    }
  }, [user]);

  if (!pet) {
    return (
      <div className="custom-adopt-form-container">
        <p style={{ padding: 24, maxWidth: 520 }}>
          Select a pet on the Pets page and tap <strong>Request adoption</strong> to load this form
          with that profile.
        </p>
        <button
          type="button"
          className="custom-cta-button"
          style={{ marginLeft: 24, marginBottom: 24 }}
          onClick={() => navigate("/pets")}
        >
          Browse pets
        </button>
      </div>
    );
  }

  const petId = String(pet._id || pet.id || "");
  const petName = pet.name || pet.breed || "Pet";
  const petImage =
    pet.filename && !pet.imageUrl
      ? `${API_BASE}/images/${pet.filename}`
      : pet.imageUrl || "";

  const isEmailValid = (val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEmailError(false);
    setFormError("");
    setSubmitError("");
    setErrPopup(false);

    if (!email.trim() || !phoneNo.trim() || !userName.trim()) {
      setFormError("Please fill your name, email, and phone number.");
      return;
    }

    if (!isEmailValid(email)) {
      setEmailError(true);
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login", { state: { from: location, message: "Please login first to continue." } });
      return;
    }

    try {
      setIsSubmitting(true);

      const response = await fetch(`${API_BASE}/api/adopt/request`, {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          petId,
          email: email.trim(),
          phoneNo: phoneNo.trim(),
          livingSituation: livingSituation.trim(),
          previousExperience: previousExperience.trim(),
          familyComposition: familyComposition.trim(),
          userName: userName.trim(),
          address: address.trim(),
          message: message.trim(),
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setSubmitError(data.error || "Could not submit adoption request.");
        setErrPopup(true);
        return;
      }
      setSuccPopup(true);
    } catch (err) {
      setSubmitError("Network error. Please try again.");
      setErrPopup(true);
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }

    setEmailError(false);
    setFormError("");
    setLivingSituation("");
    setPreviousExperience("");
    setFamilyComposition("");
    setAddress("");
    setMessage("");
  };

  return (
    <div className="custom-adopt-form-container">
      <h2 className="custom-form-heading">Pet Adoption Application</h2>
      <div className="form-pet-container">
        <div className="pet-details">
          <div className="pet-pic">
            {petImage && <img src={petImage} alt={petName} />}
          </div>
          <div className="pet-info">
            <h2>{petName}</h2>
            <p>
              <b>Type:</b> {pet.type || pet.species || "—"}
            </p>
            <p>
              <b>Age:</b> {pet.age || "—"}
            </p>
            <p>
              <b>Location:</b> {pet.location || pet.area || "—"}
            </p>
          </div>
        </div>
        <div className="form-div">
          <form onSubmit={handleSubmit} className="custom-form">
            <div className="custom-input-box">
              <label className="custom-label">Your full name *</label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="custom-input"
                required
              />
            </div>
            <div className="custom-input-box">
              <div className="email-not-valid">
                <label className="custom-label">Email:</label>
                {emailError && <p>Please provide valid email address.</p>}
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Phone No.</label>
              <input
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Message (optional)</label>
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Pet Living Situation:</label>
              <input
                type="text"
                value={livingSituation}
                onChange={(e) => setLivingSituation(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Previous Pet Experience:</label>
              <input
                type="text"
                value={previousExperience}
                onChange={(e) => setPreviousExperience(e.target.value)}
                className="custom-input"
              />
            </div>
            <div className="custom-input-box">
              <label className="custom-label">Any Other Pets:</label>
              <input
                type="text"
                value={familyComposition}
                onChange={(e) => setFamilyComposition(e.target.value)}
                className="custom-input"
              />
            </div>
            {formError && (
              <p className="error-message">{formError}</p>
            )}
            <button
              disabled={isSubmitting}
              type="submit"
              className="custom-cta-button custom-m-b"
            >
              {isSubmitting ? "Submitting" : "Submit"}
            </button>
            {ErrPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>{submitError || "Oops!... Connection Error."}</h4>
                </div>
                <button
                  type="button"
                  onClick={() => setErrPopup(false)}
                  className="close-btn"
                >
                  Close <i className="fa fa-times" />
                </button>
              </div>
            )}
            {SuccPopup && (
              <div className="popup">
                <div className="popup-content">
                  <h4>
                    Adoption request for {petName} is submitted; we&apos;ll get in touch soon.
                  </h4>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSuccPopup(false);
                    if (props.closeForm) props.closeForm();
                    else navigate("/pets");
                  }}
                  className="close-btn"
                >
                  Close <i className="fa fa-times" />
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdoptForm;

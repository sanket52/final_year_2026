import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { API_BASE, authHeadersMultipart, getToken } from "../../utils/api";
import "./give-pet-premium.css";

const initialForm = {
  ownerName: "",
  phone: "",
  address: "",
  city: "",
  location: "",
  petName: "",
  petType: "",
  breed: "",
  age: "",
  gender: "",
  vaccinated: "",
  health: "",
  reason: "",
};

const REQUIRED_FIELDS = {
  ownerName: "Owner name is required.",
  phone: "Phone number is required.",
  petName: "Pet name is required.",
  petType: "Pet type is required.",
  age: "Pet age is required.",
  reason: "Reason is required.",
};

const GivePetPremiumForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [form, setForm] = useState(initialForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [serverMessage, setServerMessage] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    setForm((current) => ({
      ...current,
      ownerName: current.ownerName || user?.name || "",
      phone: current.phone || user?.phone || "",
      city: current.city || user?.city || "",
    }));
  }, [user]);

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const requiredFields = useMemo(() => Object.keys(REQUIRED_FIELDS), []);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: "" }));
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0] || null;

    if (preview) {
      URL.revokeObjectURL(preview);
    }

    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : "");
    setErrors((current) => ({ ...current, image: "" }));
  };

  const validate = () => {
    const nextErrors = {};

    requiredFields.forEach((field) => {
      if (!String(form[field] || "").trim()) {
        nextErrors[field] = REQUIRED_FIELDS[field];
      }
    });

    if (!imageFile) {
      nextErrors.image = "Pet image is required.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const resetForm = () => {
    setForm({
      ...initialForm,
      ownerName: user?.name || "",
      phone: user?.phone || "",
      city: user?.city || "",
    });
    setImageFile(null);
    if (preview) {
      URL.revokeObjectURL(preview);
    }
    setPreview("");
    setErrors({});
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setServerMessage(null);

    if (!validate()) {
      return;
    }

    const token = getToken();
    if (!token) {
      navigate("/login", {
        state: {
          from: location,
          message: "Please login first to submit a give a pet request.",
        },
      });
      return;
    }

    const payload = new FormData();
    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value.trim());
    });
    payload.append("image", imageFile);

    setSubmitting(true);
    try {
      const response = await fetch(`${API_BASE}/api/give-pet`, {
        method: "POST",
        headers: authHeadersMultipart(),
        body: payload,
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit request.");
      }

      setServerMessage({
        type: "ok",
        text: data.message || "Your give a pet request has been saved.",
      });
      resetForm();
    } catch (error) {
      setServerMessage({
        type: "err",
        text: error.message || "Unable to submit request.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="gpp-wrap">
      <div
        className="gpp-hero"
        style={{
          backgroundImage:
            "linear-gradient(105deg, rgba(8,65,73,0.88), rgba(255,107,74,0.55)), url(https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1400&q=80)",
        }}
      >
        <h2>Give a pet a safe new home</h2>
        <p>
          Fill in the required details, upload one pet photo, and we will save
          your request in the system for review.
        </p>
      </div>

      <div className="gpp-card">
        <div className="gpp-note">
          Fields marked with * are required. Other details are optional and help
          the team understand the pet better.
        </div>

        {serverMessage && (
          <div className={`gpp-toast gpp-toast-${serverMessage.type}`}>
            {serverMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="gpp-fields">
            <h3>Owner details</h3>
            <div className="gpp-grid">
              <label>
                Owner name *
                <input
                  value={form.ownerName}
                  onChange={(event) =>
                    updateField("ownerName", event.target.value)
                  }
                  className={errors.ownerName ? "invalid" : ""}
                />
                {errors.ownerName && <small>{errors.ownerName}</small>}
              </label>

              <label>
                Phone number *
                <input
                  value={form.phone}
                  onChange={(event) => updateField("phone", event.target.value)}
                  className={errors.phone ? "invalid" : ""}
                />
                {errors.phone && <small>{errors.phone}</small>}
              </label>

              <label>
                City
                <input
                  value={form.city}
                  onChange={(event) => updateField("city", event.target.value)}
                />
              </label>

              <label>
                Area / landmark
                <input
                  value={form.location}
                  onChange={(event) =>
                    updateField("location", event.target.value)
                  }
                />
              </label>
            </div>

            <label>
              Address
              <textarea
                rows={3}
                value={form.address}
                onChange={(event) => updateField("address", event.target.value)}
              />
            </label>

            <h3>Pet details</h3>
            <div className="gpp-grid">
              <label>
                Pet name *
                <input
                  value={form.petName}
                  onChange={(event) => updateField("petName", event.target.value)}
                  className={errors.petName ? "invalid" : ""}
                />
                {errors.petName && <small>{errors.petName}</small>}
              </label>

              <label>
                Pet type *
                <select
                  value={form.petType}
                  onChange={(event) => updateField("petType", event.target.value)}
                  className={errors.petType ? "invalid" : ""}
                >
                  <option value="">Select type</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="bird">Bird</option>
                  <option value="other">Other</option>
                </select>
                {errors.petType && <small>{errors.petType}</small>}
              </label>

              <label>
                Breed
                <input
                  value={form.breed}
                  onChange={(event) => updateField("breed", event.target.value)}
                />
              </label>

              <label>
                Age *
                <input
                  value={form.age}
                  onChange={(event) => updateField("age", event.target.value)}
                  placeholder="Example: 2 years"
                  className={errors.age ? "invalid" : ""}
                />
                {errors.age && <small>{errors.age}</small>}
              </label>

              <label>
                Gender
                <select
                  value={form.gender}
                  onChange={(event) => updateField("gender", event.target.value)}
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>

              <label>
                Vaccination
                <select
                  value={form.vaccinated}
                  onChange={(event) =>
                    updateField("vaccinated", event.target.value)
                  }
                >
                  <option value="">Select status</option>
                  <option value="yes">Vaccinated</option>
                  <option value="partial">Partially vaccinated</option>
                  <option value="no">Not vaccinated</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>
            </div>

            <label>
              Health details
              <textarea
                rows={3}
                value={form.health}
                onChange={(event) => updateField("health", event.target.value)}
                placeholder="Mention medication, allergy, or special care if needed."
              />
            </label>

            <label>
              Reason for giving pet *
              <textarea
                rows={4}
                value={form.reason}
                onChange={(event) => updateField("reason", event.target.value)}
                className={errors.reason ? "invalid" : ""}
              />
              {errors.reason && <small>{errors.reason}</small>}
            </label>

            <label className="gpp-upload">
              Pet image *
              <input type="file" accept="image/*" onChange={handleFileChange} />
              {errors.image && <small>{errors.image}</small>}
              {preview && (
                <img className="gpp-preview" src={preview} alt="Pet preview" />
              )}
            </label>
          </div>

          <div className="gpp-actions">
            <button
              type="button"
              className="gpp-btn ghost"
              onClick={resetForm}
              disabled={submitting}
            >
              Reset
            </button>
            <button type="submit" className="gpp-btn primary" disabled={submitting}>
              {submitting ? "Submitting..." : "Save request"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default GivePetPremiumForm;

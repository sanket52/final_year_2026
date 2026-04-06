import React, { useState, useEffect, useCallback } from "react";
import { API_BASE, getToken } from "../../utils/api";
import "./give-pet-premium.css";

const DRAFT_KEY = "pawfinds_give_pet_draft";
const STEPS = ["Owner", "Pet", "Review"];

const emptyForm = {
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

const GivePetPremiumForm = () => {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_KEY);
      if (raw) {
        const d = JSON.parse(raw);
        setForm((f) => ({ ...f, ...d.form }));
        if (d.step) setStep(d.step);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const saveDraft = useCallback(() => {
    localStorage.setItem(
      DRAFT_KEY,
      JSON.stringify({ form, step, savedAt: Date.now() })
    );
    setToast({ type: "info", text: "Draft saved on this device." });
    setTimeout(() => setToast(null), 2500);
  }, [form, step]);

  const update = (k, v) => {
    setForm((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: null }));
  };

  const onFile = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f || null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const validateStep = (s) => {
    const e = {};
    if (s === 0) {
      if (!form.ownerName.trim()) e.ownerName = "Required";
      if (!form.phone.trim()) e.phone = "Required";
      if (!form.address.trim()) e.address = "Required";
      if (!form.city.trim()) e.city = "Required";
    }
    if (s === 1) {
      if (!form.petName.trim()) e.petName = "Required";
      if (!form.petType) e.petType = "Select type";
      if (!form.age.trim()) e.age = "Required";
      if (!form.gender) e.gender = "Required";
      if (!form.vaccinated) e.vaccinated = "Required";
      if (!imageFile) e.image = "Photo required";
    }
    if (s === 2) {
      if (!form.reason.trim()) e.reason = "Please explain";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (validateStep(step)) setStep((x) => Math.min(x + 1, 2));
  };
  const back = () => setStep((x) => Math.max(x - 1, 0));

  const submit = async (e) => {
    e.preventDefault();
    if (!validateStep(2) || !validateStep(1) || !validateStep(0)) {
      setStep(0);
      return;
    }
    const token = getToken();
    if (!token) {
      setToast({ type: "err", text: "Please login first to continue." });
      return;
    }
    setSubmitting(true);
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    fd.append("image", imageFile);
    try {
      const res = await fetch(`${API_BASE}/api/give-pet`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Submit failed");
      setToast({ type: "ok", text: data.message || "Submitted successfully!" });
      localStorage.removeItem(DRAFT_KEY);
      setForm(emptyForm);
      setImageFile(null);
      setPreview("");
      setStep(0);
    } catch (err) {
      setToast({ type: "err", text: err.message });
    } finally {
      setSubmitting(false);
      setTimeout(() => setToast(null), 5000);
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
        <h2>Give a pet a new chapter</h2>
        <p>
          Premium intake form — your details are stored securely and reviewed by our team.
        </p>
      </div>

      <div className="gpp-card">
        <div className="gpp-progress">
          {STEPS.map((label, i) => (
            <div
              key={label}
              className={`gpp-step ${i === step ? "active" : ""} ${i < step ? "done" : ""}`}
            >
              <span>{i + 1}</span>
              {label}
            </div>
          ))}
        </div>

        {toast && (
          <div className={`gpp-toast gpp-toast-${toast.type}`}>{toast.text}</div>
        )}

        <form onSubmit={step === 2 ? submit : (e) => e.preventDefault()}>
          {step === 0 && (
            <div className="gpp-fields animate-in">
              <h3>Guardian details</h3>
              <label>
                Your name *
                <input
                  value={form.ownerName}
                  onChange={(e) => update("ownerName", e.target.value)}
                  className={errors.ownerName ? "invalid" : ""}
                />
                {errors.ownerName && <small>{errors.ownerName}</small>}
              </label>
              <label>
                Contact number *
                <input
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  className={errors.phone ? "invalid" : ""}
                />
              </label>
              <label>
                Address *
                <input
                  value={form.address}
                  onChange={(e) => update("address", e.target.value)}
                  className={errors.address ? "invalid" : ""}
                />
              </label>
              <label>
                City *
                <input
                  value={form.city}
                  onChange={(e) => update("city", e.target.value)}
                  className={errors.city ? "invalid" : ""}
                />
              </label>
              <label>
                Area / landmark
                <input
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                />
              </label>
            </div>
          )}

          {step === 1 && (
            <div className="gpp-fields animate-in">
              <h3>Pet profile</h3>
              <label>
                Pet name *
                <input
                  value={form.petName}
                  onChange={(e) => update("petName", e.target.value)}
                  className={errors.petName ? "invalid" : ""}
                />
              </label>
              <label>
                Type *
                <select
                  value={form.petType}
                  onChange={(e) => update("petType", e.target.value)}
                  className={errors.petType ? "invalid" : ""}
                >
                  <option value="">Select</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                  <option value="other">Other</option>
                </select>
              </label>
              <label>
                Breed
                <input value={form.breed} onChange={(e) => update("breed", e.target.value)} />
              </label>
              <label>
                Age *
                <input
                  value={form.age}
                  onChange={(e) => update("age", e.target.value)}
                  placeholder="e.g. 2 years"
                  className={errors.age ? "invalid" : ""}
                />
              </label>
              <label>
                Gender *
                <select
                  value={form.gender}
                  onChange={(e) => update("gender", e.target.value)}
                  className={errors.gender ? "invalid" : ""}
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>
              <label>
                Vaccination status *
                <select
                  value={form.vaccinated}
                  onChange={(e) => update("vaccinated", e.target.value)}
                  className={errors.vaccinated ? "invalid" : ""}
                >
                  <option value="">Select</option>
                  <option value="yes">Up to date</option>
                  <option value="partial">Partial / due soon</option>
                  <option value="no">Not vaccinated</option>
                  <option value="unknown">Unknown</option>
                </select>
              </label>
              <label>
                Health condition
                <textarea
                  rows={3}
                  value={form.health}
                  onChange={(e) => update("health", e.target.value)}
                  placeholder="Medications, allergies, mobility…"
                />
              </label>
              <label className="gpp-upload">
                Pet photo *
                <input type="file" accept="image/*" onChange={onFile} />
                {errors.image && <small>{errors.image}</small>}
                {preview && <img className="gpp-preview" src={preview} alt="" />}
              </label>
            </div>
          )}

          {step === 2 && (
            <div className="gpp-fields animate-in">
              <h3>Final step</h3>
              <label>
                Reason for rehoming *
                <textarea
                  rows={5}
                  value={form.reason}
                  onChange={(e) => update("reason", e.target.value)}
                  className={errors.reason ? "invalid" : ""}
                />
              </label>
              <div className="gpp-summary">
                <p>
                  <strong>{form.petName}</strong> · {form.petType} · {form.age}
                </p>
                <p>
                  {form.ownerName} · {form.phone} · {form.city}
                </p>
              </div>
            </div>
          )}

          <div className="gpp-actions">
            {step > 0 && (
              <button type="button" className="gpp-btn ghost" onClick={back}>
                Back
              </button>
            )}
            <button type="button" className="gpp-btn ghost" onClick={saveDraft}>
              Save draft
            </button>
            {step < 2 ? (
              <button type="button" className="gpp-btn primary" onClick={next}>
                Continue
              </button>
            ) : (
              <button type="submit" className="gpp-btn primary" disabled={submitting}>
                {submitting ? "Submitting…" : "Submit listing"}
              </button>
            )}
          </div>
        </form>
      </div>
    </section>
  );
};

export default GivePetPremiumForm;

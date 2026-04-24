import React, { useState, useCallback, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import RescueMapPicker from "./RescueMapPicker";
import { API_BASE } from "../../config/site";
import { getToken, authHeadersMultipart } from "../../utils/api";
import "./rescue.css";

const DEFAULT_POS = [28.6139, 77.209];

const AccidentRescue = () => {
  const navigate = useNavigate();
  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [description, setDescription] = useState("");
  const [phone, setPhone] = useState("");
  const [emergencyType, setEmergencyType] = useState("");
  const [manualAddress, setManualAddress] = useState("");
  const [position, setPosition] = useState(DEFAULT_POS);
  const [geoStatus, setGeoStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const [mapReady, setMapReady] = useState(false);

  useEffect(() => {
    setMapReady(true);
  }, []);

  const onImage = (e) => {
    const f = e.target.files?.[0];
    setImageFile(f || null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(f ? URL.createObjectURL(f) : "");
  };

  const detectLocation = () => {
    setGeoStatus("Locating…");
    if (!navigator.geolocation) {
      setGeoStatus("Geolocation not supported—tap map to drop pin.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
        setGeoStatus("Location captured from device.");
      },
      () => {
        setGeoStatus("Could not read GPS—tap map to set location manually.");
      },
      { enableHighAccuracy: true, timeout: 12000 }
    );
  };

  const onMapPick = useCallback((coords) => {
    setPosition(coords);
    setGeoStatus("Pin updated from map.");
  }, []);

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    if (!imageFile) {
      setError("Please upload a clear photo of the pet.");
      return;
    }
    if (!description.trim() || !phone.trim() || !emergencyType) {
      setError("Fill description, contact number, and emergency type.");
      return;
    }

    if (!getToken()) {
      navigate("/login", {
        state: {
          from: { pathname: "/accident-rescue" },
          message: "Please login first to continue.",
        },
      });
      return;
    }

    const fd = new FormData();
    fd.append("image", imageFile);
    fd.append("description", description.trim());
    fd.append("phone", phone.trim());
    fd.append("emergencyType", emergencyType);
    fd.append("lat", String(position[0]));
    fd.append("lng", String(position[1]));
    fd.append("manualAddress", manualAddress.trim());

    setSubmitting(true);
    try {
      const res = await fetch(`${API_BASE}/api/emergency/report`, {
        method: "POST",
        headers: authHeadersMultipart(),
        body: fd,
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(data.error || "Submit failed");
      }
      setMessage(
        data.message || "Our rescue team is reaching the pet location soon."
      );
      setImageFile(null);
      setPreview("");
      setDescription("");
      setPhone("");
      setEmergencyType("");
      setManualAddress("");
    } catch (err) {
      setError(err.message || "Network error—try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="rescue-page">
      <Link className="rescue-back" to="/">
        ← Home
      </Link>
      <div className="rescue-header">
        <h1>Accident &amp; emergency rescue</h1>
        <p>
          Upload evidence, share precise location, and tell us what happened. Our
          desk triages against partner ambulances and hospitals.
        </p>
      </div>

      <div className="rescue-layout">
        <form className="rescue-form" onSubmit={submit}>
          {message && <div className="rescue-alert rescue-success">{message}</div>}
          {error && <div className="rescue-alert rescue-error">{error}</div>}

          <label className="rescue-label">
            Pet photo (required)
            <input
              type="file"
              accept="image/*"
              capture="environment"
              onChange={onImage}
              required
            />
          </label>
          {preview && (
            <img className="rescue-preview" src={preview} alt="Preview" loading="lazy" />
          )}

          <label className="rescue-label">
            Emergency type
            <select
              value={emergencyType}
              onChange={(e) => setEmergencyType(e.target.value)}
              required
            >
              <option value="">Select…</option>
              <option value="injured">Injured / घायल</option>
              <option value="abandoned">Abandoned</option>
              <option value="lost">Lost pet</option>
              <option value="other">Other urgent</option>
            </select>
          </label>

          <label className="rescue-label">
            What happened?
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Road accident near landmark, bleeding leg, conscious…"
              required
            />
          </label>

          <label className="rescue-label">
            Your contact number
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="10-digit mobile"
              required
            />
          </label>

          <label className="rescue-label">
            Manual address / landmark (optional)
            <input
              type="text"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="Opposite metro pillar 42…"
            />
          </label>

          <div className="rescue-geo-row">
            <button type="button" className="rescue-btn-secondary" onClick={detectLocation}>
              Use my current location
            </button>
            {geoStatus && <span className="rescue-geo-note">{geoStatus}</span>}
          </div>

          <p className="rescue-map-hint">
            Tap the map to correct the pin if GPS is inaccurate.
          </p>

          <button type="submit" className="rescue-submit" disabled={submitting}>
            {submitting ? "Sending…" : "Submit rescue request"}
          </button>
        </form>

        <div className="rescue-map-wrap">
          {mapReady ? (
            <RescueMapPicker position={position} onPick={onMapPick} />
          ) : (
            <div
              style={{
                height: 280,
                borderRadius: 16,
                background: "#e8ecef",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#5c6478",
              }}
            >
              Loading map…
            </div>
          )}
          <p className="rescue-coords">
            Lat {position[0].toFixed(5)}, Lng {position[1].toFixed(5)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccidentRescue;

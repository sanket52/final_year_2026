import React, { useState, useEffect, useMemo, useCallback } from "react";
import FormCard from "./FormCard";
import { API_BASE, authHeaders } from "../../utils/api";

const AdoptingRequests = () => {
  const [forms, setForms] = useState([]);
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [petDetailsPopup, setPetDetailsPopup] = useState(false);
  const [selectedPet, setSelectedPet] = useState(null);
  const [selectedPetId, setSelectedPetId] = useState("");

  const fetchForms = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/api/adopt/all`, {
        headers: authHeaders(),
      });
      if (!response.ok) {
        throw new Error("Could not load adoption requests");
      }
      const data = await response.json();
      setForms(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setForms([]);
    }
  }, []);

  const fetchPets = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/approvedPets`);
      if (!response.ok) {
        throw new Error("Could not load pets");
      }
      const data = await response.json();
      setPets(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error(error);
      setPets([]);
    }
  }, []);

  const loadAll = useCallback(async () => {
    setLoading(true);
    await Promise.all([fetchForms(), fetchPets()]);
    setLoading(false);
  }, [fetchForms, fetchPets]);

  useEffect(() => {
    loadAll();
  }, [loadAll]);

  const petsById = useMemo(() => {
    const m = {};
    pets.forEach((p) => {
      if (p._id) m[String(p._id)] = p;
    });
    return m;
  }, [pets]);

  const groupedByPetId = useMemo(() => {
    const g = {};
    forms.forEach((f) => {
      const pid = String(f.petId);
      if (!g[pid]) g[pid] = [];
      g[pid].push(f);
    });
    return g;
  }, [forms]);

  const petIdsWithRequests = useMemo(
    () => Object.keys(groupedByPetId),
    [groupedByPetId]
  );

  const displayIds = selectedPetId
    ? petIdsWithRequests.filter((id) => id === selectedPetId)
    : petIdsWithRequests;

  const displayPetDetails = (pet) => {
    setSelectedPet(pet);
    setPetDetailsPopup(true);
  };

  const closePetDetailsPopup = () => {
    setPetDetailsPopup(false);
    setSelectedPet(null);
  };

  const handlePetChange = (event) => {
    setSelectedPetId(event.target.value);
  };

  return (
    <div>
      <div
        className="dropdown-container"
        style={{ textAlign: "right", marginBottom: "20px" }}
      >
        <select
          className="req-filter-selection"
          onChange={handlePetChange}
          value={selectedPetId}
        >
          <option value="">All requests</option>
          {petIdsWithRequests.map((pid) => {
            const pet = petsById[pid];
            const label = pet?.name || `Listing ${pid.slice(0, 8)}…`;
            return (
              <option key={pid} value={pid}>
                {label}
              </option>
            );
          })}
        </select>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : displayIds.length > 0 ? (
        displayIds.map((petId) => {
          const petForms = groupedByPetId[petId] || [];
          const pet = petsById[petId];
          const heading = pet?.name || `Adoption interest · ${petId}`;

          return (
            <div key={petId} className="form-container">
              <div>
                <h2
                  className={pet ? "clickable-pet-name" : ""}
                  onClick={() => pet && displayPetDetails(pet)}
                  style={pet ? {} : { cursor: "default" }}
                >
                  {heading}
                </h2>
                {!pet && (
                  <p style={{ fontSize: "0.85rem", color: "#666" }}>
                    External or API listing (no shelter pet record). Approve still clears
                    queued requests for this ID.
                  </p>
                )}
              </div>
              <div className="form-child-container">
                {petForms.map((form) => (
                  <FormCard
                    key={form._id}
                    form={form}
                    pet={pet || { name: heading, _id: petId }}
                    updateCards={loadAll}
                    deleteBtnText="Reject"
                    approveBtn
                  />
                ))}
              </div>
            </div>
          );
        })
      ) : (
        <p>No adoption requests yet.</p>
      )}

      {petDetailsPopup && selectedPet && (
        <div className="popup">
          <div className="popup-content">
            <div className="pet-view-card">
              <div className="pet-card-pic">
                <img
                  src={`${API_BASE}/images/${selectedPet.filename}`}
                  alt={selectedPet.name}
                />
              </div>
              <div className="pet-card-details">
                <h2>{selectedPet.name}</h2>
                <p>
                  <b>Type:</b> {selectedPet.type}
                </p>
                <p>
                  <b>Age:</b> {selectedPet.age}
                </p>
                <p>
                  <b>Location:</b> {selectedPet.area}
                </p>
                <p>
                  <b>Owner Email:</b> {selectedPet.email}
                </p>
                <p>
                  <b>Owner Phone:</b> {selectedPet.phone}
                </p>
                <p>
                  <b>Justification:</b> {selectedPet.justification}
                </p>
              </div>
            </div>
            <button onClick={closePetDetailsPopup} className="close-btn">
              Close <i className="fa fa-times" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdoptingRequests;

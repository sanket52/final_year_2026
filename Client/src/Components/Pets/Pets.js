import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { fetchPublicPets } from "../../services/petPublicApi";
import "./pets-api.css";

const Pets = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [pets, setPets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [source, setSource] = useState("");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchPublicPets();
        if (!cancelled) {
          setPets(data);
          setSource("live");
        }
      } catch (e) {
        if (!cancelled) {
          setError(e.message || "Could not load pets.");
          setSource("error");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = useMemo(() => {
    if (filter === "all") return pets;
    return pets.filter((p) => p.species === filter);
  }, [pets, filter]);

  const requestAdoption = (pet) => {
    if (!user) {
      navigate("/login", {
        state: {
          from: { pathname: "/adopt-form", state: { pet } },
          message: "Please login first to continue.",
        },
      });
      return;
    }
    navigate("/adopt-form", { state: { pet } });
  };

  return (
    <div className="pets-api-page">
      <section className="pets-api-hero">
        <h1>Discover dogs &amp; cats</h1>
        <p>
          Profiles combine <strong>The Dog API</strong> and{" "}
          <strong>The Cat API</strong> when API keys are set in{" "}
          <code>.env</code>; otherwise we show curated fallback pets.
        </p>
        {source === "live" && (
          <span className="pets-api-badge">Live breed data</span>
        )}
        {error && <p className="pets-api-warn">{error}</p>}
      </section>

      <div className="pets-api-toolbar">
        <label htmlFor="species-filter">Species</label>
        <select
          id="species-filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="dog">Dogs</option>
          <option value="cat">Cats</option>
        </select>
      </div>

      {loading ? (
        <p className="pets-api-loading">Loading adorable profiles…</p>
      ) : (
        <div className="pets-api-grid">
          {filtered.map((pet) => (
            <article key={pet.id} className="pets-api-card">
              <div className="pets-api-img-wrap">
                <img
                  src={pet.imageUrl}
                  alt={pet.breed}
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.target.src =
                      "https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=500&q=80";
                  }}
                />
                <span className="pets-api-species">
                  {pet.species === "dog" ? "Dog" : "Cat"}
                </span>
              </div>
              <div className="pets-api-body">
                <h2>{pet.breed}</h2>
                <p>
                  <strong>Temperament:</strong> {pet.temperament}
                </p>
                <p>
                  <strong>Life span:</strong> {pet.lifeSpan}
                </p>
                <p>
                  <strong>Origin:</strong> {pet.origin}
                </p>
                <p>
                  <strong>Size:</strong> {pet.size}
                </p>
                <button
                  type="button"
                  className="pets-api-adopt-btn"
                  onClick={() => requestAdoption(pet)}
                >
                  Request adoption
                </button>
              </div>
            </article>
          ))}
        </div>
      )}

      {!loading && filtered.length === 0 && (
        <p className="pets-api-empty">No pets match this filter.</p>
      )}
    </div>
  );
};

export default Pets;

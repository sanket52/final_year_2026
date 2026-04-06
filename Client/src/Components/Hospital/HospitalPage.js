import React from "react";
import { Link } from "react-router-dom";
import { NEARBY_HOSPITALS } from "../../data/hospitals";
import { SITE } from "../../config/site";
import "./hospital.css";

const HospitalPage = () => {
  return (
    <div className="hospital-page">
      <section className="hospital-hero">
        <img
          src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?auto=format&fit=crop&w=1400&q=80"
          alt=""
          loading="lazy"
        />
        <div>
          <h1>Nearby pet hospitals</h1>
          <p>
            Emergency timing, vet availability, and one-tap maps. For
            life-threatening cases call <a href={SITE.phoneTel}>+91 {SITE.phone}</a>{" "}
            while you travel.
          </p>
        </div>
      </section>

      <div className="hospital-grid">
        {NEARBY_HOSPITALS.map((h) => (
          <article key={h.id} className="hospital-card">
            <img src={h.image} alt={h.name} loading="lazy" />
            <div className="hospital-card-body">
              <h2>{h.name}</h2>
              <p className="hospital-addr">{h.address}</p>
              <p className="hospital-meta">
                <strong>Emergency / hours:</strong> {h.hours}
              </p>
              <p className="hospital-meta">
                <strong>Vet coverage:</strong> {h.vetsOnDuty}
              </p>
              <p className="hospital-meta">
                <strong>Phone:</strong>{" "}
                <a href={`tel:+91${SITE.phone}`}>{h.phoneDisplay}</a>
              </p>
              <div className="hospital-actions">
                <a
                  className="hospital-btn primary"
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in Maps
                </a>
                <a className="hospital-btn ghost" href={`tel:+91${SITE.phone}`}>
                  Call desk
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>

      <p className="hospital-footnote">
        Partner roster curated by {SITE.team[0].name} &amp; {SITE.team[1].name}.
        Always phone ahead for ICU bed confirmation.
      </p>
      <div style={{ textAlign: "center", marginBottom: 48 }}>
        <Link to="/contact" className="hospital-btn ghost">
          Partner with PawFinds
        </Link>
      </div>
    </div>
  );
};

export default HospitalPage;

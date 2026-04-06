import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../../config/site";
import "./take-care.css";

const blocks = [
  {
    title: "Boarding",
    icon: "fa-bed",
    text: "Suite-style rooms, twice-daily enrichment, and photo updates for anxious paw-rents.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Pet sitting",
    icon: "fa-home",
    text: "Trusted sitters for cats, small mammals, and seniors who prefer staying home.",
    img: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Grooming",
    icon: "fa-scissors",
    text: "Hydraulic tubs, hypoallergenic shampoos, and fear-free handling certifications.",
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Nutrition & food",
    icon: "fa-shopping-basket",
    text: "Prescription diets, cold-chain raw options, and monthly subscription boxes.",
    img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Training",
    icon: "fa-graduation-cap",
    text: "Positive reinforcement classes for leash reactivity, recall, and new rescues.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Day care",
    icon: "fa-sun-o",
    text: "Separated play by size/temperament with mandatory rest cycles and hydration checks.",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=700&q=80",
  },
  {
    title: "Vaccination reminders",
    icon: "fa-calendar",
    text: "SMS + WhatsApp nudges synced to your vet records so boosters never slip.",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=700&q=80",
  },
];

const TakeCarePage = () => {
  return (
    <div className="take-care-page">
      <section className="take-hero">
        <div>
          <h1>Pet care house &amp; care center</h1>
          <p>
            Everything between adoption day and golden years—managed by specialists
            who report to {SITE.team[0].name} &amp; {SITE.team[1].name}.
          </p>
          <a className="take-cta" href={SITE.phoneTel}>
            Call +91 {SITE.phone}
          </a>
        </div>
        <img
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=900&q=80"
          alt="Pets at care center"
          loading="lazy"
        />
      </section>

      <div className="take-grid">
        {blocks.map((b) => (
          <article key={b.title} className="take-card">
            <img src={b.img} alt="" loading="lazy" />
            <div className="take-card-body">
              <div className="take-icon">
                <i className={`fa ${b.icon}`} aria-hidden="true" />
              </div>
              <h2>{b.title}</h2>
              <p>{b.text}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="take-cta-band">
        <h2>Need a custom care plan?</h2>
        <p>We bundle boarding + grooming + transport for multi-pet homes.</p>
        <Link to="/contact">Book a consult</Link>
      </section>
    </div>
  );
};

export default TakeCarePage;

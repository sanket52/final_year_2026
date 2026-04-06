import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./pet-care.css";

const topics = [
  {
    title: "Feeding guide",
    icon: "fa-cutlery",
    text: "Split meals for adults, puppy/kitten frequency charts, and safe human foods.",
    img: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Vaccination",
    icon: "fa-medkit",
    text: "Core vs non-core vaccines, titre testing basics, and travel paperwork.",
    img: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Grooming",
    icon: "fa-scissors",
    text: "Coat-type brushing cadence, nail trims, and ear cleaning safety.",
    img: "https://images.unsplash.com/photo-1516734212186-a967f81ad0d7?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Walking & exercise",
    icon: "fa-paw",
    text: "Sniffari walks, heat-index cutoffs, and joint care for large breeds.",
    img: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Health checkups",
    icon: "fa-stethoscope",
    text: "What annual exams cover, dental scoring, and senior blood panels.",
    img: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Emergency symptoms",
    icon: "fa-exclamation-triangle",
    text: "Non-negotiable ER signs: bloat posture, non-stop seizures, heatstroke.",
    img: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=600&q=80",
  },
  {
    title: "Seasonal care",
    icon: "fa-sun-o",
    text: "Monsoon paw rinses, winter sweater myths, and festival noise prep.",
    img: "https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?auto=format&fit=crop&w=600&q=80",
  },
];

const faqItems = [
  {
    q: "How fast should I switch kibble after adoption?",
    a: "Transition over 7–10 days: 25% new food every couple of days while watching stool quality.",
  },
  {
    q: "Do indoor cats still need parasite prevention?",
    a: "Yes—fleas ride on humans and dogs; discuss indoor-appropriate protocols with your vet.",
  },
  {
    q: "When is panting abnormal?",
    a: "If panting happens at rest in a cool room, sounds harsh, or comes with blue gums, seek emergency care.",
  },
  {
    q: "How do I prep for Diwali noise?",
    a: "Walk before dusk, create a padded safe room, use white noise, and ask your vet about calming aids early.",
  },
];

const PetCareHub = () => {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="care-page care-hub-v2">
      <section className="care-hub-intro">
        <h1>Pet care library</h1>
        <p>
          Static, vet-reviewed summaries—no distracting motion. Deep dives also
          live in our focused guides below.
        </p>
        <div className="care-hub-links">
          <Link to="/pet-care/vet-hospitals">Vet &amp; hospitals</Link>
          <Link to="/pet-care/first-aid">First aid</Link>
          <Link to="/pet-care/nutrition">Nutrition</Link>
        </div>
      </section>

      <div className="care-static-grid">
        {topics.map((t) => (
          <article key={t.title} className="care-static-card">
            <img src={t.img} alt="" loading="lazy" />
            <div className="care-static-body">
              <div className="care-static-icon">
                <i className={`fa ${t.icon}`} aria-hidden="true" />
              </div>
              <h2>{t.title}</h2>
              <p>{t.text}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="care-faq">
        <h2>Frequently asked questions</h2>
        <div className="care-faq-list">
          {faqItems.map((item, i) => (
            <div key={item.q} className="care-faq-item">
              <button
                type="button"
                className="care-faq-q"
                aria-expanded={openFaq === i}
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
              >
                {item.q}
                <span className="care-faq-chevron">
                  {openFaq === i ? "−" : "+"}
                </span>
              </button>
              {openFaq === i && <p className="care-faq-a">{item.a}</p>}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PetCareHub;

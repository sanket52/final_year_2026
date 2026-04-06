import React from "react";
import { Link } from "react-router-dom";

const hero =
  "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=1200&q=80";

const FirstAid = () => {
  return (
    <div className="care-page">
      <Link className="care-back" to="/pet-care">
        ← Back to Pet Care
      </Link>
      <article className="care-article">
        <div className="care-article-hero">
          <img src={hero} alt="Dog outdoors with owner" loading="lazy" />
        </div>
        <h1>Early first aid basics</h1>
        <p>
          Stay calm, keep your pet safe, and contact or travel to a vet when in
          doubt. These tips are educational only.
        </p>

        <h2>Heat & breathing</h2>
        <ul>
          <li>Move to shade or air-conditioning; offer small sips of cool water.</li>
          <li>
            Wet paws and ears with cool (not ice-cold) water; avoid ice baths.
          </li>
          <li>
            Heavy panting, purple gums, or collapse = <strong>emergency</strong>.
          </li>
        </ul>

        <h2>Minor cuts or scrapes</h2>
        <ul>
          <li>Apply gentle pressure with clean gauze if bleeding is steady.</li>
          <li>Rinse with saline or clean water; don&apos;t use human creams unless your vet approves.</li>
          <li>Deep wounds, punctures, or bites need same-day veterinary care.</li>
        </ul>

        <h2>Upset stomach</h2>
        <ul>
          <li>Withhold food briefly only if your vet has advised this pattern before.</li>
          <li>Keep water available unless vomiting is constant—then call the clinic.</li>
          <li>Blood in vomit or stool, or lethargy, means call immediately.</li>
        </ul>

        <h2>Poison or unknown ingestion</h2>
        <p>
          Do not induce vomiting unless a professional tells you to. Have the
          package or plant sample ready and phone your vet or a pet poison
          helpline right away.
        </p>

        <div className="care-disclaimer">
          This is not medical advice. In any emergency, contact your
          veterinarian or the nearest emergency animal hospital.
        </div>
      </article>
    </div>
  );
};

export default FirstAid;

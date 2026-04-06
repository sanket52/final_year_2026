import React from "react";
import { Link } from "react-router-dom";

const CareHomeStrip = () => {
  return (
    <section className="care-home-strip" aria-labelledby="care-strip-heading">
      <div>
        <h2 id="care-strip-heading">New: pet health & wellness guides</h2>
        <p>
          Explore vet visit tips, gentle first-aid basics, and nutrition ideas
          with fresh imagery—all in one place.
        </p>
      </div>
      <Link to="/pet-care">Explore Pet Care</Link>
    </section>
  );
};

export default CareHomeStrip;

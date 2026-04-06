import React from "react";
import { Link } from "react-router-dom";

const hero =
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=1200&q=80";

const VetHospitals = () => {
  return (
    <div className="care-page">
      <Link className="care-back" to="/pet-care">
        ← Back to Pet Care
      </Link>
      <article className="care-article">
        <div className="care-article-hero">
          <img src={hero} alt="Veterinarian examining a pet" loading="lazy" />
        </div>
        <h1>Veterinarians & hospitals</h1>
        <p>
          A good vet relationship is one of the best gifts you can give your
          pet. Use this page as a practical checklist—not a substitute for
          professional diagnosis or treatment.
        </p>

        <h2>Choosing a clinic</h2>
        <ul>
          <li>Look for clear emergency hours and after-hours referrals.</li>
          <li>Ask how they handle fear-free handling and pain management.</li>
          <li>Confirm they see your species regularly (exotic pets need specialists).</li>
        </ul>

        <h2>Routine visits</h2>
        <ul>
          <li>
            <strong>Puppies & kittens:</strong> vaccination and parasite plans
            are usually monthly at first.
          </li>
          <li>
            <strong>Adults:</strong> annual wellness exams; dental checks as
            recommended.
          </li>
          <li>
            <strong>Seniors:</strong> often benefit from twice-yearly visits and
            lab work your vet suggests.
          </li>
        </ul>

        <h2>What to bring</h2>
        <ul>
          <li>Previous medical records and a list of current foods and treats.</li>
          <li>Any medications or supplements, in their original packaging.</li>
          <li>Notes on behaviour changes, appetite, thirst, or litter habits.</li>
        </ul>

        <div className="care-disclaimer">
          PawFinds does not endorse specific hospitals. Always follow your
          veterinarian&apos;s advice for your individual pet.
        </div>
      </article>
    </div>
  );
};

export default VetHospitals;

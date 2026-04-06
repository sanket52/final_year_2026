import React from "react";
import { Link } from "react-router-dom";

const hero =
  "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?auto=format&fit=crop&w=1200&q=80";

const PetDiet = () => {
  return (
    <div className="care-page">
      <Link className="care-back" to="/pet-care">
        ← Back to Pet Care
      </Link>
      <article className="care-article">
        <div className="care-article-hero">
          <img src={hero} alt="Healthy pet food ingredients" loading="lazy" />
        </div>
        <h1>Nutrition & everyday diet</h1>
        <p>
          Good food supports energy, coat, digestion, and long-term health.
          Portion sizes and formulas differ by species, age, and medical
          needs—your vet can personalize a plan.
        </p>

        <h2>Core habits</h2>
        <ul>
          <li>Measure meals instead of free-pouring kibble.</li>
          <li>Fresh, clean water always; wash bowls daily.</li>
          <li>Introduce new foods slowly over several days.</li>
        </ul>

        <h2>Dogs</h2>
        <ul>
          <li>Complete commercial diets labeled for the dog&apos;s life stage are a solid baseline.</li>
          <li>Limit human table scraps; many seasonings and fats cause pancreatitis.</li>
          <li>Chocolate, grapes, onions, and xylitol are toxic—keep them out of reach.</li>
        </ul>

        <h2>Cats</h2>
        <ul>
          <li>Cats need animal-based protein and specific amino acids like taurine.</li>
          <li>Wet food can help hydration; discuss dental care with your vet.</li>
          <li>Milk often upsets adult cats; fresh water is best.</li>
        </ul>

        <h2>Small mammals & birds</h2>
        <p>
          Rabbits, guinea pigs, and birds have specialized needs (hay, vitamin C,
          pellets, or species-appropriate produce). Use guides from your
          veterinarian or certified exotic specialists—not generic dog food.
        </p>

        <div className="care-disclaimer">
          Adjust calories if your pet gains or loses weight unexpectedly, and
          schedule a vet visit for persistent appetite changes.
        </div>
      </article>
    </div>
  );
};

export default PetDiet;

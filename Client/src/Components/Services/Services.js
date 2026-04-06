import React from "react";
import AdoptSection from "./AdoptSection";
import GivePetPremiumForm from "./GivePetPremiumForm";

const Services = () => {
  return (
    <div className="main-container services-premium-layout">
      <div className="adopt-pet">
        <AdoptSection />
      </div>
      <div className="post-pet post-pet-full">
        <GivePetPremiumForm />
      </div>
    </div>
  );
};

export default Services

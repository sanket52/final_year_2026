export const SITE = {
  name: "PawFinds",
  tagline: "Rescue · Adopt · Care",
  team: [
    { name: "Sanket", role: "Co-founder & Operations" },
    { name: "Abhishek", role: "Co-founder & Care Programs" },
  ],
  email: "sanketbhardwaj413@gmail.com",
  phone: "7500790387",
  phoneTel: "tel:+917500790387",
  social: {
    instagram: "https://instagram.com",
    twitter: "https://twitter.com",
    facebook: "https://facebook.com",
  },
};

const rawApiBase =
  process.env.REACT_APP_API_URL ||
  (typeof window !== "undefined" &&
  /localhost|127\.0\.0\.1/.test(window.location.hostname)
    ? "http://localhost:4000"
    : "https://final-year-2026-3.onrender.com");

export const API_BASE = rawApiBase.replace(/\/+$/, "");

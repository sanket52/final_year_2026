import React from "react";
import { Link } from "react-router-dom";
import { SITE } from "../../config/site";
import { useInView } from "../../hooks/useInView";
import { NEARBY_HOSPITALS } from "../../data/hospitals";
import "./landing.css";

function SectionReveal({ children, className = "" }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`lp-reveal ${visible ? "lp-visible" : ""} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

const img1 =
  "https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&w=700&q=80";
const img2 =
  "https://images.unsplash.com/photo-1513245543132-31f507179b6a?auto=format&fit=crop&w=600&q=80";
const img3 =
  "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=600&q=80";

const services = [
  {
    title: "Rescue & emergency",
    text: "24×7 intake coordination for injured, abandoned, and lost animals.",
    icon: "fa-bolt",
  },
  {
    title: "Adoption matching",
    text: "Thoughtful pairing so every pet lands in a home that fits their needs.",
    icon: "fa-heart",
  },
  {
    title: "Vet network",
    text: "Partner hospitals with transparent hours, pricing guidance, and triage.",
    icon: "fa-stethoscope",
  },
  {
    title: "Care centers",
    text: "Boarding, grooming, daycare, and training under one trusted roof.",
    icon: "fa-home",
  },
  {
    title: "Nutrition coaching",
    text: "Life-stage feeding plans and treat guidelines from our care team.",
    icon: "fa-leaf",
  },
  {
    title: "Community education",
    text: "Workshops on first aid, seasonal safety, and responsible guardianship.",
    icon: "fa-users",
  },
];

const tips = [
  {
    title: "Daily rhythm",
    text: "Consistent walks, play, and sleep windows reduce anxiety in new rescues.",
  },
  {
    title: "Hydration",
    text: "Multiple water stations indoors; refresh bowls after every walk in heat.",
  },
  {
    title: "Microchip + ID",
    text: "Register your chip the week adoption finalizes—recovery odds jump sharply.",
  },
  {
    title: "Parasite prevention",
    text: "Keep flea/tick and deworming calendars synced with your vet’s protocol.",
  },
];

const LandingPage = () => {
  return (
    <div className="landing-root">
      <section className="lp-hero" id="top">
        <div className="lp-hero-bg" aria-hidden="true" />
        <div className="lp-hero-content">
          <p
            style={{
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              fontSize: "0.78rem",
              color: "#ff6b4a",
              fontWeight: 700,
              marginBottom: 12,
            }}
          >
            {SITE.tagline}
          </p>
          <h1>
            Premium care for pets who deserve a second chance.
          </h1>
          <p className="lp-hero-lead">
            PawFinds unites rescue response, ethical adoption, veterinary access,
            and everyday wellness—built by {SITE.team.map((t) => t.name).join(" & ")} for families across India.
          </p>
          <div className="lp-hero-actions">
            <Link className="lp-btn lp-btn-primary" to="/pets">
              Meet adoptable breeds
            </Link>
            <Link className="lp-btn lp-btn-ghost" to="/accident-rescue">
              Report emergency
            </Link>
            <Link className="lp-btn lp-btn-ghost" to="/contact">
              Talk to us
            </Link>
          </div>
        </div>
        <div className="lp-hero-collage">
          <img className="lp-hc-1" src={img1} alt="Happy dog" loading="eager" />
          <img className="lp-hc-2" src={img2} alt="Cat portrait" loading="lazy" />
          <img className="lp-hc-3" src={img3} alt="Pet with family" loading="lazy" />
        </div>
      </section>

      <SectionReveal>
        <section className="landing-section" id="services">
          <h2 className="landing-section-title">What we do</h2>
          <p className="landing-section-sub">
            One platform spanning the full lifecycle—from crisis response to
            years of joyful companionship.
          </p>
          <div className="lp-grid-3">
            {services.map((s) => (
              <div key={s.title} className="lp-card-pro">
                <div className="lp-icon-row">
                  <i className={`fa ${s.icon}`} aria-hidden="true" />
                </div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="landing-section" id="adoption">
          <h2 className="landing-section-title">Adoption that feels human</h2>
          <p className="landing-section-sub">
            Browse curated dog and cat profiles powered by global breed APIs,
            with warm photography and transparent temperament notes.
          </p>
          <div className="lp-grid-2">
            <div className="lp-card-pro">
              <img
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&w=800&q=80"
                alt="Rescue dog"
                loading="lazy"
              />
              <h3>Ready-to-adopt gallery</h3>
              <p>
                Filter by species, compare life span and origin insights, and
                plan your first vet visit before you even apply.
              </p>
              <Link className="lp-btn lp-btn-primary" style={{ marginTop: 16 }} to="/pets">
                Open pet gallery
              </Link>
            </div>
            <div className="lp-card-pro">
              <img
                src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80"
                alt="Cat relaxing"
                loading="lazy"
              />
              <h3>List a pet responsibly</h3>
              <p>
                Surrendering or fostering? Submit structured profiles so our team
                can screen and match quickly.
              </p>
              <Link className="lp-btn lp-btn-ghost" style={{ marginTop: 16 }} to="/services">
                Give a pet for adoption
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="landing-section" id="tips">
          <h2 className="landing-section-title">Pet care tips</h2>
          <p className="landing-section-sub">
            Micro-habits that keep tails wagging—drawn from our field partners and
            veterinary advisors.
          </p>
          <div className="lp-grid-3">
            {tips.map((t) => (
              <div key={t.title} className="lp-card-pro">
                <h3>{t.title}</h3>
                <p>{t.text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 28, textAlign: "center" }}>
            <Link className="lp-btn lp-btn-ghost" to="/pet-care">
              Full pet care library
            </Link>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="landing-section" id="hospitals-preview">
          <h2 className="landing-section-title">Nearby pet hospitals</h2>
          <p className="landing-section-sub">
            Verified-style partner clinics with emergency coverage, transparent
            vet rosters, and map-ready addresses.
          </p>
          <div className="lp-grid-3">
            {NEARBY_HOSPITALS.map((h) => (
              <div key={h.id} className="lp-card-pro">
                <img src={h.image} alt={h.name} loading="lazy" />
                <h3>{h.name}</h3>
                <p style={{ fontSize: "0.88rem" }}>{h.address}</p>
                <p style={{ fontSize: "0.88rem", marginTop: 8 }}>
                  <strong>{h.hours}</strong>
                </p>
                <a
                  className="lp-btn lp-btn-primary"
                  style={{ marginTop: 14, display: "inline-flex" }}
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(h.mapQuery)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open map
                </a>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link className="lp-btn lp-btn-ghost" to="/hospital">
              View hospital directory
            </Link>
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="landing-section" id="take-care-preview">
          <h2 className="landing-section-title">Pet care house & centers</h2>
          <p className="landing-section-sub">
            Boarding suites, spa grooming, enrichment daycare, and positive
            reinforcement training—scheduled in one place.
          </p>
          <div className="lp-grid-3">
            {[
              ["Boarding", "Climate-controlled suites with webcam check-ins."],
              ["Grooming", "Breed-specific cuts, dental wipes, and skin-safe baths."],
              ["Daycare", "Small play pods supervised by certified handlers."],
            ].map(([title, text]) => (
              <div key={title} className="lp-card-pro">
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24, textAlign: "center" }}>
            <Link className="lp-btn lp-btn-primary" to="/take-care">
              Explore Take Care services
            </Link>
          </div>
        </section>
      </SectionReveal>

      <div className="lp-band" id="rescue-cta">
        <h2>Accident on the road? Lost pet in distress?</h2>
        <p>
          Upload a photo, share GPS coordinates, and alert our rescue desk. We
          coordinate with the nearest mobile unit and hospital partner.
        </p>
        <Link
          className="lp-btn lp-btn-primary"
          to="/accident-rescue"
          style={{ background: "#fff", color: "#0d5c63" }}
        >
          Launch rescue form
        </Link>
      </div>

      <SectionReveal>
        <section className="landing-section" id="about">
          <h2 className="landing-section-title">Built by people who show up</h2>
          <p className="landing-section-sub">
            PawFinds is led by {SITE.team[0].name} and {SITE.team[1].name}, combining
            boots-on-the-ground rescue ops with product craft focused on trust.
          </p>
          <div className="lp-team">
            {SITE.team.map((m) => (
              <div key={m.name} className="lp-team-card">
                <strong>{m.name}</strong>
                <span style={{ color: "#5c6478", fontSize: "0.9rem" }}>
                  {m.role}
                </span>
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="landing-section" id="testimonials">
          <h2 className="landing-section-title">Stories from the community</h2>
          <div className="lp-grid-3">
            {[
              [
                "They reached our indie pup in 22 minutes after the highway rescue form. Transparent updates the whole night.",
                "— Aditi & Rahul, Noida",
              ],
              [
                "The care center groomers caught an ear infection early and booked us with their vet the same afternoon.",
                "— Meera K., Delhi",
              ],
              [
                "Adoption counselling felt honest—no pressure, just clarity on exercise needs for our apartment.",
                "— Farhan S., Ghaziabad",
              ],
            ].map(([q, a]) => (
              <div key={a} className="lp-quote">
                <p>{q}</p>
                <span>{a}</span>
              </div>
            ))}
          </div>
        </section>
      </SectionReveal>

      <SectionReveal>
        <section className="landing-section" id="contact">
          <h2 className="landing-section-title">Contact PawFinds</h2>
          <p className="landing-section-sub">
            Partnerships, adoption paperwork, or emergency escalations—choose
            the channel that fits.
          </p>
          <div className="lp-contact-strip">
            <div className="lp-contact-item">
              <h3 style={{ marginBottom: 10, color: "#084149" }}>Email</h3>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </div>
            <div className="lp-contact-item">
              <h3 style={{ marginBottom: 10, color: "#084149" }}>Phone</h3>
              <a href={SITE.phoneTel}>+91 {SITE.phone}</a>
            </div>
            <div className="lp-contact-item">
              <h3 style={{ marginBottom: 10, color: "#084149" }}>Visit</h3>
              <p style={{ color: "#5c6478", lineHeight: 1.5 }}>
                Schedule-only meetups across NCR. Book via phone or email.
              </p>
              <Link className="lp-btn lp-btn-ghost" style={{ marginTop: 12 }} to="/contact">
                Full contact page
              </Link>
            </div>
          </div>
        </section>
      </SectionReveal>
    </div>
  );
};

export default LandingPage;

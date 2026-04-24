import React from "react";
import { SITE } from "../../config/site";
import "./contact.css";

const Contact = () => {
  return (
    <div className="contact-premium">
      <section className="contact-hero">
        <img
          src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?auto=format&fit=crop&w=1200&q=80"
          alt="PawFinds support team"
          loading="lazy"
        />
        <div>
          <h1>Let&apos;s talk</h1>
          <p>
            Reach {SITE.team[0].name} &amp; {SITE.team[1].name} for partnerships,
            adoption support, or emergency coordination.
          </p>
          <div className="contact-hero-actions">
            <a className="contact-hero-btn primary" href={SITE.phoneTel}>
              Call now
            </a>
            <a className="contact-hero-btn" href={`mailto:${SITE.email}`}>
              Send email
            </a>
          </div>
        </div>
      </section>

      <div className="contact-cards">
        <a className="contact-card" href={`mailto:${SITE.email}`}>
          <i className="fa fa-envelope" aria-hidden="true" />
          <h2>Email</h2>
          <p>{SITE.email}</p>
        </a>
        <a className="contact-card" href={SITE.phoneTel}>
          <i className="fa fa-phone" aria-hidden="true" />
          <h2>Phone</h2>
          <p>+91 {SITE.phone}</p>
        </a>
        <a
          className="contact-card"
          href={SITE.social.instagram}
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fa fa-instagram" aria-hidden="true" />
          <h2>Instagram</h2>
          <p>Follow updates</p>
        </a>
      </div>

      <div className="contact-bottom-grid">
        <section className="contact-note">
          <h2>Office hours</h2>
          <p>
            Rescue desk: 24x7 hotline via phone. Admin and adoption counselling:
            10:00 - 19:00 IST, Monday to Saturday.
          </p>
        </section>
        <section className="contact-note accent">
          <h2>Best way to reach us</h2>
          <p>
            Emergency rescue requests are fastest by phone. For adoption support
            or giving a pet for adoption, call or email and our team will get
            back to you quickly.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Contact;

import React from "react";
import { Link } from "react-router-dom";
import logo from "./images/logo.png";
import { SITE } from "../../config/site";

const Footer = (props) => {
  return (
    <footer className="pf-footer">
      <div className="pf-footer-banner">
        <img
          src="https://images.unsplash.com/photo-1450778869180-41d0601e046e?auto=format&fit=crop&w=1600&q=80"
          alt=""
          className="pf-footer-banner-img"
          loading="lazy"
        />
        <div className="pf-footer-banner-text">
          <p>Every rescue deserves dignity.</p>
          <Link className="pf-footer-banner-btn" to="/accident-rescue">
            Report an emergency
          </Link>
        </div>
      </div>

      <div className="pf-footer-main">
        <div className="pf-footer-col">
          <Link className="pf-logo-block pf-footer-logo" to="/">
            <img className="pf-logo-img" src={logo} alt="" />
            <span className="pf-logo-text">{props.title}</span>
          </Link>
          <p className="pf-footer-about">
            Premium pet rescue, adoption, and wellness—crafted by{" "}
            {SITE.team.map((t) => t.name).join(" & ")}.
          </p>
        </div>

        <div className="pf-footer-col">
          <h4>Explore</h4>
          <Link to="/pets">Pets</Link>
          <Link to="/pet-care">Pet Care</Link>
          <Link to="/hospital">Hospital</Link>
          <Link to="/take-care">Take Care</Link>
          <Link to="/accident-rescue">Accident Rescue</Link>
        </div>

        <div className="pf-footer-col">
          <h4>Contact</h4>
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
          <a href={SITE.phoneTel}>+91 {SITE.phone}</a>
          <Link to="/contact">Contact page</Link>
        </div>

        <div className="pf-footer-col">
          <h4>Social</h4>
          <a href={SITE.social.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SITE.social.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href={SITE.social.twitter} target="_blank" rel="noopener noreferrer">
            X / Twitter
          </a>
        </div>
      </div>

      <div className="pf-footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} {SITE.name} · {SITE.team[0].name} &amp;{" "}
          {SITE.team[1].name}
        </p>
      </div>
    </footer>
  );
};

export default Footer;

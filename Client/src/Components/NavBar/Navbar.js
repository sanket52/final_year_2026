import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "./images/logo.png";
import { SITE } from "../../config/site";
import { useAuth } from "../../context/AuthContext";

const linkStyle = ({ isActive }) =>
  isActive ? "pf-nav-link pf-nav-link-active" : "pf-nav-link";

const Navbar = (props) => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);

  const closeMobile = () => setOpen(false);

  return (
    <header className="pf-navbar">
      <div className="pf-navbar-inner">
        <Link className="pf-logo-block" to="/" onClick={closeMobile}>
          <img className="pf-logo-img" src={logo} alt="" />
          <span className="pf-logo-text">{props.title}</span>
        </Link>

        <button
          type="button"
          className="pf-nav-toggle"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`pf-nav-links${open ? " pf-nav-open" : ""}`}>
          <NavLink className={linkStyle} to="/" end onClick={closeMobile}>
            Home
          </NavLink>
          <NavLink className={linkStyle} to="/pets" onClick={closeMobile}>
            Pets
          </NavLink>
          <NavLink className={linkStyle} to="/pet-care" onClick={closeMobile}>
            Pet Care
          </NavLink>
          <NavLink className={linkStyle} to="/hospital" onClick={closeMobile}>
            Hospital
          </NavLink>
          <NavLink className={linkStyle} to="/take-care" onClick={closeMobile}>
            Take Care
          </NavLink>
          <NavLink
            className={linkStyle}
            to="/accident-rescue"
            onClick={closeMobile}
          >
            Accident Rescue
          </NavLink>
          <div
            className="pf-contact-dropdown-wrap"
            onMouseEnter={() => setContactOpen(true)}
            onMouseLeave={() => setContactOpen(false)}
          >
            <button
              type="button"
              className={`pf-nav-link pf-contact-trigger ${contactOpen ? "pf-nav-link-active" : ""}`}
              aria-expanded={contactOpen}
              onClick={() => setContactOpen((c) => !c)}
            >
              Contact ▾
            </button>
            <div
              className={`pf-contact-dropdown${contactOpen ? " pf-show" : ""}`}
            >
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <a href={SITE.phoneTel}>+91 {SITE.phone}</a>
              <Link to="/contact" onClick={closeMobile}>
                Contact page
              </Link>
            </div>
          </div>
        </nav>

        <div className="pf-nav-cta pf-nav-auth">
          {user ? (
            <>
              <Link className="pf-nav-link" to="/dashboard" onClick={closeMobile}>
                Dashboard
              </Link>
              {user.role === "admin" && (
                <Link className="pf-nav-link" to="/admin" onClick={closeMobile}>
                  Admin
                </Link>
              )}
              <button
                type="button"
                className="pf-btn-give pf-btn-ghost"
                onClick={() => {
                  logout();
                  closeMobile();
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="pf-nav-link" to="/login" onClick={closeMobile}>
                Login
              </Link>
              <Link className="pf-nav-link" to="/signup" onClick={closeMobile}>
                Sign up
              </Link>
            </>
          )}
          <Link className="pf-btn-give" to="/services" onClick={closeMobile}>
            Give a Pet
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

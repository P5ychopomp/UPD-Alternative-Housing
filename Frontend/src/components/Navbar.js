import React, { useState } from "react";
import Link from "next/link";
import { Image } from "@chakra-ui/react";
import { Image as NextImage } from 'next/image'
import "./styles/Navbar.module.css";

function Navbar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          <Link href="/">
            <Image
              as={NextImage}
              className="navbar-logo"
              src="/USC-Logo2.png"
              alt="USC Logo"
              height="5em"
            />
          </Link>
          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>
          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <Link href="/" className="nav-links" onClick={closeMobileMenu}>
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                href="/About"
                className="nav-links"
                onClick={closeMobileMenu}
              >
                About Us
              </Link>
            </li>

            <li className="nav-item">
              <Link href="/Faqs" className="nav-links" onClick={closeMobileMenu}>
                FAQs
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Navbar;

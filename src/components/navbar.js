import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [menuVisible, setMenuVisible] = useState(false);
  const [showList, setShowList] = useState(true);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  useEffect(() => {
    const handleResize = () => {
      setShowList(window.innerWidth >= 768);
      setMenuVisible(false);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <nav className="navbar">
      <p className="m-0 px-3 py-1 font-weight-bold fs-5" id="greeting">Welcome</p>
      {showList ? (
        <ul className="" id="nav-list">
          <li className="nav-item">
            <a href="#portfolio" className="nav-link">Portfolio</a>
          </li>
          <li className="nav-item">
            <a href="#about" className="nav-link">About</a>
          </li>
          <li className="nav-item">
            <a href="#contact" className="nav-link">Contact</a>
          </li>
        </ul>
      ) : (
        <button
          type="submit"
          className="navbar-toggler mr-2"
          onClick={toggleMenu}
          aria-label="Toggle navigation"

        >
          <span
            className="navbar-toggler-icon"
            aria-label="Toggle navigation"
          />

        </button>
      )}

      {menuVisible && (
        <div className="popup-menu">
          <button
            type="button"
            aria-label="Toggle navigation"
            className="close-button"
            onClick={toggleMenu}
          >
            <FaTimes />

          </button>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="nav-list-popup">
            <li className="nav-item">
              <a href="#portfolio" className="nav-link" onClick={toggleMenu}>Portfolio</a>
            </li>
            <li className="nav-item">
              <a href="#about" className="nav-link" onClick={toggleMenu}>About</a>
            </li>
            <li className="nav-item">
              <a href="#contact" className="nav-link" onClick={toggleMenu}>Contact</a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

// import React, { useState, useEffect } from 'react';
// import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import './style.css'; // Import the CSS file

// const Navbar = () => {
//   const [menuVisible, setMenuVisible] = useState(false);
//   const [showHamburger, setShowHamburger] = useState(true);

//   const toggleMenu = () => {
//     setMenuVisible((prevMenuVisible) => !prevMenuVisible);
//   };

//   const handleMenuClick = () => {
//     setMenuVisible(false);
//   };

//   useEffect(() => {
//     const handleResize = () => {
//       setShowHamburger(window.innerWidth < 768);
//       setMenuVisible(false); // Close the menu on resize
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize(); // Check initial screen size on component mount

//     return () => {
//       window.removeEventListener('resize', handleResize);
//     };
//   }, []);

//   return (
//     <div id="nav-bar">
//       {showHamburger ? (
//         <div id="hamburger-icon" onClick={toggleMenu}>
//           {menuVisible ? (
//             <FontAwesomeIcon icon={faTimes} />
//           ) : (
//             <FontAwesomeIcon icon={faBars} />
//           )}
//         </div>
//       ) : null}
//       {(showHamburger || menuVisible) && (
//         <ul id="menu-list" onClick={handleMenuClick}>
//           <li className="nav-item">
//             <a className="nav-link" href="#">
//               Portfolio
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">
//               About
//             </a>
//           </li>
//           <li className="nav-item">
//             <a className="nav-link" href="#">
//               Contact
//             </a>
//           </li>
//         </ul>
//       )}
//     </div>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

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
      setMenuVisible(false); // Close the menu on resize
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Check initial screen size on component mount

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
            <a className="nav-link" href="#">Portfolio</a>
            {/* <Link to="/portfolio" className="nav-link">Portfolio</Link> */}

          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">About</a>
            {/* <Link to="/about" className="nav-link">About</Link> */}

          </li>
          <li className="nav-item">
            <a className="nav-link" href="#">Contact</a>
            {/* <Link to="/contact" className="nav-link">Contact</Link> */}

          </li>
        </ul>
      ) : (
        <span
          className="navbar-toggler mr-2"
            // type="button"
          onClick={toggleMenu}
        >
          <span className="navbar-toggler-icon" />
        </span>
      )}

      {menuVisible && (
        <div className="popup-menu">
          <button className="close-button" onClick={toggleMenu}>
            <FaTimes />
          </button>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0" id="nav-list-popup">
            <li className="nav-item">
              <a className="nav-link" href="#">Portfolio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">About</a>
              {/* <Link to="/about" className="nav-link">About</Link> */}

            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Contact</a>
              {/* <Link to="/contact" className="nav-link">Contact</Link> */}

            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

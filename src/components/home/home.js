// import '../style.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import Navbar from '../navbar';

// const Home = () => (
//   <div id="home-container">
//     <Navbar />
//     <div className="" id="greeting">
//       <h1 className="text-center">
//         Hey there, I'm Surafel Samson.
//         <br />
//         I am a Software developer.
//       </h1>
//       <p className="text-center" id="home-description">
//         With a background in developing efficient software applications in a global market.
//         More than 1300+ hours
//         of experience, including mentoring
//         junior developers to achieve concrete goals on a strict deadline.
//         Strong skills include React, Redux, JavaScript,
//         Ruby on Rails, Figma, and Animation Libraries!
//       </p>
//     </div>
//   </div>
// );

import '../style.css';

import React from 'react';
import Navbar from '../navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import SoicialIcons from '../contact/icons';
// import DownArrow from '../../assets/images/down.png';
const Home = () => (
  <div id="desktop-home">
    <Navbar />
    <div id="home-page" className="container-fluid">
      <div className="row justify-content-center align-items-center">
        <div className="text-center">

          <h1 id="title">
            Hey there, I'm Surafel.
            <br />
            <span className="color-green">A Full-stack web developer</span>
          </h1>

          {/* <h1 className="font-weight-bold fs-3 text-center" style={{ fontSize: '40px', lineHeight: '52px', color: '#172b4d', maxWidth: '389px', marginLeft: 'auto', marginRight: 'auto', fontWeight: 700 }}>Hey there, I'm Surafel Samson.</h1> */}
          <p id="home-detail">
            I am a Software developer with a background in developing efficient software
            applications in a global market. More than 1300+ hours of experience,
            including mentoring junior developers
            to achieve concrete goals on a strict deadline. Strong skills include React,
            Redux, JavaScript, Ruby on Rails, Figma, and Animation Libraries!
          </p>
        </div>
        <SoicialIcons />
        {/* <DownArrowArrow /> */}
        <svg id="down-arrow" width="327" height="48" viewBox="0 0 327 48" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="144" y="4" width="40" height="40" rx="20" fill="white" />
          <rect x="144" y="4" width="40" height="40" rx="20" stroke="#DFE1E6" />
          <path fillRule="evenodd" clipRule="evenodd" d="M157.293 20.2929C157.683 19.9024 158.317 19.9024 158.707 20.2929L164 25.5858L169.293 20.2929C169.683 19.9024 170.317 19.9024 170.707 20.2929C171.098 20.6834 171.098 21.3166 170.707 21.7071L164.707 27.7071C164.317 28.0976 163.683 28.0976 163.293 27.7071L157.293 21.7071C156.902 21.3166 156.902 20.6834 157.293 20.2929Z" fill="#172B4D" />
        </svg>

      </div>
    </div>
  </div>
);

export default Home;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css';

const Cards = ({
  image, title, languages, frameworks, link, description,
}) => {
  useEffect(() => {
    console.log('Image URL:', image);
  }, [image]);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      openPopup();
    }
  };

  useEffect(() => {
    const storedShowPopup = localStorage.getItem('showPopup');
    if (storedShowPopup === 'true') {
      setShowPopup(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('showPopup', showPopup.toString());
  }, [showPopup]);

  return (
    <div className="container">

      {!showPopup && (
      <div className="text-center m-auto ">
        <div className="col mb-4 mx-auto">
          <div className="card">
            <img src={image} className="" alt="Card" id="imgages" />
            <div className="">
              <h5 className="card-title">{title}</h5>
              <ul id="stacks" className="list-unstyled mb-3">
                {languages && languages.map((language, index) => (
                  <li key={index} id="list-stack">{language}</li>
                ))}
                {frameworks && frameworks.map((framework) => (
                  <li key={framework} id="list-stack">{framework}</li>))}
              </ul>
              <button onClick={openPopup} type="button" id="btn">See Project</button>
            </div>
          </div>
        </div>
      </div>
      )}

      {showPopup && (
      <div id="popup-container">
        <div id="popup-window" onClick={closePopup} onKeyDown={handleKeyPress} tabIndex={0} role="button">
          <div onClick={(event) => event.stopPropagation()}>
            <div>
              <h1 id="popup-title">{title}</h1>
              <button type="button" className="btn-close position-absolute top-0 end-0 m-3" onClick={closePopup} />
            </div>
            <div id="card-body">
              <img src={image} alt="Project" className="popup-image" id="card-body card-image" />
              <ul id="popup-tech">
                {languages && languages.map((language) => (
                  <li key={language}>{language}</li>
                ))}
                {frameworks && frameworks.map((framework) => (
                  <li key={framework}>{framework}</li>))}
              </ul>
              <p>{description}</p>
            </div>
            <div className="d-flex justify-content-center">
              <button type="button" className="card-link" id="card-btn">
                <a href={link}>See Live</a>
              </button>
              <button type="button" className="card-link" id="card-btn">
                <a href={link}>See Source</a>
              </button>
            </div>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

Cards.propTypes = {
  image: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  frameworks: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
};

export default Cards;

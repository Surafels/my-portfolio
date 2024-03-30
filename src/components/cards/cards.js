import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import './card.css';
import { GithubIcon, SeeliveIcon } from '../contact/icons';

const Cards = ({
  image, title, languages, frameworks, link, description,
}) => {
  useEffect(() => {
    console.log('Image URL:', image);
    console.log('languages:', languages);
    // console.log('live:', liveDemoLink);
  }, [languages, image]);

  const [showPopup, setShowPopup] = useState(false);

  const openPopup = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
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
        <div className=" text-center m-auto mt-3">
          <div className="col mb-4 mx-auto">
            <div className="" id="card-info">

              <div className="card pb-3">
                {image && (
                <img src={image} className="card-img-top" alt={title} />
                )}
                <h5 className="card-title">{title}</h5>
                <ul id="stacks" className="list-unstyled mb-3">
                  {languages && languages.map((language, index) => (
                    <li key={index} id="list-stack">{language}</li>
                  ))}
                  {frameworks && frameworks.map((framework) => (
                    <li key={framework} id="list-stack">{framework}</li>
                  ))}
                </ul>
                <button onClick={openPopup} type="button" id="btn">See Project</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showPopup && (
        <div className="scrolling-line-container" id="popup-container" onClick={closePopup}>
          <div id="popup-window" onClick={(event) => event.stopPropagation()}>
            <div id="close-image">
              <button type="button" className="btn-close" onClick={closePopup} />
              {image && (
              <img src={image} className="card-img-top" alt={title} />
              )}
            </div>
            <h1 id="popup-title">{title}</h1>
            <ul id="popup-tech">
              {languages && languages.map((language) => (
                <li key={language}>{language}</li>
              ))}
              {frameworks && frameworks.map((framework) => (
                <li key={framework}>{framework}</li>
              ))}
            </ul>
            <p id="popup-description">{description}</p>
            <div className="d-flex" id="popup-btns">
              <div className="d-flex">
                <button type="button" className="card-link" id="popup-btn">
                  <a id="live-link" href={link}>See Live</a>
                  <SeeliveIcon />
                </button>
              </div>
              <div>
                <button type="button" className="card-link" id="popup-btn">
                  <a id="live-link" href={link}>See Source</a>
                  <GithubIcon />
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
  image: PropTypes.arrayOf(PropTypes.string).isRequired,
  title: PropTypes.string.isRequired,
  languages: PropTypes.arrayOf(PropTypes.string).isRequired,
  description: PropTypes.string.isRequired,
  frameworks: PropTypes.arrayOf(PropTypes.string).isRequired,
  link: PropTypes.string.isRequired,
  // liveDemoLink: PropTypes.string.isRequired,

};

export default Cards;

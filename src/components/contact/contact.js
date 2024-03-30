import React, { useState } from 'react';
import './contact.css';
import SocialIcons from './icons';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [nameFocused, setNameFocused] = useState('');
  const [emailFocused, setEmailFocused] = useState('');
  const [messageFocused, setMessageFocused] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }
    if (/[A-Z]/.test(email)) {
      setErrorMessage('Please enter your email address in lowercase.');
      return;
    }

    try {
      const response = await fetch('https://formspree.io/f/xvojodzg', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          message,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form.');
      }

      setName('');
      setEmail('');
      setMessage('');
      setErrorMessage('');
      alert('Form submitted successfully!');
    } catch (error) {
      setErrorMessage('Failed to submit form. Please try again later.');
    }
  };

  return (
    <div id="footer">
      <div id="contact-form" className=" d-flex flex-column flex-sm-row background-svg">
        <div id="animate">
          <p className="slide-in" id="contact-detail">I'm always interested in hearing about new projects, so if you'd like to chat please get in touch.</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            maxLength="30"
            value={name}
            onChange={handleNameChange}
            required
            style={{ outline: 'none', borderColor: nameFocused ? 'green' : '#CFD9D4' }}
            onFocus={() => setNameFocused(true)}
            onBlur={() => setNameFocused(false)}
          />
          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ outline: 'none', borderColor: emailFocused ? 'green' : '#CFD9D4' }}
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
          <textarea
            name="message"
            placeholder="Hey, I'd like to connect..."
            cols="30"
            rows="10"
            maxLength="500"
            value={message}
            onChange={handleMessageChange}
            required
            style={{ outline: 'none', borderColor: messageFocused ? 'green' : '#CFD9D4' }}
            onFocus={() => setMessageFocused(true)}
            onBlur={() => setMessageFocused(false)}
          />
          <button className="get-in-touch-button" type="submit" id="btn">Get in touch</button>
          {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
        </form>
      </div>

      <div className="d-flex-column text-center">
        <p id="email"><a className="text-decoration-none text-reset" href="mailto:ssurafel4@gmail.com">ssurafel4@gmail.com</a></p>
        <SocialIcons />
        <hr />

      </div>
    </div>
  );
};

export default Contact;

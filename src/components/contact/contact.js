import React, { useState } from 'react';
import './contact.css';
import SoicialIcons from './icons';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Check if name, email, and message are not empty
    if (!name || !email || !message) {
      setErrorMessage('Please fill out all fields.');
      return;
    }

    // Check email validity
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
      // Send form data to Formspree endpoint
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

      // Reset form fields and error message on successful submission
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
      <div className="m-3 d-flex flex-column flex-sm-row">
        <div id="animate">
          <p className="slide-in" id="contact-detail">I'm always interested in hearing about new projects, so if you'd like to chat please get in touch.</p>
        </div>
        <form onSubmit={handleFormSubmit}>
          <input type="text" name="name" placeholder="Full Name" maxLength="30" value={name} onChange={handleNameChange} required />
          <input type="email" name="email" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <textarea name="message" placeholder="Hey, I'd like to connect..." cols="30" rows="10" maxLength="500" value={message} onChange={handleMessageChange} required />
          <button type="submit" id="btn">Get in touch</button>
          {errorMessage && <p className="error-message text-danger">{errorMessage}</p>}
        </form>
      </div>

      <div className="d-flex-column text-center">
        <p id="email"><a className="text-decoration-none text-reset" href="mailto:ssurafel4@gmail.com">ssurafel4@gmail.com</a></p>
        <SoicialIcons />
        <hr />
      </div>
    </div>
  );
};

export default Contact;

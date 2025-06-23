import React, { useState } from 'react';

function URLForm({ setShortURL }) {
  const [longUrl, setLongUrl] = useState('');
  const [expiry, setExpiry] = useState('');
  const [shortcode, setShortcode] = useState('');
  const [error, setError] = useState('');

  const isValidUrl = (url) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!isValidUrl(longUrl)) {
      setError('Please enter a valid URL');
      return;
    }

    if (expiry && isNaN(expiry)) {
      setError('Expiry must be a number');
      return;
    }
    console.log(longUrl, expiry)

    setError('');

    try {
    const response = await fetch('http://localhost:8000/shorturls', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: longUrl,
        validity: expiry
      }),
    });


      const data = await response.json();
      console.log(data)

      if (response.ok) {
        setShortURL(data.shortUrl);
      } else {
        setError(data.message || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Server error. Please try again later.')
      console.log("error:", err);
    }
  };

  return (
    <form className="url-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter long URL"
        value={longUrl}
        onChange={(e) => setLongUrl(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Expiry time (minutes)"
        value={expiry}
        onChange={(e) => setExpiry(e.target.value)}
        required
      />
      <button type="submit">Convert</button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
export default URLForm;
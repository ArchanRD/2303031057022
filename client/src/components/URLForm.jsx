import React, { useEffect, useState } from 'react';
import ShortURLBox from './ShortURLBox';

function URLForm() {
  const [longUrl, setLongUrl] = useState('');
  const [expiry, setExpiry] = useState('');
  const [error, setError] = useState('');
  const [shortURL, setshortURL] = useState(null);

  console.log(shortURL)

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
        // Check if data.shortUrl exists, otherwise try to use data.short_url or data itself
        if (data.shortLink) {
            const shortLink = data.shortLink.replace("8000", "5173");
            setshortURL(shortLink);
        } else if (data.shortLink) {
          setshortURL(data.shortLink);
        } else if (typeof data === 'string') {
          setshortURL(data);
        } else {
          setError('Unexpected response format');
        }
      } else {
        setError(data.message || 'Failed to shorten URL');
      }
    } catch (err) {
      setError('Server error. Please try again later.')
      console.log("error:", err);
    }
  };

  return (
    <>
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
      {shortURL && <ShortURLBox shortURL={shortURL} />}
    </>
  );
}
export default URLForm;
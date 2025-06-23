import React from 'react';

function ShortURLBox({ shortURL }) {
  const handleCopy = () => {
    navigator.clipboard.writeText(shortURL);
    alert('Short URL copied!');
  };

  return (
    <div className="short-url-box">
      <p>Short URL:</p>
      <div className="short-url-display">
        <span>{shortURL}</span>
        <button onClick={handleCopy}>Copy</button>
      </div>
    </div>
  );
}

export default ShortURLBox;
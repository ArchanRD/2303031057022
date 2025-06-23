import React, { useState } from 'react';
// import Header from '../components/Header';
import URLForm from '../components/URLForm';
import ShortURLBox from '../components/ShortURLBox';

function HomePage() {
  const [shortURL, setShortURL] = useState('');

  return (
    <div className="home-container">
      {/* <Header /> */}
      <URLForm setShortURL={setShortURL} />
      {shortURL && <ShortURLBox shortURL={shortURL} />}
    </div>
  );
}

export default HomePage;
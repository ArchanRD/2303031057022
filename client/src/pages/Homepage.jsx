import React, { useState } from 'react';
// import Header from '../components/Header';
import URLForm from '../components/URLForm';
import ShortURLBox from '../components/ShortURLBox';

function HomePage() {

  return (
    <div className="home-container">
      {/* <Header /> */}
      <URLForm />
    
    </div>
  );
}

export default HomePage;
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Navbar from './components/Navbar';
import './App.css';
import Redirect from './pages/Redirect';

function App() {
  return (
    <>
      <Navbar />
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:shortcode" element={<Redirect />} />
          {/* <Route path="/stats" element={<StatsPage />} /> */}
        </Routes>
      </div>
    </>
  );
}

export default App;
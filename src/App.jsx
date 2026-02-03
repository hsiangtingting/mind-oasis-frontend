import React, { useState, useEffect } from 'react';
import './App.css';

import {SELECTED_THEMES} from './constants/SelectedThemes';
import { STEPS } from './constants/Steps';

import LandingPage from './components/LandingPage/LandingPage';
import JournalPage from './components/JournalPage/JournalPage';
import ArtworkPage from './components/ArtworkPage/ArtworkPage';
import GalleryPage from './components/GalleryPage/GalleryPage';

import { FiHome, FiUser, FiGrid } from 'react-icons/fi';


function App() {

  const [step, setStep] = useState(STEPS.LANDING);

  const [session, setSession] = useState({ theme: null, result: null });

  const handleThemeSelect = (theme) => {
    setSession({ ...session, theme: theme });
    setStep(STEPS.JOURNAL);
  };

  const handleJournalSubmit = (content, artworkData) => {
    console.log("Saving API result to session:", artworkData);

    setSession({
      ...session,
      result: artworkData
    });

      setStep(STEPS.ARTWORK);
  };

  const handleReset = () => {
    setSession({ theme: null, result: null });
    setStep(STEPS.LANDING);
  };

  const handleGoToGallery = () => {
    setStep(STEPS.GALLERY);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={handleReset}>Mind Oasis</div>
        <div className="nav-links">
          <button className="nav-icon-btn" onClick={handleReset} title="Home">
            <FiHome size={22} strokeWidth={1.1} />
          </button>

          <button className="nav-icon-btn" onClick={handleGoToGallery} title="Gallery">
            <FiGrid size={22} strokeWidth={1.1}/>
          </button>

          <button className="nav-icon-btn" title="Account">
            <FiUser size={22} strokeWidth={1.1} />
          </button>
        </div>
      </nav>

      <main className="content-area">
        {step === STEPS.GALLERY && (
          <GalleryPage />
        )}

        {step === STEPS.LANDING && (
          <LandingPage
            selectedThemes={SELECTED_THEMES}
            onSelectMetaphor={handleThemeSelect}
          />
        )}

        {step === STEPS.JOURNAL && (
          <JournalPage metaphor={session.theme} onNext={handleJournalSubmit} />
        )}

        {step === STEPS.ARTWORK && (
          <ArtworkPage journalData={session.result} onReset={handleReset} />
        )}
      </main>

      <footer className="footer">
        <p>© 2026 Mind Oasis Project | Built for Inner Peace</p>
      </footer>
    </div>
  );
}

export default App;

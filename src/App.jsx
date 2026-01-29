import React, { useState, useEffect } from 'react';
import './App.css';

import {SELECTED_THEMES} from './constants/SelectedThemes';
import { STEPS } from './constants/Steps';

import LandingPage from './components/LandingPage/LandingPage';
import JournalPage from './components/JournalPage/JournalPage';
import ArtworkPage from './components/ArtworkPage/ArtworkPage';


function App() {

  const [step, setStep] = useState(STEPS.LANDING);

  const [session, setSession] = useState({ theme: null, result: null });

  const handleThemeSelect = (theme) => {
    setSession({ ...session, theme: theme });
    setStep(STEPS.JOURNAL);
  };

  const handleJournalSubmit = async(content) => {

    console.log("Submitting to backend:", session.theme.id, content);

    const mockBackendResult = {
      artworkImageUrl: session.theme.url,
      artworkTitle: "Waiting for Met API connection...",
      artistName: "Oasis Meditator",
      artworkDate: "c. 2024",
      content: content,
      selectedTheme: session.theme.label
  };

    setSession({ ...session, result: mockBackendResult });
    setStep(STEPS.ARTWORK);
  };

  const handleReset = () => {
    setSession({ theme: null, result: null });
    setStep(STEPS.LANDING);
  };

  return (
    <div className="App">
      <nav className="navbar">
        <div className="logo" onClick={handleReset}>Mind Oasis</div>
      </nav>

      <main className="content-area">
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

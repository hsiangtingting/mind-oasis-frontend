import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import { SELECTED_THEMES } from './constants/SelectedThemes';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/Auth/ProtectedRoute';

import Navbar from './components/Navbar/Navbar';
import LandingPage from './components/LandingPage/LandingPage';
import JournalPage from './components/JournalPage/JournalPage';
import ArtworkPage from './components/ArtworkPage/ArtworkPage';
import GalleryPage from './components/GalleryPage/GalleryPage';
import LoginPage from './components/Auth/LoginPage';

function App() {

  const [session, setSession] = useState({ theme: null, result: null });
  const [viewingHistory, setViewingHistory] = useState(null);


  const handleReset = () => {
    setSession({ theme: null, result: null });
    setViewingHistory(null);
  };

  return (
  <AuthProvider>
    <Router>
      <div className="App">
        <Navbar onReset={handleReset} />

        <main className="content-area">
          <Routes>

            <Route path="/login" element={<LoginPage />} />

            <Route
              path="/"
              element={
                <LandingPage
                  selectedThemes={SELECTED_THEMES}
                  onSelectMetaphor={(theme) => setSession({ ...session, theme: theme })}
                />
              }
            />

            <Route
              path="/journal"
              element={
                session.theme ? (
                  <JournalPage
                    metaphor={session.theme}
                    onNext={(content, artworkData) => setSession({ ...session, result: artworkData })}
                  />
                ) : (
                  <Navigate to="/" replace />
                )
              }
            />

            <Route
              path="/artwork"
              element={
                <ArtworkPage
                  journalData={viewingHistory || session.result}
                />
              }
            />

            <Route
              path="/gallery"
              element={
                <ProtectedRoute>
                <GalleryPage
                  onArtworkClick={(item) => setViewingHistory(item)}
                />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <footer className="footer">
          <p>© 2026 Mind Oasis Project | Built for Inner Peace</p>
        </footer>
      </div>
    </Router>
  </AuthProvider>
  );
}

export default App;
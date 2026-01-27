import React from 'react';
import './ArtworkPage.css';

const ArtworkPage = ({ journalData, onReset }) => {
  if (!journalData) return <div className="loading">Seeking resonance...</div>;

  return (
    <div className="artwork-result-page fade-in">
      <h1 className="page-title">Your Artistic Resonance</h1>
      <div className="title-underline"></div>

      <div className="main-content-card">

        <div className="met-display-section">
          <div className="art-frame">
            <img src={journalData.artworkImageUrl} alt={journalData.artworkTitle} />
          </div>

          <div className="art-details-sidebar">
            <h2 className="met-header">Met (Artwork Display)</h2>
            <div className="info-group">
              <span className="label">Title:</span>
              <p className="value">{journalData.artworkTitle}</p>
            </div>
            <div className="info-group">
              <span className="label">Artist:</span>
              <p className="value">{journalData.artistName}</p>
            </div>
            <p className="artwork-dispiye-text">a Artwork Display</p>
          </div>
        </div>


        <div className="journal-details-section">
          <div className="info-group pink-text">
            <span className="label">Title:</span>
            <p className="value">{journalData.journalTitle || "My Reflection"}</p>
          </div>
          <div className="info-group pink-text">
            <span className="label">Artist:</span>
            <p className="value">You</p>
          </div>
          <div className="info-group pink-text">
            <span className="label">Medium:</span>
            <p className="value">Digital Journal</p>
          </div>

          <div className="user-content-box">
             <p>{journalData.content}</p>
          </div>
        </div>

        <div className="button-group">
          <button className="action-btn primary">Save to My Gallery</button>
          <button className="action-btn secondary" onClick={onReset}>Return Home</button>
        </div>
      </div>
    </div>
  );
};

export default ArtworkPage;
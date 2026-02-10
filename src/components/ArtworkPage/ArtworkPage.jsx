import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ArtworkPage.css';

const ArtworkPage = ({ journalData}) => {
  const navigate = useNavigate();
  const [displayData, setDisplayData] = useState(null);

  useEffect(() => {
    console.log("ArtworkPage detected data update:", journalData);
    if (journalData) {
      setDisplayData(journalData);
    }
  }, [journalData]);

  if (!displayData) return <div className="loading">Seeking resonance...</div>;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="magazine-container fade-in">
      <header className="magazine-header">
        <div className="magazine-badge">The Metropolitan Museum of Art</div>
        <h1 className="page-title">Artistic Resonance</h1>
        <div className="title-divider"></div>
      </header>

      <section className="artwork-hero-full">
        <div className="artwork-frame-refined">
          <img src={displayData.artImageUrl}
          alt={displayData.artTitle} />
        </div>
      </section>

      <div className="magazine-content-wrapper">
        <article className="artwork-meta-v">
          <div className="meta-label">Curator's Selection</div>
          <h2 className="art-title">{displayData.artTitle}</h2>

          <div className="art-info-stack">
            <p className="art-artist">
              {displayData.artistName || "Unknown Artist"}
              <span className="art-date">, {displayData.objectDate}</span>
            </p>

            {displayData.objectURL && (
              <div className="art-link-wrapper">
                <a href={displayData.objectURL} target="_blank" rel="noopener noreferrer" className="met-link-refined">
                  View on Met Museum Official Website →
                </a>
              </div>
            )}
          </div>

          <div className="art-specs-row">
            <span><strong>Medium:</strong> {displayData.medium || "N/A"}</span>
            <span className="spec-divider"> | </span>
            <span><strong>Culture:</strong> {displayData.culture || "N/A"}</span>
          </div>

          <div className="art-credit-line-refined">
            <p>{displayData.creditLine}</p>
          </div>
        </article>

        <section className="reflection-journal-v">
          <div className="reflection-header">
            <h3 className="journal-subtitle">Personal Reflection</h3>
            <p className="journal-date">{today}</p>
          </div>
          <div className="journal-content-v">
            {displayData.content || displayData.journalContent || "No reflection recorded for this journey."}
          </div>
        </section>

        <section className="button-group">
            <button className="action-btn primary"
              onClick={() => navigate('/gallery')}>Save to Gallery</button>
            <button className="action-btn secondary"
              onClick={() => navigate('/')}>Start New Journey</button>
        </section>
      </div>
    </div>
  );
};

export default ArtworkPage;
import React from 'react';
import './ArtworkPage.css';

const ArtworkPage = ({ journalData, onReset }) => {
  if (!journalData) return <div className="loading">Seeking resonance...</div>;

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
          <img src={journalData.artImageUrl} alt={journalData.artTitle} />
        </div>
      </section>

      <div className="magazine-content-wrapper">
        <article className="artwork-meta-v">
          <div className="meta-label">Curator's Selection</div>
          <h2 className="art-title">{journalData.artTitle}</h2>

          <div className="art-info-stack">
            <p className="art-artist">
              {journalData.artistName || "Unknown Artist"}
              <span className="art-date">, {journalData.objectDate}</span>
            </p>

            {journalData.objectURL && (
              <div className="art-link-wrapper">
                <a href={journalData.objectURL} target="_blank" rel="noopener noreferrer" className="met-link-refined">
                  View on Met Museum Official Website →
                </a>
              </div>
            )}
          </div>

          <div className="art-specs-row">
            <span><strong>Medium:</strong> {journalData.medium || "N/A"}</span>
            <span className="spec-divider"> | </span>
            <span><strong>Culture:</strong> {journalData.culture || "N/A"}</span>
          </div>

          <div className="art-credit-line-refined">
            <p>{journalData.creditLine}</p>
          </div>
        </article>

        <section className="reflection-journal-v">
          <div className="reflection-header">
            <h3 className="journal-subtitle">Personal Reflection</h3>
            <p className="journal-date">{today}</p>
          </div>
          <div className="journal-content-v">
            {journalData.content || journalData.journalContent || "No reflection recorded for this journey."}
          </div>
        </section>

        <section className="button-group">
            <button className="action-btn primary">Save to Gallery</button>
            <button className="action-btn secondary" onClick={onReset}>Start New Journey</button>
        </section>
      </div>
    </div>
  );
};

export default ArtworkPage;
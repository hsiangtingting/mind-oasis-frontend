// import React from 'react';
// import './ArtworkPage.css';

// const ArtworkPage = ({ journalData, onReset }) => {
//   if (!journalData) return <div className="loading">Seeking resonance...</div>;

//   const today = new Date().toLocaleDateString('en-US', {
//     year: 'numeric',
//     month: 'long',
//     day: 'numeric'
//   });

//   return (
//     <div className="magazine-container fade-in">

//       <header className="magazine-header">
//         <h1 className="page-title">Your Artistic Resonance</h1>
//         <div className="title-divider"></div>
//       </header>

//       <section className="artwork-hero">
//         <div className="artwork-frame">
//           <img src={journalData.artworkImageUrl} alt={journalData.artworkTitle} />
//         </div>
//       </section>

//       <article className="artwork-meta">
//         <h2 className="art-title">{journalData.artworkTitle}</h2>
//         <p className="art-artist">Artist: {journalData.artistName}</p>
//         <p className="art-description">
//           This selected piece from The Met collection echoes the essence of
//           <strong> {journalData.selectedTheme}</strong>. Its composition and history
//           offer a visual dialogue with your current inner state.
//         </p>
//       </article>


//       <section className="reflection-journal">
//         <h3 className="journal-subtitle">Reflection Journal</h3>
//         <p className="journal-date">{today}</p>
//         <div className="journal-content">
//           {journalData.content}
//         </div>
//       </section>


//       <section className="button-group">
//           <button className="action-btn primary">Save to My Gallery</button>
//           <button className="action-btn secondary" onClick={onReset}>Return Home</button>
//       </section>
//     </div>
//   );
// };

// export default ArtworkPage;

import React from 'react';
import './ArtworkPage.css';

const ArtworkPage = ({ journalData, onReset }) => {
  // Check if journalData exists. Note: journalData should be the 'artworkData' passed from onNext
  if (!journalData) return <div className="loading">Seeking resonance...</div>;

  const today = new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="magazine-container fade-in">
      <header className="magazine-header">
        <h1 className="page-title">Your Artistic Resonance</h1>
        <div className="title-divider"></div>
      </header>

      <section className="artwork-hero">
        <div className="artwork-frame">
          {/* Aligned with backend key: artImageUrl */}
          <img src={journalData.artImageUrl} alt={journalData.artTitle} />
        </div>
      </section>

      <article className="artwork-meta">
        {/* Aligned with backend key: artTitle */}
        <h2 className="art-title">{journalData.artTitle}</h2>
        {/* Aligned with backend key: artistName */}
        <p className="art-artist">Artist: {journalData.artistName || "Unknown Artist"}</p>
        <p className="art-description">
          This selected piece from The Met collection echoes the essence of
          <strong> {journalData.theme}</strong>. Its composition and history
          offer a visual dialogue with your current inner state.
        </p>
      </article>

      <section className="reflection-journal">
        <h3 className="journal-subtitle">Reflection Journal</h3>
        <p className="journal-date">{today}</p>
        <div className="journal-content">
          {journalData.content}
        </div>
      </section>

      <section className="button-group">
          <button className="action-btn primary">Save to My Gallery</button>
          <button className="action-btn secondary" onClick={onReset}>Return Home</button>
      </section>
    </div>
  );
};

export default ArtworkPage;
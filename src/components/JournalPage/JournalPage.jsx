import React, { useState } from 'react';
import './JournalPage.css';

const JournalPage = ({ metaphor, onNext }) => {
  const [content, setContent] = useState('');

  const handleSubmit = () => {
    if (content.trim().length > 10) {
      onNext(content);
    } else {
      alert("Please write a bit more about your feelings (at least 10 characters).");
    }
  };

  return (
    <div className="journal-container fade-in">
    <header className="fade-in">
        <h1>Reflect & Release</h1>
        <p>Let your thoughts flow freely. There's no right or wrong way to express yourself.</p>
    </header>
      <div className="journal-layout">
        <div className="visual-guide">
          <div
            className="selected-metaphor-preview"
            style={{ backgroundImage: `url(${metaphor.url})` }}
          >
            <div className="label-badge">{metaphor.label}</div>
          </div>
          <h3>How does this image speak to you?</h3>
          <p>Share your mood, a memory, or just a few words.</p>
        </div>

        <div className="input-area">
          <textarea
            placeholder="Write down what's on your mind..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="word-count">{content.length} characters</div>

          <button
            className="submit-journal-btn"
            onClick={handleSubmit}
            disabled={content.length < 10}
          >
            Reveal My Art Connection
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
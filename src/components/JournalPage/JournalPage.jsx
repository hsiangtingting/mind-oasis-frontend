import React, { useState } from 'react';
import { journalService } from '../../services/api';
import './JournalPage.css';


const JournalPage = ({ metaphor, onNext }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (content.trim().length >= 10) {
      setIsSubmitting(true);
      try {
        const artworkData = await journalService.createJournalEntry(metaphor.label, content);
        console.log("Full Response from Backend:", artworkData);

        onNext(content, artworkData);

      } catch (error) {
        alert("Failed to connect to the gallery. Please ensure the backend is running.");
      } finally {
        setIsSubmitting(false);
      }
    } else {
      alert("Please write at least 10 characters to express your feelings.");
    }
  };


  return (
    <div className="journal-container">
      <div className="journal-header">
        <h1>Reflect & Release</h1>
        <p>Let your thoughts flow freely. </p>
        <p>There's no right or wrong way to express yourself.</p>
      </div>

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
            disabled={isSubmitting}
          />
          <div className="word-count">{content.length} characters</div>

          <button
            className="submit-journal-btn"
            onClick={handleSubmit}
            disabled={content.length < 10 || isSubmitting}
          >
            {isSubmitting ? "Connecting to Met API..." : "Reveal My Art Connection"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
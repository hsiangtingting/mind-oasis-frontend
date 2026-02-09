import React, { use, useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { journalService } from '../../services/api';
import './JournalPage.css';


const JournalPage = ({ metaphor, onNext }) => {
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const userIsLoggedIn = !!localStorage.getItem('token');

  useEffect(() => {
    const saved = localStorage.getItem('pending_journal');
    if (saved) {
      const { content: savedContent } = JSON.parse(saved);
      setContent(savedContent);
    }
  }, []);

  const handleSubmit = async () => {
    if (content.trim().length < 10) {
      alert("Please write at least 10 characters to express your feelings.");
      return;
    }

    if (!userIsLoggedIn) {
      const pendingData = {
        content: content,
        metaphorLabel: metaphor.label,
        metaphorUrl: metaphor.url,
        timestamp: new Date().toISOString()
      };
      localStorage.setItem('pending_journal', JSON.stringify(pendingData));

      alert("Please sign in to reveal your art connection and save it to your gallery.");
      navigate('/login');
      return;
    }

      setIsSubmitting(true);
      try {

        // const userUuid = localStorage.getItem('token');
        // console.log("Submitting with UUID:", userUuid);

        const artworkData = await journalService.createJournalEntry(
          metaphor.label,
          content,
        );

        console.log("Full Response from Backend:", artworkData);
        localStorage.removeItem('pending_journal');

        onNext(content, artworkData);
        navigate('/artwork');

      } catch (error) {
        alert("Failed to connect to the gallery. Please ensure the backend is running.");
      } finally {
        setIsSubmitting(false);
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
            {isSubmitting ? "Connecting to Met API..."
            :(userIsLoggedIn ? "Reveal My Art Connection" : "Sign In to Reveal Art")}
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalPage;
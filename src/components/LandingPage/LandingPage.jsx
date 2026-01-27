import React, { useState } from 'react';
import './LandingPage.css';
import { METAPHORS } from './constants';


const LandingPage = ({ onSelectMetaphor }) => {
    const [selectedId, setSelectedId] = useState(null);

    const handleNext = () => {
        if (selectedId) {
    const selected = METAPHORS.find(m => m.id === selectedId);
    onSelectMetaphor(selected);
        }
    };

    return (
    <div className="landing-container">
    <header className="fade-in">
        <h1>Welcome to Mind Oasis</h1>
        <p>How does your inner world feel? Select an oasis that resonates with you.</p>
    </header>

    <div className="card-grid">
        {METAPHORS.map((item) => (
        <div
            key={item.id}
            className={`metaphor-card ${selectedId === item.id ? 'active' : ''}`}
            onClick={() => setSelectedId(item.id)}
        >
            <div className="card-image" style={{ backgroundImage: `url(${item.url})` }}>
            <div className="overlay">
                <span>{item.label}</span>
            </div>
            </div>
        </div>
        ))}
    </div>

    <button
        className={`submit-btn ${selectedId ? 'visible' : ''}`}
        onClick={handleNext}
        disabled={!selectedId}
    >
        Explore My Emotion
    </button>
    </div>
    );
};

export default LandingPage;
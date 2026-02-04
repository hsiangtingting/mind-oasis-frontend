import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './GalleryPage.css';



const GalleryPage = ({ onArtworkClick }) => {
    const [journals, setJournals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchGallery = async () => {

            try {
                const response = await fetch(`${process.env.REACT_APP_API_URL}/api/journals`);
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();
                setJournals(data);
            } catch (error) {
                console.error("Gallery fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchGallery();
    }, []);

    const handleArtClick = (item) => {
        onArtworkClick(item);
        navigate('/artwork');
    };

    if (isLoading) return <div className="loading-magazine">Reading Archive...</div>;

    return (
        <div className="magazine-gallery">
            <header className="magazine-header">
                <span className="issue-number">VOL. 01</span>
                <h1 className="magazine-title">Mind Oasis Archive</h1>
                <div className="header-divider"></div>
                <p className="magazine-subtitle">A collection of emotional resonance and timeless art.</p>
            </header>

            <main className="magazine-grid">
                {journals.map((item, index) => (
                    <article
                        key={item.id}
                        className={`magazine-item ${index % 3 === 0 ? 'wide' : 'standard'}`}
                        onClick={() => handleArtClick(item)}
                    >
                        <div className="magazine-img-wrapper">
                            <img
                                src={item.artImageUrlSmall || 'https://via.placeholder.com/400x600'}
                                alt={item.artTitle}
                                className="magazine-img"
                            />
                            <div className="magazine-img-overlay">
                                <span>VIEW MASTERPIECE</span>
                            </div>
                        </div>

                        <div className="magazine-meta">
                            <span className="meta-category">{item.selectedTheme}</span>
                            <h2 className="meta-title">{item.artTitle}</h2>
                            <p className="meta-excerpt">
                                {item.journalContent.length > 60
                                    ? `${item.journalContent.substring(0, 60)}...`
                                    : item.journalContent}
                            </p>
                            <time className="meta-date">
                                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </time>
                        </div>
                    </article>
                ))}
            </main>
        </div>
    );
};

export default GalleryPage;
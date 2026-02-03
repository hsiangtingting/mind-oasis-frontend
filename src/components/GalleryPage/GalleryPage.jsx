import React, { useState, useEffect } from 'react';
import './GalleryPage.css';


const MOCK_JOURNALS = [
    {
        id: 1,
        artTitle: "The Starry Night",
        artistName: "Vincent van Gogh",
        artImageUrlSmall: "https://mind-oasis-assets-2026.s3.us-east-1.amazonaws.com/calm.jpg",
        selectedTheme: "Calm",
        journalContent: "This is how I felt today which was full of chaos but shining like stars.",
        createdAt: "2026-02-01T10:00:00",
        medium: "Oil on canvas"
    },
    {
        id: 2,
        artTitle: "Water Lilies",
        artistName: "Claude Monet",
        artImageUrlSmall: "https://mind-oasis-assets-2026.s3.us-east-1.amazonaws.com/growth.jpg",
        selectedTheme: "Peaceful",
        journalContent: "Found a peaceful moment by the water.",
        createdAt: "2026-02-02T14:30:00",
        medium: "Oil on canvas"
    }
];


const GalleryPage = () => {
    const [journals, setJournals] = useState(MOCK_JOURNALS);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        console.log("Mock journals testing");
        }, []);
        // const fetchGallery = async () => {

    //         try {
    //             const response = await fetch(`${process.env.REACT_APP_API_URL}/api/journals`);
    //             if (!response.ok) throw new Error('Network response was not ok');
    //             const data = await response.json();
    //             setJournals(data);
    //         } catch (error) {
    //             console.error("Gallery fetch error:", error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     };
    //     fetchGallery();
    // }, []);

    const handleArtClick = (journalId) => {
        console.log("user click on journal:", journalId);
        alert("clicked ID: " + journalId);
        // window.open(`/artwork/${journalId}`, '_blank');
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
                        onClick={() => handleArtClick(item.id)}
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
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { journalService } from '../../services/api';
import './GalleryPage.css';


const GalleryPage = ({ onArtworkClick }) => {
    const [journals, setJournals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        const fetchGallery = async () => {

            try {
                const data = await journalService.getJournalsByUser();
                console.log("Gallery fetched data:", data);
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

    const handleDelete = async (e, id) => {
        e.stopPropagation();
        e.preventDefault();

        // console.log("Current Item ID is:", id);

        if (!window.confirm("Are you sure you want to delete this journal from your archive?")) return;

        try {

            await journalService.deleteJournal(id);
            setJournals(prev => prev.filter(item => item.id !== id));
            alert("Journal successfully deleted.");

        } catch (error) {
            console.error("Delete error:", error);
            alert("Failed to delete the journal. Please try again.");
        }
    };


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
                                {item.journalContent ? (
                                    item.journalContent.length > 60
                                        ? `${item.journalContent.substring(0, 60)}...`
                                        : item.journalContent
                                ):(
                                    "No reflection recorded."
                                )}
                            </p>
                            <time className="meta-date">
                                {new Date(item.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                            </time>
                            <button
                                className="delete-button"
                                onClick={(e) => handleDelete(e, item.id)}
                                title="Delete this journal"
                            >
                                Delete
                            </button>
                        </div>
                    </article>
                ))}
            </main>
        </div>
    );
};

export default GalleryPage;
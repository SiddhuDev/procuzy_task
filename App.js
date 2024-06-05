import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
    const [topic, setTopic] = useState('');
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleScrape = async () => {
        if (!topic.trim()) {
            setError('Please enter a topic');
            return;
        }
        setLoading(true);
        setError('');
        try {
            const response = await axios.post('http://localhost:3000/scrape', { topic });
            setArticles(response.data.articles);
        } catch (error) {
            setError('Failed to scrape articles');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="App">
            <h1>Medium Article Scraper</h1>
            <input 
                type="text" 
                value={topic} 
                onChange={(e) => setTopic(e.target.value)} 
                placeholder="Enter topic" 
            />
            <button onClick={handleScrape}>Scrape Articles</button>
            {loading && <p>Loading...</p>}
            {error && <p className="error">{error}</p>}
            <div className="articles">
                {articles.map((article, index) => (
                    <div key={index} className="article">
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            <h3>{article.title}</h3>
                        </a>
                        <p>{article.author}</p>
                        <p>{article.publicationDate}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
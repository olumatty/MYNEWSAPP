'use client'
import React, { useState, useEffect } from 'react'

const Finance = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = 'https://api.finacelayer.com/api/v1/news';
  const apiKey = 'hRWF9On3mTWz5WveycUBdt8bNLJvv88e';

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(`${url}?api_key=${apiKey}&category=business&language=en`);

        if (!response.ok) {
          throw new Error(`Failed to fetch news. Status: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        console.log("Fetched Data:", data);

        if (data && data.data) {
          setNews(data.data);
        } else {
          throw new Error("No news data available in the response.");
        }
      } catch (error) {
        if (error.name === 'TypeError') {
          setError('Network error. Please check your internet connection or try again later.');
        } else {
          setError(error.message); 
        }
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [url, apiKey]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>; 
  }

  return (
    <div>
      <h2>All News</h2>
      {news.map((article) => (
        <div key={article.url || article.title}>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url} target="_blank" rel="noopener noreferrer">
            Read more
          </a>
        </div>
      ))}
    </div>
  );
}

export default Finance;

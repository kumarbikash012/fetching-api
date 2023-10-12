import React, { useState, useEffect } from 'react';
import './App.css';import {
  Link
} from "react-router-dom";



const Header= ()=>{
    const [newsData, setNewsData] = useState([]);
    const [filteredNews, setFilteredNews] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all'); // Default to show all news
    const [error, setError] = useState(null);
    
    useEffect(() => {
    fetch('http://localhost:4000/api/news')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // setNewsData(data.articles); // Set data as an array of articles
        setFilteredNews(data.articles); // Initialize filtered news with all news
      })
      .catch((err) => {
        setError(err.message);
      });
      fetch('http://localhost:4000/api/business')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        // setNewsData(data.articles); // Set data as an array of articles
        setFilteredNews(data.articles); // Initialize filtered news with all news
      })
      .catch((err) => {
        setError(err.message);
      });

      fetch('http://localhost:4000/api/business')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setNewsData(data.articles); // Set data as an array of articles
        // setFilteredNews(data.articles); // Initialize filtered news with all news
      })
      .catch((err) => {
        setError(err.message);
      });
      fetch('http://localhost:4000/api/business')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response as JSON
      })
      .then((data) => {
        setNewsData(data.articles); // Set data as an array of articles
        // setFilteredNews(data.articles); // Initialize filtered news with all news
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredNews(newsData); // Show all news
    } else {
      const filtered = newsData.filter((article) => article.category === category);
      setFilteredNews(filtered);
    }
      };
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">Tesla News</Link>
        <ul className="navbar-nav mr-auto">
          <li className={`nav-item ${selectedCategory === 'all' ? 'active' : ''}`}>
            <Link className="nav-link" to="/" onClick={() => handleCategoryChange('all')}>All</Link>
          </li>
          <li className={`nav-item ${selectedCategory === 'business' ? 'active' : ''}`}>
            <Link className="nav-link" to="/business" onClick={() => handleCategoryChange('business')}>Business</Link>
          </li>
          <li className={`nav-item ${selectedCategory === 'technology' ? 'active' : ''}`}>
            <Link className="nav-link" to="/technology" onClick={() => handleCategoryChange('technology')}>Technology</Link>
          </li>
          {/* Add more category links as needed */}
        </ul>
      </nav>
        </div>
    )

}

export default Header

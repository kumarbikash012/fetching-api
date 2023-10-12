import './App.css';
import React, { useState, useEffect } from 'react';
import { Link, BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [newsData, setNewsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('news');
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const categories = ['news', 'business', 'technology'];

  useEffect(() => {
    fetchDataForCategory(selectedCategory, currentPage);
  }, [selectedCategory, currentPage]);

  const fetchDataForCategory = async (category, page) => {
    try {
      const response = await fetch(`http://localhost:4000/api/${category}?page=${page}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setNewsData(data.articles);
    } catch (err) {
      setError(err.message);
      setNewsData([]);
    }
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link className="navbar-brand" to="#">
            News
          </Link>
          <ul className="navbar-nav mr-auto">
            {categories.map((category) => (
              <li key={category} className="nav-item">
                <Link to={category} className="nav-link" onClick={() => handleCategoryChange(category)}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        {error && <p className="error">Error: {error}</p>}
        <Routes>
          <Route path="/" element={<AllNewsPage newsData={newsData} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
          <Route path="/:category" element={<CategoryPage newsData={newsData} currentPage={currentPage} setCurrentPage={setCurrentPage} />} />
        </Routes>
        <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} newsData={newsData} /> {/* Pass newsData as a prop */}
      </div>
    </Router>
  );
}

function AllNewsPage({ newsData, currentPage, setCurrentPage }) {
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const newsToDisplay = newsData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="row">
        {newsToDisplay.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
          <div className="card h-100">
         <img
              src={article.urlToImage || 'default-image.jpg'}
              className="card-img-top"
              alt="News Image"
              style={{ width: '100%', height: '300px' }}
            />
            {/* Render the article details here */}
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">Author: {article.author}</p>
            <p className="card-text">{article.description}</p>
            <p className="card-text">
              Published at: {new Date(article.publishedAt).toDateString()}
            </p>
            <a
              href={article.url}
              className="btn btn-sm btn-primary "
              target="_blank"
              rel="noopener noreferrer"
             
            >
              Read More
            </a>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CategoryPage({ newsData, currentPage, setCurrentPage }) {
  const startIndex = (currentPage - 1) * 5;
  const endIndex = startIndex + 5;
  const newsToDisplay = newsData.slice(startIndex, endIndex);

  return (
    <div>
      <div className="row">
        {newsToDisplay.map((article, index) => (
          <div key={index} className="col-md-4 mb-4">
          <div className="card h-100">
          <img
              src={article.urlToImage || 'default-image.jpg'}
              className="card-img-top"
              alt="News Image"
              style={{ width: '100%', height: '300px' }}
            />
            {/* Render the article details here */}
            <h5 className="card-title">{article.title}</h5>
            <p className="card-text">Author: {article.author}</p>
            <p className="card-text">{article.description}</p>
            <p className="card-text">
              Published at: {new Date(article.publishedAt).toDateString()}
            </p>
            <a
              href={article.url}
              className="btn btn-sm btn-primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Read More
             </a>
          </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Pagination({ currentPage, setCurrentPage, newsData }) {
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        Previous Page
      </button>
      <span>Page {currentPage}</span>
      <button
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={newsData.length <= currentPage * 5}
        className="pagination-button"
      >
        Next Page
      </button>
    </div>
  );
}

export default App;




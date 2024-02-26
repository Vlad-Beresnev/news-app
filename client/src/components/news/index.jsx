import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const News = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentCategory, setCurrentCategory] = useState('');
    const [sortBy, setSortBy] = useState('');
    const [language, setLanguage] = useState('');
    const [fromValue, setFromValue] = useState('');
    const [toValue, setToValue] = useState('');
    const [currentFromValue, setCurrentFromValue] = useState('');
    const [currentToValue, setCurrentToValue] = useState('');
    const [currentKeyword, setCurrentKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [lastArticleCount, setLastArticleCount] = useState(0);
    const [articles, setArticles] = useState([]);
    const [searchClicked, setSearchClicked] = useState(false);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        
    }, []);

    const fetchNews = async (params) => {
        try {
            const response = await axios.get('https://news-app-pz9q.onrender.com/news', { params });
            setNews(response.data.articles);
            console.log(response.data.articles);
        } catch(error) {
            console.error(error);
        }
    }; 

    const handleCategoryChange = (event) => {
        const newCategory = event.target.value;
        setCurrentCategory(newCategory);    
    };

    const handleSortByChange = (event) => {
        setSortBy(event.target.value);
    };

    const handleLanguageByChange = (event) => {
        setLanguage(event.target.value);
    }

    return (
        <>
            <div className="container">
            <h1>News</h1>
            <div className="selectionContainer">
                <label htmlFor="category">Choose Category</label>
                <select id="category" value={currentCategory} onChange={handleCategoryChange}>
                    <option value="business">Business</option>
                    <option value="entertainment">Entertainment</option>
                    <option value="general">General</option>
                    <option value="health">Health</option>
                    <option value="science">Science</option>
                    <option value="sports">Sports</option>
                    <option value="technology">Technology</option>
                </select>
                <button id="fetchCategory" onClick={() => fetchNews({isSearching: 'top-headlines', category: currentCategory})}>Fetch News</button>
            </div>
            <div className="searchContainer">
                <input type="text" id="searchKeyword" value={inputValue} onChange={e => setInputValue(e.target.value)} placeholder="Search for news..." />
                <button onClick={() => { 
                    setCurrentKeyword(inputValue)
                    setCurrentFromValue(fromValue)
                    setCurrentToValue(toValue)
                    fetchNews({isSearching: 'everything', keyword: inputValue, category: currentCategory, sortBy: sortBy, language: language, from: fromValue, to: toValue})}}>Search Key
                </button>
            </div>
            <div className="filterContainer">
                <select id="sortBy" value={sortBy} onChange={handleSortByChange}>
                    <option value="popularity">Popularity</option>
                    <option value="relevancy">Relevancy</option>
                    <option value="publishedAt">Published At</option>
                </select>
                <select id="language" value={language} onChange={handleLanguageByChange}>
                    <option value="en">English</option>
                    <option value="ar">Arabic</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                    <option value="fr">Franch</option>
                    <option value="he">Hebrew</option>
                    <option value="it">Italian</option>
                    <option value="nl">Dutch</option>
                    <option value="no">Norwegian</option>
                    <option value="pt">Portuguese</option>
                    <option value="ru">Russian</option>
                    <option value="sv">Swedish</option>
                    <option value="ud">Udmurt</option>
                    <option value="zh">Chinese</option>
                </select>
                <input name="from" placeholder="date from" type="date" value={fromValue} onChange={e => setFromValue(e.target.value)}/>
                <input name="to" placeholder="date to" type="date" value={toValue} onChange={e => setToValue(e.target.value)} />
            </div>
            <div className="newsContainer">
                {news.map((article, index) => (
                    <div key={index} className="newsItem">
                        <div className="newsImage">
                            <img src={article.urlToImage} alt={article.title} />
                        </div>
                        <div className="newsContent">
                            <div className="info">
                                <h5>{article.source.name}</h5><span>|</span><h5>{article.publishedAt}</h5>
                            </div>
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer">Read More</a>
                        </div>
                    </div>
                    // <div key={index}>
                    //     <h2>{article.title}</h2>
                    //     <p>{article.description}</p>
                    // </div>
                ))}
            </div>
            </div>
        </>
    );
}

export default News;
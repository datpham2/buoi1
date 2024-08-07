import React, { useEffect, useState } from 'react';

/*
create an example of an json for all recent news for a particular stock quotes
{
    "articles": [
        {
            "id": 1,
            "title": "Stock Market News",
            "description": "Stock market news for today",
            "url": "https://www.example.com"
        },
        {
            "id": 2,
            "title": "Stock Market News",
            "description": "Stock market news for today",
            "url": "https://www.example.com"
        }
    ]
}
*/
const Articles = ({ stockSymbol }) => {
    const [articles, setArticles] = useState([
        {
            "id": 1,
            "title": "Warren Buffett Just Sold $90 Billion of Apple Stock. Could This Be the Biggest Investing Mistake He's Ever Made?",
            "description": "Stock market news for today",
            "url": "https://www.example.com"
        },
        {
            "id": 2,
            "title": "Nasdaq Market Correction: 1 &quot;Magnificent Seven&quot; Stock to Buy Now, and Another to Avoid",
            "description": "Stock market news for today",
            "url": "https://www.example.com"
        }
    ]);

    // useEffect(() => {
    //     // Fetch articles related to the stock symbol
    //     const fetchArticles = async () => {
    //         try {
    //             const response = await fetch(`API_ENDPOINT/${stockSymbol}`);
    //             const data = await response.json();
    //             setArticles(data.articles);
    //         } catch (error) {
    //             console.error('Error fetching articles:', error);
    //         }
    //     };

    //     fetchArticles();
    // }, [stockSymbol]);

    return (
        <div>
            <h2>Recent News</h2>
            {
                articles && articles.map(article => (
                    <div key={article.id}>
                        <h3>{article.title}</h3>
                        <p>{article.description}</p>
                        <a href={article.url} target="_blank" rel="noreferrer">Read more</a>
                    </div>
                ))
            }
        </div>
    );
};

export default Articles;
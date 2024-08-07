import React, { useEffect, useState } from 'react';

import './detail.css';
import img0 from '../../chart0.webp';
import img1 from '../../chart1.png';
import { useParams } from 'react-router-dom';
import SearchBar from '../../components/searchBar/SearchBar';
import Articles from '../../components/articles/Articles';


const StockDetail = () => {
    
    const API_ENDPOINT = 'https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks';
    const { symbol } = useParams();
    const [stockDetail, setStockDetail] = useState(null);

    useEffect(() => {
        // Fetch stock detail using the symbol parameter
        const fetchStockDetail = async () => {
            try {
                const response = await fetch(`${API_ENDPOINT}/${symbol}`);
                console.log(response)
                const data = await response.json();
                setStockDetail(data);
            } catch (error) {
                console.error('Error fetching stock detail:', error);
            }
        };

        fetchStockDetail();
    }, [symbol]);

    return (
        <div
            className='stock-detail'
        >
            <SearchBar />
            {stockDetail ? (
                <div className="container">
                 <h1
                    className="fw-bold"
                 >Finance Detail Page</h1>
                 
                 <div className="stock-info">
                     <h2 className='fw-bold'>
                        {stockDetail.longName} ({stockDetail.symbol})
                     </h2>
                     <p>Symbol: XYZ</p>
                     <p>Price: ${stockDetail.price}
                     </p>
                     <p>Volume: 1000</p>
                     <p>Market Cap: $1,000,000</p>
                 </div>

                    <div className="stock-chart">
                        <img src={
                            img0
                        } alt="Stock Chart" />
                    </div>
                    <Articles stockSymbol={symbol} />
             </div>
            ) : (
                <p>Loading stock detail...</p>
            )}
        </div>
    );
};

export default StockDetail;
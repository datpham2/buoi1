import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


const StockDetail = () => {
    
    const API_ENDPOINT = 'https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks';
    const { symbol } = useParams();
    const [stockDetail, setStockDetail] = useState(null);

    useEffect(() => {
        // Fetch stock detail using the symbol parameter
        const fetchStockDetail = async () => {
            try {
                const response = await fetch(`API_ENDPOINT/${symbol}`);
                const data = await response.json();
                setStockDetail(data);
            } catch (error) {
                console.error('Error fetching stock detail:', error);
            }
        };

        fetchStockDetail();
    }, [symbol]);

    return (
        <div>
            {stockDetail ? (
                <div>
                    <h2>{stockDetail.name}</h2>
                    <p>Symbol: {stockDetail.symbol}</p>
                    <p>Price: {stockDetail.price}</p>
                    {/* Render other stock details */}
                </div>
            ) : (
                <p>Loading stock detail...</p>
            )}
        </div>
    );
};

export default StockDetail;
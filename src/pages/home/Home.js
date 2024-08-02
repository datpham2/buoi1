import React, { useEffect } from 'react'
import './home.css'

export default function Home() {
    const [stocks, setStocks] = React.useState([])
    useEffect(() => {
        fetch('https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks')
            .then(res => res.json())
            .then(data => setStocks(data))
    }
    , [])

    return (
        <div>
            <div className="container">
                <h1>Welcome to Stock Homepage</h1>
                <p>Check out the latest stock information below:</p>
                <div className="d-flex justify-content-center 
                flex-wrap
                ">
                    {
                        stocks.map(stock => (
                            <div key={stock.id} className="stock"  data-aos="fade-right">
                                <div className="stock-image">
                                    <img src={stock.image} alt="Stock Image" />
                                </div>
                                <div className="stock-info">
                                    <h2 className="stock-name">
                                        {stock.symbol}
                                    </h2>
                                    <p className="stock-price">
                                        {stock.price}
                                    </p>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

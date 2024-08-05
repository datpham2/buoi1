import React, { useEffect } from 'react'
import './home.css'

export default function Home() {
    const [stocks, setStocks] = React.useState([])
    useEffect(() => {
        fetch('https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks')
            .then(res => res.json())
            .then(function (data) {
                setStocks(data)
                setInterval(function() {
                    let priceElements = document.querySelectorAll('.stock-info .stock-price .price');
                    let changeElements = document.querySelectorAll('.stock-info .stock-price .change');
                    console.log('hello')
                    console.log(priceElements)
                }, 5000
                )
            })
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
                                    <div className="stock-price">
                                        <p className="price">{stock.price}</p>
                                        <p className={stock.change > 0 ? "change positive" : "change negative"}>
                                            {stock.change > 0 ? "+" : "-"}{Math.abs(stock.change)} ({((stock.change / stock.price) * 100).toFixed(2)}%)
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

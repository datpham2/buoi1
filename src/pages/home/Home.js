import React, { useEffect } from 'react'
import './home.css'
import img0 from '../../chart0.webp'
import img1 from '../../chart1.png'
import SearchBar from '../../components/searchBar/SearchBar'

export default function Home() {
    const [stocks, setStocks] = React.useState([])

    function updateFavorite(stock) {
        fetch(`https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks/${stock.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                ...stock,
                favorite: !stock.favorite
            })
        })
            .then(res => res.json())
            .then(data => {
                setStocks(prevStocks => {
                    return prevStocks.map(prevStock => {
                        if (prevStock.id === stock.id) {
                            return data
                        }
                        return prevStock
                    })
                })
            })
            .catch(error => {
                console.error('Error:', error)
            })
    }

    useEffect(() => {
        fetch('https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks')
            .then(res => res.json())
            .then(function (data) {
                setStocks(data)

                // document.querySelectorAll('.container .stock .stock-info .stock-price .change').forEach(changeElement => {
                //     changeElement.classList.toggle('negative', parseFloat(changeElement.innerText) < 0)
                // }
                // )
            })
            .catch(function (error) {
                console.log(error)
            })

        setInterval(() => {
            setStocks(prevStocks => {
                const updatedStocks = prevStocks.map(stock => {
                    // generate a random number between -5 and 5
                    const randomChange = (Math.random() * 10) - 5
                    const updatedPrice = parseFloat((stock.price + randomChange).toFixed(2))

                    return {
                        ...stock,
                        price: updatedPrice,
                        change: randomChange
                    }
                })

                return updatedStocks;
            })
        }, 5000)
    }
        , [])

    return (
        <div className="container home
        ">
            <SearchBar />
            <div className="mt-5
                pt-5
            "
            >
                <h1>Welcome to Stock Homepage</h1>
                <p>Check out the latest stock information below:</p>
                <div className="row bg-image hover-overlay">
                    {
                        stocks.map(stock => (
                            <div key={stock.id} className="stock col-6 col-md-4 col-lg-3
                            " data-aos="fade-right"
                                onClick={function (event) {
                                    if (event.target.className.includes('fa-heart')) {
                                        return
                                    }

                                    window.location.href = `/quote/${stock.id}`
                                }}
                            >
                                <div className='stock-info'>
                                    <div>
                                        <p className='symbol'>{stock.symbol} - {stock.longName}
                                        </p>
                                        <p className='price'>${stock.price}</p>
                                        <p className={`change ${stock.change > 0 ? '' : 'negative'}`}>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change > 0 ? '+' : ''}{(stock.change / stock.price * 100).toFixed(2)}%)</p>

                                    </div>
                                    <div className='chart'>
                                        <img src={
                                            stock.change > 0 ? img0 : img1
                                        } alt="chart"
                                            width="100%"
                                            height="100%"
                                        />
                                    </div>
                                    {stock.favorite ?
                                        <i className="fa-solid fa-heart"
                                            onClick={() => {
                                                updateFavorite(stock)
                                            }}
                                        ></i>
                                        :
                                        <i className="fa-regular fa-heart"
                                            onClick={() => {
                                                updateFavorite(stock)
                                            }}
                                        ></i>}
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

import React, { useEffect } from 'react'
import './home.css'

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

            

            // setInterval(() => {
            //     setStocks(prevStocks => {
            //         const updatedStocks = prevStocks.map(stock => {
            //             // generate a random number between -20 and 20
            //             const randomChange = (Math.random() * 40) - 20
            //             const updatedPrice = parseFloat((stock.price + randomChange).toFixed(2))

            //             return {
            //                 ...stock,
            //                 price: updatedPrice,
            //                 change: randomChange
            //             }
            //         })

            //         let changeElements = document.querySelectorAll('.container .stock .stock-info .stock-price .change')

            //         for (let i = 0; i < updatedStocks.length; i++) {
            //             changeElements[i].innerText = `${updatedStocks[i].change > 0 ? '+' : '-'}${Math.abs(updatedStocks[i].change).toFixed(2)}` 
            //             changeElements[i].classList.toggle('negative', updatedStocks[i].change < 0)
            //         }


            //         return updatedStocks;
            //     })
            // }, 4000)

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
            }, 4000)
    }
        , [])

    return (
        <div>
            <h1>Welcome to Stock Homepage</h1>
            <p>Check out the latest stock information below:</p>
            <div className="
            ">
                {
                    stocks.map(stock => (
                        <div key={stock.id} className="stock" data-aos="fade-right">
                            {/* <div className="stock-image">
                                <img src={stock.image} alt="Stock Image" />
                            </div>
                            <div className="stock-info">
                                <h2 className="stock-name">
                                    {stock.symbol}
                                </h2>
                                <div className="stock-price">
                                    <p className="price">{stock.price}</p>
                                    <p className= {`change ${stock.change > 0 ? '' : 'negative'}`}>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change > 0 ? '+' : ''}{(stock.change / stock.price * 100).toFixed(2)}%)</p>
                                </div>
                            </div> */}
                            <div className='stock-info'>
                                <p className='symbol'>{stock.symbol}</p>
                                <p className='price'>${stock.price}</p>
                                <p className={`change ${stock.change > 0 ? '' : 'negative'}`}>{stock.change > 0 ? '+' : ''}{stock.change.toFixed(2)} ({stock.change > 0 ? '+' : ''}{(stock.change / stock.price * 100).toFixed(2)}%)</p>
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
    )
}

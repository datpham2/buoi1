import React, { useEffect } from 'react'
import './home.css'
import img0 from '../../chart0.webp'
import img1 from '../../chart1.png'
import ad0 from '../../ad0.jpg'
import SearchBar from '../../components/searchBar/SearchBar'
import Header from '../../components/header/Header'

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

        // display ad-container, and display ad-content in the center horizontally and vertically after 3 seconds
        setTimeout(() => {
            document.querySelector('.ad-container').style.display = 'flex'
            document.body.style.overflow = 'hidden'
        }, 3000)


        // when the user clicks on the close-ad button, hide the ad-container
        document.querySelector('.close-ad').addEventListener('click', () => {
            document.querySelector('.ad-container').style.display = 'none'
            document.body.style.overflow = 'auto'
        })
    }
        , [])

    return (
        <div className="container home
        ">
            <div className="ad-container">
                <div className="ad-content">
                    <div>
                        <a href="#">
                            <img src={ad0}
                                alt="Ad" />
                        </a>
                        <div className="close-ad">&#215;</div>
                    </div>
                </div>
            </div>
            <SearchBar stocks={stocks} />
            <div className="mt-5
                pt-5 current-content
            "
            >
                <h1>Welcome to Stock Homepage</h1>
                <p>Check out the latest stock information below:</p>
                <div className="row bg-image hover-overlay">
                    {
                        stocks.map(stock => (
                            <div key={stock.id} className="stock col-6 col-md-4 col-lg-3 text-lg-start text-sm-start text-md-start text-xl-start text-xxl-start
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
            <i className="fa-solid fa-chevron-right"
                onClick={() => {
                    document.querySelector('.current-content').classList.toggle('hidden')
                    document.querySelector('.search-bar').classList.toggle('hidden')
                    // eventually remove the i tag with the fa-chevron-right class
                    document.querySelector('.fa-chevron-right').style.display = 'none'

                    document.querySelector('.new-content').classList.toggle('show')
                    document.querySelector('.home').style.margin = '0'
                    document.querySelector('.home').style.padding = '0'
                }}
            ></i>

            <div className='new-content'>
                <Header />
                <div class="article">
                    <div class="date text-muted">
                        Dec. 15, 2021
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Coronavirus Briefing: Britain’s Omicron restrictions</a>
                            </p>
                            <p class="summary">
                                <a href="/23">And the verdict on Pfizer’s Covid pill.</a>
                            </p>
                            <p class="reporters">
                                <a href="/23">
                                    By


                                    BAR


                                </a>
                            </p>
                        </div>
                        <div class="image">
                            <a href="/23">
                                <img src="https://static01.nyt.com/images/2020/07/21/us/cases_orphan_usa-1595349567192-copy/cases_orphan_usa-1595349567192-jumbo-v1120.png?quality=75&amp;auto=webp" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

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
                        Aug. 9 , 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Warren Buffett Just Sold $90 Billion of Apple Stock. Could This Be the Biggest Investing Mistake He's Ever Made?</a>
                            </p>
                            <p class="summary">
                                <a href="/23">Starting in Q1 of 2024, Warren Buffett epically downsized his immense holdings of Apple stock in one of the best-publicized selloffs by any ...</a>
                            </p>
                            <p class="reporters">
                                <a href="/23">
                                    By


                                    FOO


                                </a>
                            </p>
                        </div>
                        <div class="image">
                            <a href="/23">
                                <img src="https://s.yimg.com/ny/api/res/1.2/PAX0hoi2VWMTraYCREuxNQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/motleyfool.com/e06b98920356a5399f39747db40ebe15" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9 , 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Down 79%, This Growth Stock Could Double in the Housing Rebound</a>
                            </p>
                            <p class="summary">
                                <a href="/23">The S&P 500 plunged 6% over the first three trading days of August as a raft of downbeat economic data convinced investors that the economy was weakening faster than expected and the Fed had erred in not lowering rates.</a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/R3kp4vATcuSMIhW0h8UfaA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY1MQ--/https://media.zenfs.com/en/motleyfool.com/8c348e7413c9db30753637802181f924" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Asian Equities Advance Ahead of Busy Data Week: Markets Wrap</a>
                            </p>
                            <p class="summary">
                                <a href="/23">Shares in Asia climbed for a second session as markets shifted focus to key US data prints this week for further insight into the health of the world’s biggest economy.</a>
                            </p>
                            <p class="reporters">
                                <a href="/23">
                                    By


                                    BAZ


                                </a>
                            </p>
                        </div>
                        <div class="image">
                            <a href="/23">
                                <img src="https://s.yimg.com/ny/api/res/1.2/Nf7h8uMpVxCY8WTU9fbggw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://media.zenfs.com/en/bloomberg_markets_842/c65777df2cf47512b36447c7368807eb" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Yen slips, markets brace for US inflation data</a>
                            </p>
                            <p class="summary">
                                <a href="/23">The yen was a tad softer against the dollar in trading thinned by a Japanese holiday on Monday, with market participants still ambivalent about the odds of a big Fed rate cut next month.</a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/w6iB9Enh7Q5pcWKRQ3DRCw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/reuters-finance.com/6c925559e99a0895e7f3e00bc4eb0088" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">China's bond market rattled as central bank squares off with bond bulls</a>
                            </p>
                            <p class="summary">
                                <a href="/23">China's bond market, the world's second largest, is on edge following a turbulent week in which the central bank started intervening heavily to stem a plunge in yields even as the economy is struggling.</a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/3XFfWbXqpsHrX9oPdlbYdA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY1OTtjZj13ZWJw/https://media.zenfs.com/en/reuters-finance.com/a9d62a793bd08ec0d6826981b918d061" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Market Sell-Off: Is It Time to Buy the Dip on This Phenomenal Streaming Stock?</a>
                            </p>
                            <p class="summary">
                                <a href="/23">Investors have been hit with some turmoil in recent days. Soft U.S. economic data, an interest rate hike in Japan</a>
                            </p>
                            <p class="reporters">
                                <a href="/23">
                                    By


                                    FOO


                                </a>
                            </p>
                        </div>
                        <div class="image">
                            <a href="/23">
                                <img src="https://s.yimg.com/ny/api/res/1.2/mEgaIo4V0QPKPq9UIBFEfQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY0MDtjZj13ZWJw/https://media.zenfs.com/en/motleyfool.com/57afbb3661d68adf213e3a057cd0543b" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Carry-Trade Blowup Haunts Markets Rattled by Rapid-Fire Unwind</a>
                            </p>
                            <p class="summary">
                                <a href="/23">By now, last Monday’s global market meltdown looks more like a brief tremor, a fleeting panic unleashed by a small policy shift from the Bank of Japan and resurgent fears of a US recession.</a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/X.yEMjp4pi.q34DAFYiy2Q--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://media.zenfs.com/en/bloomberg_markets_842/6a8c7d0d8e4d50d899d99477fe25924a" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Prediction: 1 Top Artificial Intelligence (AI) Semiconductor Stock That Could Be Worth $1 Trillion</a>
                            </p>
                            <p class="summary">
                                <a href="/23">Artificial intelligence (AI) has turned out to be a solid growth driver for many semiconductor companies.</a>
                            </p>
                            <p class="reporters">
                                <a href="/23">
                                    By


                                    BAZ


                                </a>
                            </p>
                        </div>
                        <div class="image">
                            <a href="/23">
                                <img src="https://s.yimg.com/ny/api/res/1.2/_51LJvQLAA6W8f.ehQVL8g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTUwNztjZj13ZWJw/https://media.zenfs.com/en/motleyfool.com/6926f2b81a29628f70269190e2af123a" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Is Now the Time to Buy the 2 Worst-Performing Stocks in the "Magnificent Seven"?</a>
                            </p>
                            <p class="summary">
                                <a href="/23">Big tech stocks are struggling lately as investors grow concerned about whether investments into artificial intelligence (AI) will pay off, and if valuations have simply become too high.    </a>
                            </p>
                            <p class="reporters">
                                <a href="/23">
                                    By


                                    FOO


                                </a>
                            </p>
                        </div>
                        <div class="image">
                            <a href="/23">
                                <img src="https://s.yimg.com/ny/api/res/1.2/HtvNg0YgTfrI.tKgrLyKZw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY3NjtjZj13ZWJw/https://media.zenfs.com/en/motleyfool.com/543c303b766c4a758a86e5dca2b55457" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">Expedia stock price targets get reset by analysts after CEO sounds alarm</a>
                            </p>
                            <p class="summary">
                                <a href="/23">July and August are usually the months when people go on vacations. However, Expedia  (EXPE)  is warning about weak travel demand this summer.

                                </a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/qauOCOhW2DUaoRexT.fB1w--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTU0MDtjZj13ZWJw/https://media.zenfs.com/en/thestreet_881/0c61ab36ac1cd3dea363feb0799000e3" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">There's a hidden risk lurking for AI stocks in 2025</a>
                            </p>
                            <p class="summary">
                                <a href="/23">An accounting method used to spread the cost of new technology over the course of years could end up causing problems for firms spending big on AI chips.

                                </a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/ZPwt2Aw6aDdGpHCJAaLABA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTQ4MDtjZj13ZWJw/https://media.zenfs.com/en/business_insider_articles_888/662d325fc28549da01aada19d2f3c5f4" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <div class="article">
                    <div class="date text-muted">
                        Aug. 9, 2024
                    </div>
                    <div class="article-post">
                        <div class="main">

                            <p class="headline">
                                <a href="/23">The stock market suffers another August scare. Here are the lessons for investors.</a>
                            </p>
                            <p class="summary">
                                <a href="/23">Investors got whipsawed by wild markets in the past week. Here are some lessons learned.

                                </a>
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
                                <img src="https://s.yimg.com/ny/api/res/1.2/73yGS0EBCd6dQ2SqXVptVQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTk2MDtoPTY2NztjZj13ZWJw/https://media.zenfs.com/en/marketwatch_hosted_869/fbc4f04d34cb3323cbe28f6ccc1ed0d3" alt="" />
                            </a>
                        </div>
                    </div>
                </div>
                <nav aria-label="pagination" class="d-flex justify-content-center">
                    <ul class="pagination">
                        <li class="page-item active">
                            <a class="page-link" href="?page=1">1</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="?page=2">2</a>
                        </li>
                        <li class="page-item">
                            <a class="page-link" href="?page=2">Next</a>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    )
}

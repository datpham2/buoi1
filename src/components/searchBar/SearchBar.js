import React, { useState, useEffect, useRef } from 'react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const inputRef = useRef(null);

    function displayTrendingTickers() {
        const url = 'https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks';
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                const searchResult = document.getElementById('result');
                searchResult.classList.add('d-flex');
                searchResult.innerHTML = '';
                /* add h3 element */
                const h3 = document.createElement('h3');
                h3.className = 'z-3 bg-white fs-6 fw-bold text-dark mt-2 mb-0 p-2 trending-tickers';
                h3.innerHTML = 'Trending Tickers';
                searchResult.appendChild(h3);
                data.forEach((result) => {
                    const resultLi = document.createElement('li');
                    resultLi.className = 'list-group-item z-3 bg-white text-dark border-0';
                    resultLi.style.cursor = 'pointer';
                    resultLi.innerHTML = `<span><small class="fw-bold">${result.symbol}</small></span> <span><small class="text-secondary">${result.price}</small></span>`;
                    searchResult.appendChild(resultLi);
                    resultLi.addEventListener('click', () => {
                        window.location.href = `/quote/${result.id}`;
                    });
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }


    function displaySearchResults(searchTerm) {
        console.log(searchTerm);
        if (searchTerm === '') {
            setSearchResults([]);
            return;
        }

        const url = `https://66a08cbc7053166bcabbc9a5.mockapi.io/stocks?symbol=${searchTerm}`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setSearchResults(data);

                const searchResult = document.getElementById('result');
                searchResult.innerHTML = '';
                searchResults.forEach((result) => {
                    console.log('result', result);
                    const resultLi = document.createElement('li');
                    resultLi.className = 'list-group-item z-3 bg-light text-dark';
                    resultLi.style.cursor = 'pointer';
                    resultLi.innerHTML = `<p class="text-primary"><small>${result.symbol}</small></p><p><small class="text-secondary">${result.longName}</small></p>`;
                    searchResult.appendChild(resultLi);
                    resultLi.addEventListener('click', () => {
                        window.location.href = `/quote/${result.id}`;
                    });
                });
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (inputRef.current && !inputRef.current.contains(event.target)) {
                const listGroupItems = document.getElementsByClassName('list-group-item');
                if (document.getElementsByClassName('trending-tickers').length > 0) {
                    document.getElementsByClassName('trending-tickers')[0].remove();
                }
                while (listGroupItems.length > 0) {
                    listGroupItems[0].parentNode.removeChild(listGroupItems[0]);
                }
            }
        }

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, []);

    return (
        <div className='search-bar w-100 position-absolute top-0 start-50 translate-middle-x mt-4 z-1'>
            <div className="input-group mt-3 w-50 mx-auto">
                <input
                    type="text"
                    className="form-control shadow-none"
                    placeholder="Search for news, symbols or companies"
                    aria-label="Search for stocks"
                    aria-describedby="button-addon2"
                    onChange={(e) => {
                        const searchResult = document.getElementById('result');
                        searchResult.innerHTML = '';
                        setSearchTerm(e.target.value);
                        displaySearchResults(e.target.value);
                        console.log(e.target.value);
                    }}
                    onClick={(e) => {
                        displayTrendingTickers();
                    }}
                    value={searchTerm}
                    ref={inputRef}
                />
                <button className="btn btn-primary shadow-none py-2 rounded-0" type="button" id="button-addon2">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <ul className="list-group w-50 mx-auto shadow rounded-4" id="result">
                {/* <li class="list-group-item">Test</li>
                <li class="list-group-item">Another Test</li>
                <li class="list-group-item">Sample</li>
                <li class="list-group-item">Another Sample</li>
                <li class="list-group-item">Last one</li> */}
            </ul>
        </div>
    );
}

import React, { useState } from 'react';

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

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
                    resultLi.innerHTML = `<p class="text-primary">${result.symbol}</p><p>${result.longName}</p>`;
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

    return (
        <div className='search-bar w-100
        position-absolute top-0 start-50 translate-middle-x mt-4 
                z-1
'>
            <div className="input-group mt-3 w-50 mx-auto">
                <input type="text" className="form-control shadow-none" placeholder="Search for news, symbols or companies" aria-label="Search for stocks" aria-describedby="button-addon2"

                    onChange={function (e) {
                        const searchResult = document.getElementById('result');
                        searchResult.innerHTML = '';
                        setSearchTerm(e.target.value);
                        displaySearchResults(e.target.value);
                        console.log(e.target.value);
                    }}
                    value={searchTerm}
                />
                <button className="btn btn-primary
                shadow-none py-2 rounded-0
                " type="button" id="button-addon2">
                    <i className="fas fa-search"></i>
                </button>
            </div>
            <ul className="list-group w-50 mx-auto
            " id="result">
                {/* <li class="list-group-item">Test</li>
                <li class="list-group-item">Another Test</li>
                <li class="list-group-item">Sample</li>
                <li class="list-group-item">Another Sample</li>
                <li class="list-group-item">Last one</li> */}
            </ul>
        </div>
    );
}

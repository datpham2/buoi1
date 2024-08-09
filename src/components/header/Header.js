import React, { useEffect } from 'react'
import './header.css'

export default function Header() {

    function modifySearchForm() {
        if (window.innerWidth <= 1920 && window.innerWidth > 1248) {
            document.querySelector('#search-navbar').style.visibility = 'visible';
            document.querySelector('.navbar-nav').style.marginRight = '0px';
    
            // Hide the X sign and show the bar sign
            document.querySelector('.fa-x').style.display = 'none';
            document.querySelector('.navbar-toggler-icon').style.display = 'block';
        } 
        
        // I don't want the search form to be hiden away after less 1248
        else if (window.innerWidth >= 991 && window.innerWidth <= 1248) {
            document.querySelector('#search-navbar').style.visibility = 'visible';
            document.querySelector('.navbar-nav').style.marginRight = '10%';
    
             // Hide the X sign and show the bar sign
            document.querySelector('.fa-x').style.display = 'none';
            document.querySelector('.navbar-toggler-icon').style.display = 'block';
        } else {
            document.querySelector('#search-navbar').style.visibility = 'hidden';
        }
    }

    useEffect(() => {
        // Hide the X sign and show the bar sign
        document.querySelector('.fa-x').style.display = 'none';
        document.querySelector('.navbar-toggler-icon').style.display = 'block';

        // Make the search form appear appropriately
        modifySearchForm()

        // Listen for the navbar toggle is clicked 
        document.querySelector('.navbar-toggler').onclick = function () {
            if (getComputedStyle(document.querySelector('.dropdown-menu')).display === 'flex') {

                // Hide the dropdown items, show the bar icon and hide the close icon.
                document.querySelector('.fa-x').style.display = 'none';
                document.querySelector('.navbar-toggler-icon').style.display = 'block';
                document.querySelector('.dropdown-menu').style.display = 'none';
            } else {

                // Show the dropdown items, hide the bar icon and show the close icon.
                document.querySelector('.dropdown-menu').style.display = 'flex';
                document.querySelector('.fa-x').style.display = 'block';
                document.querySelector('.navbar-toggler-icon').style.display = 'none';
                window.addEventListener('resize', () => {
                    if (window.innerWidth >= 992) {
                        document.querySelector('.dropdown-menu').style.display = 'none';
                    }
                });
            }

            // By default, disable the submit button on dropdown menu
            const buttonDropdown = document.querySelector('#submit-dropdown');
            buttonDropdown.disabled = true;

            // Check if the user really type in something to search
            const inputDropdown = document.querySelector('#search-query-dropdown');
            inputDropdown.onkeyup = function () {

                // Ask question if the input has more than 0 character
                if (inputDropdown.value.length > 0) {

                    // Enable the submit button
                    buttonDropdown.disabled = false;
                } else {

                    // Disable the submit button
                    buttonDropdown.disabled = true;
                }
            }

        }
    }, [])

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand fs-4" href="/">KITS Finance</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        <i className="fa-x"></i>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <a className="nav-link active" aria-current="page" href="/">Home</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/section/World">World</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/section/U.S.">U.S.</a>
                            </li>

                        </ul>
                        <form action="/search" className="d-flex search" id="search-navbar" method="get">
                            <input id="search-sort-navbar" name="sort" type="hidden" value="best" />
                            <input className="form-control me-2" id="search-query-navbar" name="query" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn btn-light" id="submit-navbar" type="submit">
                                <i className="fas fa-search"></i>
                            </button>
                        </form>

                        <span className="navbar-text">
                            Friday, August 09, 2024
                        </span>

                    </div>
                </div>
            </nav>
            <div className="dropdown-menu">
                <form action="{% url 'search' %}" className="dropdown-item d-flex search" id="search-dropdown-menu" method="get">
                    <input id="search-sort-dropdown" name="sort" type="hidden" value="best" />
                    <input className="form-control me-2" id="search-query-dropdown" name="query" type="search" placeholder="Search" aria-label="Search" />
                    <button className="btn btn-light" id="submit-dropdown" type="submit">
                        <i className="fas fa-search"></i>
                    </button>
                </form>
                <div className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="{% url 'index'%}">Home</a>
                </div>
                <div className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="{% url 'section' category %}">World</a>
                </div>
                <div className="dropdown-item">
                    <a className="nav-link active" aria-current="page" href="{% url 'section' category %}">U.S.</a>
                </div>
            </div>
        </div>
    )
}


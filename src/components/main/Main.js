import React from 'react'
import './main.css'

export default function Main() {
    return (
        <div>
            <div class="container">
                <h1>Welcome to Stock Homepage</h1>
                <p>Check out the latest stock information below:</p>
                <div class="stock-image">
                    <img src="https://via.placeholder.com/150" alt="Stock Image" />
                </div>
                <div class="stock-info">
                    <h2 class="stock-name">Stock Name</h2>
                    <p class="stock-price">$XX.XX</p>
                </div>
            </div>
        </div>
    )
}

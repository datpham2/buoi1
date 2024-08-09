
// Initialize the start and end index of post for slicing
let start = 0;
let end = 10;


// When I go back to my history
window.onpopstate = function(event) {

    console.log(event.state.query);
    console.log(event.state.sort);

    // Find out what the user search for and what sort the user want
    const query = event.state.query;
    const sort = event.state.sort;
    load(query, sort);
}

// When the page finishes loading, do ...
document.addEventListener('DOMContentLoaded', () => {

    // Ask question if the element with an id of 'query' exists
    if (document.querySelector('#query') === null) {

    } else {

        // Push the first search into history
        const query = document.querySelector('#query').value;
        history.pushState({query: query}, "", `search?query=${query}`);
    }

    // By default, disable the submit button on navbar
    const button = document.querySelector('#submit-navbar');
    button.disabled = true;

    // Check if the user really type in something to search
    const input = document.querySelector('#search-query-navbar');
    input.onkeyup = function() {

        // Ask question if the input has more than 0 character
        if (input.value.length > 0) {

            // Enable the submit button
            button.disabled = false;
        } else {

            // Disable the submit button
            button.disabled = true;
        }
    }
    

    // Hide the X sign and show the bar sign
    document.querySelector('.bi-x-lg').style.display = 'none';
    document.querySelector('.navbar-toggler-icon').style.display = 'block';

    // Make the search form appear appropriately
    modifySearchForm()

    // Listen for the navbar toggle is clicked 
    document.querySelector('.navbar-toggler').onclick = function() {
        if (getComputedStyle(document.querySelector('.dropdown-menu')).display === 'flex') {

            // Hide the dropdown items, show the bar icon and hide the close icon.
            document.querySelector('.bi-x-lg').style.display = 'none';
            document.querySelector('.navbar-toggler-icon').style.display = 'block';
            document.querySelector('.dropdown-menu').style.display = 'none';
        } else {

            // Show the dropdown items, hide the bar icon and show the close icon.
            document.querySelector('.dropdown-menu').style.display = 'flex';
            document.querySelector('.bi-x-lg').style.display = 'block';
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
        inputDropdown.onkeyup = function() {

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

    

    window.addEventListener('resize', () => {

        modifySearchForm()
        
    });

    // Waiting for the user to select search filter from dropdown menu
    if (document.querySelector('select') === null) {

    } else {
        document.querySelector('select').onchange = function() {
            
            // Hide the first show more button of the very first search
            if (document.querySelector('#show-more-first') === null) {

            } else {
                document.querySelector('#show-more-first').id = 'show-more';
            }

            // Reset start and end index and show the show more button
            start = 0;
            end = 10;
            document.querySelector('#show-more').style.display = 'block';
            // Ask the same question if the element with an id of '#show-more' exists
            if (document.querySelector('#show-more') === null) {

            } else {
                document.querySelector('#show-more').onclick = showMore;
            }

             
            // Find out what the user search for and what sort the user want
            const query = document.querySelector("#query").value;
            const sort = this.value;

            // Push the data to the URL bar
            history.pushState({query: query, sort: sort}, "", `?query=${query}&sort=${sort}`);

            load(query, sort);
        }
    }
});

function showMore() {

    // Change the index for fetching appropriate results
    start = end;
    end += 10;

    // Find me all the necessary infomation to fetch
    const query = document.querySelector('#query').value;
    const sort = document.querySelector('select').value;

    fetch(`/articles?query=${query}&sort=${sort}&start=${start}&end=${end}`)
    .then(response => response.json())
    .then(results => {
        
        if (results.length < 10) {
            document.querySelector('#show-more').style.display = 'none';
        }
        console.log(results);
        results.forEach(result => {
            
            // Create a div element
            const div = document.createElement('div');

            // Give that div element a classname of
            div.className = "article-search";
            
            // Fill in that div with those elements
            const published_date = new Date(result.published_date)

            // Get the year, month, date that we want
            const date = published_date.getDate();
            const index = published_date.getMonth();
            const year = published_date.getFullYear();

            const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", 
           "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

            // Fill in whatever I want to show on the search results
            div.innerHTML = `<div class="date-search text-muted">${months[index]} ${date}, ${year}</div><div class="article-post-search"><div class="main-search"><p class="headline-search"><a href="/${result.id}">${result.headline}</a></p><p class="summary-search"><a href="/${result.id}">${result.summary}</a></p><p class="reporters-search"><a href="/${result.id}">By ${result.reporters.join(" and ")}</a></p></div><div class="image-search"><a href="/${result.id}"><img src="${result.image}" alt></a></div>`
            // Append that to the end of the element that has the id 'article-search-view'
            document.querySelector('#article-search-view').append(div);
        });
    });
}

function load(query, sort) {

    // Hide all articles from previous results or suggestion of how to search effectively
    document.querySelectorAll('.article-search').forEach(result => {
        result.style.display = 'none';
    });

    if (document.querySelector('.not-match') == null) {

    } else {
        document.querySelector('.not-match').style.display = 'none';
    }

    // Show all appropriate results

    fetch(`/articles?query=${query}&sort=${sort}&start=0`)
    .then(response => response.json())
    .then(results => {

        // Display number of results coming back
        document.querySelector('#label').innerHTML = `Showing ${results.length} results for:`;
    });

    fetch(`/articles?query=${query}&sort=${sort}&start=${start}&end=${end}`)
    .then(response => response.json())
    .then(results => {

        // Check if the amount set of results are less than 10
        if (results.length < 10) {
            document.querySelector('#show-more').style.display = 'none';
        }

        console.log(results);

        // Apply this function to each result coming back
        results.forEach(result => {
            
            // Create a div element
            const div = document.createElement('div');

            // Give that div element a classname of
            div.className = "article-search";
            
            // Fill in that div with those elements
            const published_date = new Date(result.published_date)

            // Get the year, month, date that we want
            const date = published_date.getDate();
            const index = published_date.getMonth();
            const year = published_date.getFullYear();

            const months = ["Jan.", "Feb.", "Mar.", "Apr.", "May", "Jun.", 
           "Jul.", "Aug.", "Sep.", "Oct.", "Nov.", "Dec."];

            // Fill in whatever I want to show on the search results
            div.innerHTML = `<div class="date-search text-muted">${months[index]} ${date}, ${year}</div><div class="article-post-search"><div class="main-search"><p class="headline-search"><a href="/${result.id}">${result.headline}</a></p><p class="summary-search"><a href="/${result.id}">${result.summary}</a></p><p class="reporters-search"><a href="/${result.id}">By ${result.reporters.join(" and ")}</a></p></div><div class="image-search"><a href="/${result.id}"><img src="${result.image}" alt></a></div>`
            // Append that to the end of the element that has the id 'article-search-view'
            document.querySelector('#article-search-view').append(div);
        });
    });
}

function modifySearchForm() {
    if (window.innerWidth <= 1920 && window.innerWidth > 1248) {
        document.querySelector('#search-navbar').style.visibility = 'visible';
        document.querySelector('.navbar-nav').style.marginRight = '0px';

        // Hide the X sign and show the bar sign
        document.querySelector('.bi-x-lg').style.display = 'none';
        document.querySelector('.navbar-toggler-icon').style.display = 'block';
    } 
    
    // I don't want the search form to be hiden away after less 1248
    else if (window.innerWidth >= 991 && window.innerWidth <= 1248) {
        document.querySelector('#search-navbar').style.visibility = 'visible';
        document.querySelector('.navbar-nav').style.marginRight = '10%';

         // Hide the X sign and show the bar sign
        document.querySelector('.bi-x-lg').style.display = 'none';
        document.querySelector('.navbar-toggler-icon').style.display = 'block';
    } else {
        document.querySelector('#search-navbar').style.visibility = 'hidden';
    }
}
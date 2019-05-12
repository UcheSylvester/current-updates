(function() {

    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    const responseContainer = document.querySelector('#response-container');
    const dateContainer = document.querySelector('#date-container');
    const backToTop = document.querySelector('.back-to-top');
    let searchedForText, searchType;


    form.addEventListener('submit', function(event) {
        
        event.preventDefault()
        searchedForText = searchField.value;

        /*** WORKING ON DATE ***/
        const fullDate = new Date();
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate()
        const date = `${year}-${month}-${day}`;
        // displaying date
        dateContainer.innerHTML = `${fullDate}`;
        dateContainer.classList.add('date')
        
        /*** WORKING ON RADIO BUTTON SELECTED (searchType) ***/
        const searchOptions = document.querySelectorAll('input[type="radio"]');
        // making sure the checked radio buttons is the selected search option
        searchOptions.forEach(searchOption => (searchOption.checked == true) ? searchType = searchOption.value : '');

        /*** TODO ***/
        // Make a fetch request
        // convert response to json
        // create function to handle success and add contents
        // create function to handle catced errors

        const url = `https://newsapi.org/v2/${searchType}?q=${searchedForText}&from=${date}&apiKey=aaea3187f1cb4430976f15adae267d04`;
        console.log(url)
        fetch(url)
            .then(response => response.json())
            .then(addContent)
            .catch(e => requestError(e))

        function addContent(data) {
            let htmlContent = '';
            const articles = data.articles;

            if(articles && articles.length >= 1) {
                // checking for previous search results and removing them from the page
                if(!responseContainer.hasChildNodes()) {
                    displayContent(articles)
                } else {
                    responseContainer.firstElementChild.remove();
                    displayContent(articles)
                }
            } else {
                // checking for previous search results and removing them from the page
                if(!responseContainer.hasChildNodes()){
                    htmlContent = `<div class="error-no-articles article">OOPS!! There is no updates on ${searchedForText}</div>`;
                } else {
                    responseContainer.firstElementChild.remove();
                htmlContent = `<div class="error-no-articles article">OOPS!! Unfortunately, there is no updates on ${searchedForText}</div>`;
                }
            }

            function displayContent(articles) {
                console.log(articles)
                htmlContent = '<ul>' + articles.map(article => 
                    `<li>
                        <div class="article">
                            <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
                            <figure>
                                <img src="${article.urlToImage}" alt="${searchedForText}">
                                <figcaption>${article.description}</figcaption>
                            </figure>
                            <a href="${article.url}" target="_blank" title="click to read more!"><p>${article.content}</p></a>
                        </div>
                    </li>`
                ).join('') + '</ul>'
            }
            // console.dir(responseContainer)

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        }


        /*** HANDLING ERRORS ***/
        function requestError(e) {
            const errorMessage = `<p class="article error-no-image">Oh... no! <em>"${e.message}"</em> error occurred on updates request for <em>"${searchedForText}"</em>. Please try again!`

            if(!responseContainer.hasChildNodes()) {
                // checking for previous search results and removing them from the page
                responseContainer.insertAdjacentHTML('afterbegin', errorMessage)
            } else {
                responseContainer.firstElementChild.remove();
            responseContainer.insertAdjacentHTML('afterbegin', errorMessage)
            }
        }
        
    })

    window.addEventListener('scroll', () => (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) ? backToTop.classList.remove('hide') : backToTop.classList.add('hide'))

    /*** BREAK DOWN OF THE ABOVE IN NORMAL FUNCTION */
    // window.addEventListener('scroll', scrollFunction);

    // function scrollFunction(e) {
    //     // console.log(e)
    //     (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) ? backToTop.classList.remove('hide') : backToTop.classList.add('hide');        
    // }
    
    backToTop.addEventListener('click', toTop);

    function toTop(e) {
        document.body.scrollTop = 0; // for safari
        document.documentElement.scrollTop = 0; // for other browsers
    }

})()


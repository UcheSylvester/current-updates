(function() {

    console.log('working...')

    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');
    const dateContainer = document.querySelector('#date-container')


    form.addEventListener('submit', function(event) {
        event.preventDefault()
        searchedForText = searchField.value;
        
        // working on date
        const fullDate = new Date();
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate()
        const date = `${year}-${month}-${day}`;

        dateContainer.innerHTML = `Today's Date : ${fullDate}`;
        dateContainer.classList.add('date')
        
        // working on search options
        const searchOptions = document.querySelectorAll('input[type="radio"]');

        let searchType;

        searchOptions.forEach(searchOption => {
            if(searchOption.checked == true) {
                searchType = searchOption.value;
            }
        })


        /****TODO ****/
        // create an XMLHttpRequest Object
        // Open a GET request to the newsapi.org
        // create the onload function
        // send request

        const newsRequest = new XMLHttpRequest();
        const url = `https://newsapi.org/v2/${searchType}?q=${searchedForText}&from=${date}&apiKey=aaea3187f1cb4430976f15adae267d04`;
        console.log(url)
        newsRequest.open('GET', url);
        newsRequest.onload = addContent;
        newsRequest.onerror = onError
        newsRequest.send()
        
        function addContent() {
            let htmlContent = '';
            const data = JSON.parse(this.responseText);
            const articles = data.articles;
            console.log(articles)

            if(data && articles && articles.length > 1) {
                htmlContent = '<ul>'+ articles.map(article => `<li>
                <div class="article">
                    <h2><a href=${article.url} title="click to read more" target="_blank">${article.title}</a></h2>
                    <figure>
                    
                    <figure>
                    <a href=${article.url} title="click to read more" target="_blank"><img src='${article.urlToImage}' alt='${searchedForText}'></a>
                    <figcaption>${article.title}</figcaption>
                    </figure>

                    <p>${article.description}</p>
                </div>
                
                <li>`).join('') +'<ul>'

            } else {
                responseContainer.querySelector('ul').remove();
                htmlContent = `<div class="error-no-articles">OOPS!! There is no updates on ${searchedForText}</div>`
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        }

        function onError() {
            console.log('oppsss')
        }



    })

})()
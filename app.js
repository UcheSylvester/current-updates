(function() {

    const form = document.querySelector('#search-form');
    const searchField = document.querySelector('#search-keyword');
    let searchedForText;
    const responseContainer = document.querySelector('#response-container');

    form.addEventListener('submit', function(event) {
        event.preventDefault()
        console.log('submiting...');
        searchedForText = searchField.value;

        /****TODO ****/
        // create an XMLHttpRequest Object
        // Open a GET request to the newsapi.org
        // create the onload function
        // send request

        const newsRequest = new XMLHttpRequest();
        const url = `https://newsapi.org/v2/everything?q=${searchedForText}&from=2019-04-30&sortBy=popularity&apiKey=aaea3187f1cb4430976f15adae267d04`;
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
                <figure>
                    <a href=${article.url} title="click to read more" target="_blank"><img src='${article.urlToImage}' alt='${searchedForText}'></a>
                    <figcaption>${article.title}</figcaption>
                </figure>
                <li>`).join('') +'<ul>'

            } else {
                htmlContent = `<div class="error-no-image">OOPS!! NO Contents Available...</div>`
            }

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        }

        function onError() {
            console.log('oppsss')
        }



    })

})()
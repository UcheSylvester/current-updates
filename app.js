// (function() {

//     console.log('working...')

    // const form = document.querySelector('#search-form');
    // const searchField = document.querySelector('#search-keyword');
    // let searchedForText;
    // const responseContainer = document.querySelector('#response-container');
    // const dateContainer = document.querySelector('#date-container')


//     form.addEventListener('submit', function(event) {
        
//         event.preventDefault()
//         searchedForText = searchField.value;

//         let searchType;
//         let htmlContent = '';
        
//         // working on date
//         const fullDate = new Date();
//         const year = new Date().getFullYear();
//         const month = new Date().getMonth() + 1;
//         const day = new Date().getDate()
//         const date = `${year}-${month}-${day}`;

//         dateContainer.innerHTML = `Today's Date : ${fullDate}`;
//         dateContainer.classList.add('date')
        
//         // making sure the checked radio buttons is the selected search option
//         const searchOptions = document.querySelectorAll('input[type="radio"]');
//         searchOptions.forEach(searchOption => {
//             if(searchOption.checked == true) {
//                 searchType = searchOption.value;
//             }
//         })


//         /****TODO ****/
//         // create an XMLHttpRequest Object
//         // Open a GET request to the newsapi.org
//         // create the onload function
//         // send request

//         const newsRequest = new XMLHttpRequest();
        // const url = `https://newsapi.org/v2/${searchType}?q=${searchedForText}&from=${date}&apiKey=aaea3187f1cb4430976f15adae267d04`;
//         console.log(url)
//         newsRequest.open('GET', url);
//         newsRequest.onload = addContent;
//         newsRequest.onerror = onError
//         newsRequest.send()


//         function addContent() {
//             const data = JSON.parse(this.responseText);
//             const articles = data.articles;
//             // console.log(articles)

//             if(data && articles && articles.length >= 1) {
//                 // Checking for initial search results and removing/replacing them with new search results
//                 if(responseContainer.hasChildNodes()) {
//                     responseContainer.firstElementChild.remove();
//                     displayResult(articles);
//                 } else {
//                     displayResult(articles)
//                 }
//                 console.dir(responseContainer)

//             } else {
//                 // checking for initial search results and removing/replacing them with "no content message"
//                 if(!responseContainer.hasChildNodes()) {
//                 htmlContent = `<div class="error-no-image">OOPS!! There is no updates on ${searchedForText}</div>`

//                 } else {
//                     responseContainer.firstElementChild.remove();
                    // htmlContent = `<div class="error-no-articles">OOPS!! There is no updates on ${searchedForText}</div>`
//                 }
       
//         }

        
//         function displayResult(articles) {
            
//             htmlContent = '<ul>'+ articles.map(article => `<li>
//             <div class="article">
//                 <h2><a href=${article.url} title="click to read more" target="_blank">${article.title}</a></h2>
//                 <figure>
                
//                 <figure>
//                 <a href=${article.url} title="click to read more" target="_blank"><img src='${article.urlToImage}' alt='${searchedForText}'></a>
//                 <figcaption>${article.title}</figcaption>
//                 </figure>

//                 <p>${article.description}</p>
//             </div>
            
//             <li>`).join('') +'<ul>'
//         }


//             responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

//         }

//         function onError() {
//             console.log(this)

//             console.log('oppsss')
//         }

//     })

// })()



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

        let searchType;
        let htmlContent = '';
        
        // working on date
        const fullDate = new Date();
        const year = new Date().getFullYear();
        const month = new Date().getMonth() + 1;
        const day = new Date().getDate()
        const date = `${year}-${month}-${day}`;

        dateContainer.innerHTML = `Today's Date : ${fullDate}`;
        dateContainer.classList.add('date')
        
        // making sure the checked radio buttons is the selected search option
        const searchOptions = document.querySelectorAll('input[type="radio"]');
        searchOptions.forEach(searchOption => {
            if(searchOption.checked == true) {
                searchType = searchOption.value;
            }
        })

        /*** TODO ***/
        // Make a fetch request
        // convert response to json
        // create function to handle success and add contents
        // create function to handle catced errors

        const url = `https://newsapi.org/v2/${searchType}?q=${searchedForText}&from=${date}&apiKey=aaea3187f1cb4430976f15adae267d04`;

        fetch(url)
            .then(response => response.json())
            .then(addContent)
            .catch(e => requestError(e))

        function addContent(data) {
            let htmlContent = '';
            const articles = data.articles;

            if(articles && articles.length >= 1) {
                if(!responseContainer.hasChildNodes()) {
                    displayContent(articles)
                } else {
                    responseContainer.firstElementChild.remove();
                    displayContent(articles)
                }
                // displayContent(articles)
            } else {
                if(!responseContainer.hasChildNodes()){
                    htmlContent = `<div class="error-no-articles article">OOPS!! There is no updates on ${searchedForText}</div>`;
                } else {
                    responseContainer.firstElementChild.remove();
                htmlContent = `<div class="error-no-articles article">OOPS!! There is no updates on ${searchedForText}</div>`;
                }
            }

            function displayContent(articles) {
                console.log(articles)
                htmlContent = '<ul>' + articles.map(article => 
                    `<li>
                        <div class="article">
                            <h2><a href="${article.url}" title="click to read more!">${article.title}</a></h2>
                            <figure>
                                <img src="${article.urlToImage}" alt="${searchedForText}">
                                <figcaption>${article.description}</figcaption>
                            </figure>
                            <p>${article.content}</p>
                        </div>
                    </li>`
                ).join('') + '</ul>'
            }
            console.dir(responseContainer)

            responseContainer.insertAdjacentHTML('afterbegin', htmlContent);

        }


        /*** HANDLING ERRORS ***/
        function requestError(e) {
            const errorMessage = `<p class="article">Oh... no! <em>"${e.message}"</em> error occurred on updates request for <em>"${searchedForText}"</em>. Please try again!`

            if(!responseContainer.hasChildNodes()) {
                responseContainer.insertAdjacentHTML('afterbegin', errorMessage)
            } else {
                responseContainer.firstElementChild.remove();
            responseContainer.insertAdjacentHTML('afterbegin', errorMessage)
            }
        }




        
    })

})()


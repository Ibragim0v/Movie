// html defaults
let elForm = document.querySelector("#main-form");
let elInputName = document.querySelector("#main-input");
let elCategory = document.querySelector("#category-select");
let elInputYear = document.querySelector("#basic-input");
let elSort = document.querySelector("#rating-sort");
let elResult = document.querySelector("#main-result");
let elWarning = document.querySelector("#main-alert");
let elList = document.querySelector("#cinema-list");
let elModal = document.querySelector(".modal-movie");
let elWrapper = document.querySelector("#bookmark-list");
let elTemplate = document.querySelector("#card-template").content;
let elBookmark = document.querySelector("#bookmark-template").content;

// slice movie list
let slicedMovies = movies


// movie need variables
let normolizedMovieList = slicedMovies.map((movieItem, index) => {
    return {
        id: ++index,
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        summary: movieItem.summary,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
        time: movieItem.runtime,
        language: movieItem.language,
        imageLink: `https://i.ytimg.com/vi/${movieItem.ytid}/mqdefault.jpg`,
        youtubeLink: `https://www.youtube.com/watch?v=${movieItem.ytid}`
    }
})

//render movies
function renderMovies(movieArray, wrapper) {
    
    let cardFragment = document.createDocumentFragment()
    wrapper.innerHTML = null;
    
    movieArray.forEach(movie => {
        let templateDiv = elTemplate.cloneNode(true)
        
        templateDiv.querySelector("#movie-img").src = movie.imageLink
        templateDiv.querySelector("#movie-name").textContent = movie.title
        templateDiv.querySelector("#movie-year").textContent = movie.year
        templateDiv.querySelector("#movie-genre").textContent = movie.categories.split("|").join(", ")
        templateDiv.querySelector("#movie-rating").textContent = movie.rating
        templateDiv.querySelector("#movie-trailer").href = movie.youtubeLink
        templateDiv.querySelector(".movie-bookmark").dataset.movieItemId = movie.id
        templateDiv.querySelector(".movie-info").dataset.movieInfoId = movie.id
        
        cardFragment.appendChild(templateDiv)
    })
    
    wrapper.appendChild(cardFragment)
    
    let lengthOfMovies =  movieArray.length;
    
    elResult.textContent = lengthOfMovies;
    
    if (lengthOfMovies == 0) {
        elWarning.textContent = "Couldn't find the movie you're looking for!"
        elWarning.classList.add("alert-danger")
    }else {
        elWarning.classList.remove("alert-danger")
    }
}

renderMovies(normolizedMovieList, elList)

//Category movies
function generateCategoriese(movies) {
    
    let categoryList = [];
    
    movies.forEach(item => {
        let splittedCategories = item.categories.split("|");
        
        splittedCategories.forEach((item) => {
            if (!(categoryList.includes(item))) {
                categoryList.push(item)
            }
        })
        categoryList.sort();
    })
    
    let categoryFragment = document.createDocumentFragment()
    
    categoryList.forEach((item) => {
        let categoryOption = document.createElement("option");
        categoryOption.value = item
        categoryOption.textContent = item
        categoryFragment.appendChild(categoryOption)
    });
    
    elCategory.appendChild(categoryFragment)
}

generateCategoriese(normolizedMovieList)

// movie name,year and selectOptions setting
var findMovies = function (titleMovie, yearMovie, genreMovie) {
    
    return normolizedMovieList.filter((movie) => {
        var doesMatchCategory = genreMovie === "All" || movie.categories.includes(genreMovie);
        
        return movie.title.match(titleMovie) && movie.year >= yearMovie && doesMatchCategory
    })
    
}

// form stop method:get and settings all form values
elForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    
    let inputValueName = elInputName.value.trim();
    let inputValueYear = elInputYear.value.trim();
    let selectOption = elCategory.value;
    let sortingType = elSort.value;
    
    
    let pattern = new RegExp(inputValueName, "gi")
    let resultArray = findMovies(pattern, inputValueYear, selectOption)
    
    if (sortingType === "high") {
        resultArray.sort(function (b, a) {return a.rating - b.rating})
    }
    
    if (sortingType === "low") {
        resultArray.sort(function (a, b) {return a.rating - b.rating})
    }
    
    
    renderMovies(resultArray, elList)
})

// save bookmark in site
let storage = window.localStorage;

let getItemFromLocalStorage = JSON.parse(storage.getItem("movieArray"));

let bookmarkedMovies = getItemFromLocalStorage || []

//add bookmark
elList.addEventListener("click", (evt) => {
    let movieID = evt.target.dataset.movieItemId;
    
    if (movieID) {
        let foundMovie = normolizedMovieList.find(item => item.id == movieID)
        
        let doesInclude = bookmarkedMovies.findIndex(item => item.id === foundMovie.id)
        
        if (doesInclude === -1) {
            bookmarkedMovies.push(foundMovie);
            storage.setItem("movieArray", JSON.stringify(bookmarkedMovies))
            renderBookmarkedMovies(bookmarkedMovies ,elWrapper)
        }
        
    }
})

//renderBookmark
function renderBookmarkedMovies(array, wrapper) {
    
    wrapper.innerHTML = null;
    let elFragment = document.createDocumentFragment()
    
    array.forEach(item => {
        let bookmarkTemplate = elBookmark.cloneNode(true);
        
        bookmarkTemplate.querySelector("#bookmark-name").textContent = item.title;
        bookmarkTemplate.querySelector("#bookmark-remove").dataset.markedRemoveId = item.id;
        
        elFragment.appendChild(bookmarkTemplate);
    })
    
    wrapper.appendChild(elFragment);
}

renderBookmarkedMovies(bookmarkedMovies ,elWrapper)

//remove bookmark
elWrapper.addEventListener("click", (evt) => {
    let removedMovieId = evt.target.dataset.markedRemoveId
    
    if (removedMovieId) {
        let indexOfMovie = bookmarkedMovies.find(item => item.id == removedMovieId)
        
        bookmarkedMovies.splice(indexOfMovie, 1)
        storage.setItem("movieArray", JSON.stringify(bookmarkedMovies))
        renderBookmarkedMovies(bookmarkedMovies ,elWrapper)
    }
})

elList.addEventListener("click", (evt) => {
    let movieInfoBtn = evt.target.dataset.movieInfoId;
    
    if (movieInfoBtn) {
        let findMovieInfo = normolizedMovieList.find(item => item.id == movieInfoBtn)

        elModal.querySelector(".modal-movie-title").textContent = findMovieInfo.title
        elModal.querySelector(".modal-movie-summary").textContent = findMovieInfo.summary
        elModal.querySelector(".modal-movie-time").textContent = findMovieInfo.time
        elModal.querySelector(".modal-movie-language").textContent = findMovieInfo.language
    }
    
})
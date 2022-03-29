// html defaults
let elForm = document.querySelector("#main-form");
let elInputName = document.querySelector("#main-input");
let elCategory = document.querySelector("#category-select");
let elInputYear = document.querySelector("#basic-input");
let elSort = document.querySelector("#rating-sort");
let elResult = document.querySelector("#main-result");
let elWarning = document.querySelector("#main-alert");
let elList = document.querySelector("#cinema-list");
let elWrapper = document.querySelector("#bookmark-list");
let elTemplate = document.querySelector("#card-template").content;
let elBookmark = document.querySelector("#bookmark-template").content;

// console.log(elWrapper);

// slice movie list
let slicedMovies = movies.slice(0, 100)

// movie need variables
let normolizedMovieList = slicedMovies.map(movieItem => {
    return {
        title: movieItem.Title.toString(),
        categories: movieItem.Categories,
        rating: movieItem.imdb_rating,
        year: movieItem.movie_year,
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
        let bookmarkBtn = templateDiv.querySelector("#movie-bookmark")

        cardFragment.appendChild(templateDiv)
    })
    
    wrapper.appendChild(cardFragment)
    
    elResult.textContent = movieArray.length;
    
    if (elResult.textContent == 0) {
        elWarning.textContent = "Couldn't find the movie you're looking for!"
    }else {
        elWarning.textContent = "The list of movies you need!"
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


// html defaults
let elList = document.querySelector("#cinema-list");
let elForm = document.querySelector("#main-form");
let elInputName = document.querySelector("#main-input");
let elCategory = document.querySelector("#category-select");
let inputValueName = elInputName.value.trim();
let elInputYear = document.querySelector("#basic-input");
let elResult = document.querySelector("#main-result");
let elWarning = document.querySelector("#main-alert");
let elTemplate = document.querySelector("#card-template").content;

let slicedMovies = movies.slice(0, 20)

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
    
    categoryList.forEach(function (item){
        let categoryOption = document.createElement("option");
        categoryOption.value = item
        categoryOption.textContent = item
        categoryFragment.appendChild(categoryOption)
    });
    
    elCategory.appendChild(categoryFragment)
}

generateCategoriese(normolizedMovieList)

function renderMovies(movieArray, wrapper) {
    
    const FRAGMENT = document.createDocumentFragment()
    wrapper.innerHTML = null;
    
    movieArray.forEach(movie => {
        let templateDiv = elTemplate.cloneNode(true)
        
        templateDiv.querySelector("#movie-img").src = movie.imageLink
        templateDiv.querySelector("#movie-name").textContent = movie.title
        templateDiv.querySelector("#movie-year").textContent = movie.year
        templateDiv.querySelector("#movie-genre").textContent = movie.categories.split("|").join(", ")
        templateDiv.querySelector("#movie-rating").textContent = movie.rating
        templateDiv.querySelector("#movie-trailer").href = movie.youtubeLink
        
        FRAGMENT.appendChild(templateDiv)
    })
    
    wrapper.appendChild(FRAGMENT)
    
    elResult.textContent = movieArray.length;
    
    if (elResult.textContent == 0) {
        elWarning.textContent = "Couldn't find the movie you're looking for!"
    }else {
        elWarning.textContent = "The list of movies you need!"
    }
}

elForm.addEventListener("submit", (evt) => {
    evt.preventDefault()
    
    let selectCategory = elCategory.value
    let categorisedMovies = []
    
    if (selectCategory == "All") {
        categorisedMovies = normolizedMovieList
    }else {
        categorisedMovies = normolizedMovieList.filter(function (item) {
            return item.categories.split("|").includes(selectCategory)
        })
    }
    
    
    renderMovies(categorisedMovies, elList)
})

// elForm.addEventListener("submit", (evt) => {
//     evt.preventDefault();

//     let inputValueYear = elInputYear.value.trim();

//     //if enter text alert add
//     if (isNaN(inputValueYear)) {
//         alert("enter number")
//     }

//     let filteredMovies = normolizedMovieList.filter(item =>  item.year >= inputValueYear)

//     renderMovies(filteredMovies, elList)
// })
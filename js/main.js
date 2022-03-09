var elList = document.querySelector("#cinema-list")

var newMovieList = movies.slice(0, 10)

function renderMovies(array, place) {
    elList.innerHTML = null;
    for (const item of newMovieList) {
        var newLi = document.createElement("li");
        newLi.setAttribute("class", "col-5 mb-4")
        
        var newDiv = document.createElement("div")
        newDiv.setAttribute("class", "card")
        
        var newIMG = document.createElement("img")
        newIMG.setAttribute("src", `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`)
        newIMG.setAttribute("class", "card-img-top")
        newIMG.setAttribute("alt", `Movie img`)
        
        var newHeading = document.createElement("h4")
        newHeading.classList.add("card-title")
        newHeading.textContent = item.Title
        
        var newPY = document.createElement("p")
        newPY.setAttribute("class", "card-text fs-5 d-flex align-items-center")
        newPY.textContent = item.movie_year;
        
        var newPR = document.createElement("p")
        newPR.setAttribute("class", "card-text fs-5 d-flex align-items-center")
        newPR.textContent = item.imdb_rating;
        
        var newInnerDiv = document.createElement("div")
        newInnerDiv.classList.add("card-body")
        newInnerDiv.append(newHeading);
        newInnerDiv.append(newPY);
        newInnerDiv.append(newPR);

        var newBtnGroup = document.createElement("div")
        newBtnGroup.setAttribute("class", "d-flex justify-content-center mb-3")
        var newBtnOne = document.createElement("a")
        newBtnOne.setAttribute("class", "btn btn-outline-primary")
        newBtnOne.textContent = "Watch Trailer";
        newBtnOne.setAttribute("href", `https://www.youtube.com/watch?v=${item.ytid}`)

        var newBtnTwo = document.createElement("a")
        newBtnTwo.textContent = "Watch Film";

        newBtnTwo.setAttribute("class", "btn btn-outline-danger")
        var newBtnThree = document.createElement("a")
        newBtnThree.textContent = "Buy Film";

        newBtnThree.setAttribute("class", "btn btn-outline-warning")
        newBtnGroup.appendChild(newBtnOne)
        newBtnGroup.appendChild(newBtnTwo)
        newBtnGroup.appendChild(newBtnThree)
        
        
        
        newDiv.appendChild(newIMG)
        newDiv.appendChild(newInnerDiv)
        newDiv.appendChild(newBtnGroup)
        
        newLi.appendChild(newDiv)
        elList.appendChild(newLi)
    }
}

renderMovies(newMovieList, elList)
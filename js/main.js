// html defaults
let elList = document.querySelector("#cinema-list")
let elForm = document.querySelector("#main-form")
let elInput = document.querySelector("#main-input")
let inputValue = elInput.value.trim()
let elSpan = document.querySelector("#main-result")

elForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();
    
    let newMovies = movies.filter(function (item) {
        return item.Title == elInput.value
    })
    
    function renderMovies(array, place) {
        let number = 1;
        elList.innerHTML = null;
        for (const item of newMovies) {
            elSpan.textContent = number++;
    
            let newLi = document.createElement("li");
            newLi.setAttribute("class", "col-5 mb-4")
            
            let newDiv = document.createElement("div")
            newDiv.setAttribute("class", "card")
            
            let newIMG = document.createElement("img")
            newIMG.setAttribute("src", `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`)
            newIMG.setAttribute("class", "card-img-top")
            newIMG.setAttribute("alt", `Movie img`)
            
            let newHeading = document.createElement("h4")
            newHeading.classList.add("card-title")
            newHeading.textContent = item.Title

            let newPY = document.createElement("p")
            newPY.setAttribute("class", "card-text fs-5 d-flex align-items-center")
            newPY.textContent = item.movie_year;
            
            let newPR = document.createElement("p")
            newPR.setAttribute("class", "card-text fs-5 d-flex align-items-center")
            newPR.textContent = item.imdb_rating;
            
            let newInnerDiv = document.createElement("div")
            newInnerDiv.classList.add("card-body")
            newInnerDiv.append(newHeading);
            newInnerDiv.append(newPY);
            newInnerDiv.append(newPR);
    
            let newBtnGroup = document.createElement("div")
            newBtnGroup.setAttribute("class", "d-flex gap-1 justify-content-center mb-3")

            let newBtnOne = document.createElement("a")
            newBtnOne.setAttribute("class", "btn btn-outline-primary")
            newBtnOne.textContent = "Watch Trailer";
            newBtnOne.setAttribute("href", `https://www.youtube.com/watch?v=${item.ytid}`)
    
            let newBtnTwo = document.createElement("a")
            newBtnTwo.textContent = "More Info";
            newBtnTwo.setAttribute("class", "btn btn-outline-danger")
    
            let newBtnThree = document.createElement("a")
            newBtnThree.textContent = "Bookmarked";
            newBtnThree.setAttribute("class", "btn btn-outline-warning")
    
            newBtnGroup.appendChild(newBtnOne)
            newBtnGroup.appendChild(newBtnTwo)
            newBtnGroup.appendChild(newBtnThree)
            
            
            
            newDiv.appendChild(newIMG)
            newDiv.appendChild(newInnerDiv)
            newDiv.appendChild(newBtnGroup)
            
            newLi.appendChild(newDiv)
            place.appendChild(newLi)
        }
    }
    
    renderMovies(newMovies, elList)
})

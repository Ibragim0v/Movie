// html defaults
let elList = document.querySelector("#cinema-list")
let elForm = document.querySelector("#main-form")
let elInput = document.querySelector("#main-input")
let inputValue = elInput.value.trim()
let elSpan = document.querySelector("#main-result")

elForm.addEventListener("submit", (evt)=>{
    evt.preventDefault();

    // search film name
    let newMovies = movies.filter(function (item) {
        return item.Title == elInput.value
    })
    
    function renderMovies(array, place) {

        //number films
        let number = 1;

        // started null
        elList.innerHTML = null;

        for (let item of array) {
            elSpan.textContent = number++;
    
            // create <li> element
            let newLi = document.createElement("li");
            newLi.setAttribute("class", "col-5 mb-4")
            
            // create <div> element
            let newDiv = document.createElement("div")
            newDiv.setAttribute("class", "card")
            
            // create <img> element
            let newIMG = document.createElement("img")
            newIMG.setAttribute("src", `https://i.ytimg.com/vi/${item.ytid}/mqdefault.jpg`)
            newIMG.setAttribute("class", "card-img-top")
            newIMG.setAttribute("alt", `Movie img`)
            
            // create <h4> element
            let newHeading = document.createElement("h4")
            newHeading.classList.add("card-title")
            newHeading.textContent = item.Title

            // create <p> element
            let newPY = document.createElement("p")
            newPY.setAttribute("class", "card-text fs-5 d-flex align-items-center")
            newPY.textContent = item.movie_year;
            
            // create <p> element
            let newPR = document.createElement("p")
            newPR.setAttribute("class", "card-text fs-5 d-flex align-items-center")
            newPR.textContent = item.imdb_rating;
            
            // create <div> element
            let newInnerDiv = document.createElement("div")
            newInnerDiv.classList.add("card-body")
            newInnerDiv.append(newHeading);
            newInnerDiv.append(newPY);
            newInnerDiv.append(newPR);
    
            // create <div> element for btn
            let newBtnGroup = document.createElement("div")
            newBtnGroup.setAttribute("class", "d-flex gap-1 justify-content-center mb-3")

            // create <a> element
            let newBtnOne = document.createElement("a")
            newBtnOne.setAttribute("class", "btn btn-outline-primary")
            newBtnOne.textContent = "Watch Trailer";
            newBtnOne.setAttribute("href", `https://www.youtube.com/watch?v=${item.ytid}`)
    
            // create <a> element
            let newBtnTwo = document.createElement("a")
            newBtnTwo.textContent = "More Info";
            newBtnTwo.setAttribute("class", "btn btn-outline-danger")
    
            // create <a> element
            let newBtnThree = document.createElement("a")
            newBtnThree.textContent = "Bookmarked";
            newBtnThree.setAttribute("class", "btn btn-outline-warning")
    
            // add element their parent
            newBtnGroup.appendChild(newBtnOne)
            newBtnGroup.appendChild(newBtnTwo)
            newBtnGroup.appendChild(newBtnThree)
            
            // add element their parent
            newDiv.appendChild(newIMG)
            newDiv.appendChild(newInnerDiv)
            newDiv.appendChild(newBtnGroup)
            
            // add element their parent
            newLi.appendChild(newDiv)
            place.appendChild(newLi)
        }
    }
    
    renderMovies(newMovies, elList)
})
const accessKey = "2Z2Xil52-sHEbFGREy2NknU6f6x5nvjTpmPqFVdtUYQ"

const formEl = document.querySelector("form")
const inputEl = document.getElementById("search-input")
const searchResults = document.querySelector(".search-results")
const showMore = document.getElementById("show-more-button")
const returnHome = document.getElementById("return-home-button")

let inputData = ""
let page = 1;

async function searchImages(){
   inputData = inputEl.value
   const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`

   const response = await fetch(url)
   const data = await response.json()

   const results = data.results

   if (page === 1){
      searchResults.innerHTML = ""
   }

   results.map((result) => {
      const imageWrapper = document.createElement('div')
      imageWrapper.classList.add("search-result")

      const image = document.createElement('img')
      image.src = result.urls.small
      image.alt = result.alt_description

      const imageLink = document.createElement('a')
      imageLink.href = result.links.html
      imageLink.taget = "_blank"
      imageLink.textContent = result.alt_description

      imageWrapper.appendChild(image)
      imageWrapper.appendChild(imageLink)
      searchResults.append(imageWrapper)
   })

   page ++
   if (page>1){
      showMore.style.display = "block"
      returnHome.style.display = "block"
   }

}

async function firstLoad(){
   for (let i =0; i<3; i++){
      const url = `https://api.unsplash.com/photos/random?client_id=${accessKey}`
      const response = await fetch(url)
      const data = await response.json()

      const imageWrapper = document.createElement('div')
      imageWrapper.classList.add("search-result")

      const image = document.createElement('img')
      image.src = data.urls.small
      image.alt = data.alt_description

      const imageLink = document.createElement('a')
      imageLink.href = data.links.html
      imageLink.taget = "_blank"
      imageLink.textContent = data.alt_description

      imageWrapper.appendChild(image)
      imageWrapper.appendChild(imageLink)
      searchResults.append(imageWrapper)
   }
}


formEl.addEventListener("submit", (event) =>{
   event.preventDefault()
   page = 1;
   searchImages()

})

firstLoad()

showMore.addEventListener('click', searchImages)

returnHome.addEventListener('click', () => {
   window.scrollTo({
      top:0, 
      left:0,
      behavior: 'smooth'
   })
})
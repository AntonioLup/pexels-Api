const button = document.querySelector("#hoverBtn")
const hover = document.querySelector("h2")
    
button.addEventListener("mouseenter", () =>{
   hover.classList.add("hoverH2")
})
button.addEventListener("mouseleave", () =>{
    hover.classList.remove("hoverH2")
})

// 
const auth = "563492ad6f91700001000001ce7fe91fb05b4aa0ac85709cd7038709"
const gallery = document.querySelector(".gallery")
const searchInput = document.querySelector(".search-input")
const form = document.querySelector(".search-form")
let searchValue;
const more = document.querySelector(".more")
let page = 1
let fetchLink
let currentSearch

searchInput.addEventListener("input", updateInput)
form.addEventListener("submit", (e) => {
    e.preventDefault()
    currentSearch = searchValue
    searchPhoto(searchValue)
})
more.addEventListener("click", loadMore)

function updateInput(e){
  searchValue = e.target.value;
}

async function fetchAPI(url){
  const dataFetch = await fetch(url, {
    method: "GET",
    headers:{
        Accept: "application/json",
        Authorization: auth
    }
  });
  const data = await dataFetch.json()
  return data
}

function generatePictures(data){
    data.photos.forEach(photo => {
        const galleryImg = document.createElement("div")
        galleryImg.classList.add("gallery-img")
        galleryImg.innerHTML = `
        <img src=${photo.src.large}></img>
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        `;
        gallery.appendChild(galleryImg)
    });
}

async function curatedPhotos(){
    fetchLink = "https://api.pexels.com/v1/curated?per_page=15&page=1"
    const data = await fetchAPI(fetchLink)
    generatePictures(data)
}
async function searchPhoto(query){
    clear()
    fetchLink = `https://api.pexels.com/v1/search?query=${query}+query&per_page=15&page=1`
    const data = await fetchAPI(fetchLink)
    generatePictures(data)

}

function clear(){
    gallery.innerHTML = "";
    searchInput.value = "";
}

async function loadMore(){
page++ 
if(currentSearch){
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${page}`
}else{
    fetchLink = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
}
const data = await fetchAPI(fetchLink)
generatePictures(data)
}

curatedPhotos()


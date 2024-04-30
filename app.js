// ====================================================== //
// ==================== Declarations ==================== //
// ====================================================== //
const searchQueryInp = document.getElementById("searchQueryInp");
const heroDisplayContainer = document.getElementById("heroDisplayContainer");
const publickey = "2555e84c834b5289fc4fcd3c63782251";
const privatekey = process.env.MARVELPRIVATEKEY; // Because I have to host it on github and idk CI/CD yet
const baseURL = "https://gateway.marvel.com/v1/public/characters?";
let debounceID;
// ====================================================== //
// ================== fn to fetch data ================== //
// ====================================================== //

async function getData(query) {
  let ts = new Date().getTime();
  const hashedkey = CryptoJS.MD5(ts + privatekey + publickey).toString();
  let queryURL;
  if (!query) {
    queryURL = `${baseURL}ts=${ts}&apikey=${publickey}&hash=${hashedkey}`;
    // console.log(queryURL);
  } else {
    queryURL = `${baseURL}nameStartsWith=${query}&ts=${ts}&apikey=${publickey}&hash=${hashedkey}`;
  }

  let response = await (await fetch(queryURL)).json();

  if (response.code === 200) {
    renderResult(response.data.results);
  } else {
    console.log(`Error in fetching + status code : ${response.code}`);
  }
}
// ====================================================== //
// ================ fn to display results =============== //
// ====================================================== //

function renderResult(data) {
  // Clear the existing content
  while (heroDisplayContainer.firstChild) {
    heroDisplayContainer.removeChild(heroDisplayContainer.firstChild);
  }
  // Case of No Result found
  if (data.length === 0) {
    const noResult = document.createElement("h2");
    noResult.className = "font-weight-bold text-white";
    noResult.textContent = "No result found";
    heroDisplayContainer.appendChild(noResult);
    return;
  }
  // Fetching local storage to check for favorites
  const storedFavArray = localStorage.getItem("favArray");
  let favArray = [];
  if (!storedFavArray) {
    localStorage.setItem("favArray", JSON.stringify(favArray));
  } else {
    favArray = JSON.parse(storedFavArray);
  }

  // Create and append card for each hero
  data.forEach((hero) => {
    // Searching if its favourite
    let isFavourite = favArray.some((item) => item.id === hero.id);

    // ------ creating element to append ----- //
    const card = document.createElement("div");
    card.className = "card m-2";
    card.style.width = "14rem";

    const img = document.createElement("img");
    img.className = "card-img-top mt-3";
    img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
    img.alt = hero.name;

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const title = document.createElement("h5");
    title.className = "card-title";
    title.textContent = hero.name;

    const button = document.createElement("button");
    button.className = "btn btn-outline-dark mb-2";
    button.textContent = isFavourite
      ? "Remove from Favourites"
      : "Add to Favourites";

    // ----- to add to favourites ---- //

    button.addEventListener("click", function () {
      toggleFav(hero, button);
    });

    const aboutBtn = document.createElement("button");
    aboutBtn.className = "btn btn-outline-dark";
    aboutBtn.textContent = "About";
    aboutBtn.addEventListener("click", () => {
      //store the data of that hero in session storage to be loaded by about page
      let herodetails = {
        id: hero.id,
        name: hero.name,
        description: hero.description,
        thumbnail: hero.thumbnail,
        comics: hero.comics.available,
        series: hero.series.available,
        stories: hero.stories.available,
      };
      const dataToStore = JSON.stringify(herodetails);
      sessionStorage.setItem("about", dataToStore);
      window.location.assign("./about.html");
    });

    cardBody.appendChild(title);
    cardBody.appendChild(button);
    cardBody.appendChild(aboutBtn);

    card.appendChild(img);
    card.appendChild(cardBody);

    heroDisplayContainer.appendChild(card);

    isFavourite = false;
  });
}

// ----- function to add to favourite ---- //
function toggleFav(hero, button) {
  const herodetails = {
    id: hero.id,
    name: hero.name,
    thumbnail: {
      path: hero.thumbnail.path,
      extension: hero.thumbnail.extension,
    },
  };
  let favArray;
  let storedFavArray = localStorage.getItem("favArray");
  favArray = JSON.parse(storedFavArray);

  let isFavourite = favArray.some((item) => item.id === hero.id);
  button.textContent = isFavourite
    ? "Add to Favourites"
    : "Remove from Favourites";

  // -------- add if not fav already otherwise removed------- //
  if (isFavourite) {
    favArray = favArray.filter((item) => item.id !== hero.id); // remove the hero
  } else {
    favArray.push(herodetails); // add the hero
  }
  localStorage.setItem("favArray", JSON.stringify(favArray));
}

// ====================================================== //
// ============== Search Bar functionality ============== //
// ====================================================== //
searchQueryInp.addEventListener("input", handleSearch);
function handleSearch() {
  clearTimeout(debounceID);
  debounceID = setTimeout(() => {
    console.log(searchQueryInp.value);
    getData(searchQueryInp.value);
  }, 1000);
}
// ====================================================== //
// ==================== On load calls ==================== //
// ====================================================== //
window.onload = () => {
  searchQueryInp.value = "";
  getData(null);
};

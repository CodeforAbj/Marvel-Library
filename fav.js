// ====================================================== //
// ==================== Declarations ==================== //
// ====================================================== //

const heroDisplayContainer = document.getElementById("heroDisplayContainer");
// ====================================================== //
// ================== working logic ================= //
// ====================================================== //

// ------- Render calling function ------- //

function loadFavourites() {
  let favArray;
  let storedFavArray = localStorage.getItem("favArray");
  favArray = JSON.parse(storedFavArray);
  renderResult(favArray);
}

// ----------- Render function ----------- //
function renderResult(data) {
  // Clear the existing content
  while (heroDisplayContainer.firstChild) {
    heroDisplayContainer.removeChild(heroDisplayContainer.firstChild);
  }
  // Case of No Result found
  if (data.length === 0) {
    const noResult = document.createElement("h2");
    noResult.className = "font-weight-bold text-white";
    noResult.textContent = "No favourtes selected yet";
    heroDisplayContainer.appendChild(noResult);
    return;
  }

  // Create and append card for each hero
  data.forEach((hero) => {
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
    button.className = "btn btn-outline-dark";
    button.textContent = "Remove from Favourites";

    // ----- to remove from favourites ---- //

    button.addEventListener("click", function () {
      removeFromFav(hero);
    });

    cardBody.appendChild(title);
    cardBody.appendChild(button);

    card.appendChild(img);
    card.appendChild(cardBody);

    heroDisplayContainer.appendChild(card);
  });
}

// ----- function to remove from favourite ---- //
function removeFromFav(hero) {
  let favArray;
  let storedFavArray = localStorage.getItem("favArray");
  favArray = JSON.parse(storedFavArray);

  favArray = favArray.filter((item) => item.id !== hero.id); // remove the hero

  localStorage.setItem("favArray", JSON.stringify(favArray));

  loadFavourites();
}
// ====================================================== //
// ==================== On load calls ==================== //
// ====================================================== //
window.onload = () => {
  loadFavourites();
};

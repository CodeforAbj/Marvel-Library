// ====================================================== //
// ==================== Declarations ==================== //
// ====================================================== //

import getData from "./modules/getData";
// ====================================================== //
// ================ fn to display results =============== //
// ====================================================== //
const heroDisplayContainer = document.getElementById("heroDisplayContainer");
export default function renderResult(data) {
  // Clear the existing content
  while (heroDisplayContainer.firstChild) {
    heroDisplayContainer.removeChild(heroDisplayContainer.firstChild);
  }

  // Create and append card for each hero
  data.forEach((hero) => {
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
    button.textContent = "Add to Favourites";

    cardBody.appendChild(title);
    cardBody.appendChild(button);

    card.appendChild(img);
    card.appendChild(cardBody);

    heroDisplayContainer.appendChild(card);
  });
}

// ====================================================== //
// ==================== On load calls ==================== //
// ====================================================== //
renderResult(getData(null));

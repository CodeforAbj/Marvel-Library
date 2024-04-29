// ====================================================== //
// ==================== Declarations ==================== //
// ====================================================== //

const heroDisplayContainer = document.getElementById("heroDisplayContainer");
// ====================================================== //
// ================== working logic ================= //
// ====================================================== //

// ------- Render calling function ------- //

function loadAbout() {
  let aboutDetails;
  let storedaboutDetails = sessionStorage.getItem("about");
  aboutDetails = JSON.parse(storedaboutDetails);
  renderResult(aboutDetails);
}

// ----------- Render function ----------- //
function renderResult(hero) {
  // Clear the existing content
  while (heroDisplayContainer.firstChild) {
    heroDisplayContainer.removeChild(heroDisplayContainer.firstChild);
  }

  // ------ creating element to append ----- //
  const card = document.createElement("div");
  card.className = "card m-2";
  card.style.maxWidth = "60vw";

  const row = document.createElement("div");
  row.className = "row g-0";

  const col1 = document.createElement("div");
  col1.className = "col-sm-5 p-4";

  const img = document.createElement("img");
  img.className = "card-img-top h-90";
  img.src = "images/sample.svg";
  img.src = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;
  img.alt = hero.name;

  col1.appendChild(img);

  const col2 = document.createElement("div");
  col2.className = "col-sm-7";

  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const title = document.createElement("h1");
  title.className = "card-title";
  title.textContent = hero.name;

  const cardText = document.createElement("div");
  cardText.className = " text-justify mb-2";
  cardText.textContent = hero.description;

  const cardcomics = document.createElement("div");
  cardcomics.className = " text-justify";
  cardcomics.textContent = `Comics available : ${hero.comics}`;

  const cardstories = document.createElement("div");
  cardstories.className = " text-justify";
  cardstories.textContent = `Stories available : ${hero.stories}`;

  const cardseries = document.createElement("div");
  cardseries.className = " text-justify";
  cardseries.textContent = `Series available : ${hero.series}`;

  cardBody.appendChild(title);
  cardBody.appendChild(cardText);
  cardBody.appendChild(cardcomics);
  cardBody.appendChild(cardseries);
  cardBody.appendChild(cardstories);

  col2.appendChild(cardBody);

  row.appendChild(col1);
  row.appendChild(col2);

  card.appendChild(row);

  heroDisplayContainer.appendChild(card);
}

// ====================================================== //
// ==================== On load calls ==================== //
// ====================================================== //
window.onload = () => {
  loadAbout();
};

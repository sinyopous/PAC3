//-----------------VARIABLES-----------------
let pokemonIndex;
const pokeButton = document.getElementById("pokeButton");
let raiseButton = document.getElementById("raiseNumber");
let lowerButton = document.getElementById("lowerNumber");
let luckyButton = document.getElementById("luckyButton");
let pokeFrontArrow = document.getElementById("pokeFrontArrow0");
let pokeBackArrow = document.getElementById("pokeBackArrow");
let swapButton = document.getElementById("swapCardsButton");
let pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=100000";
let pokeListUrl = "pokelist.html";
let randomNumArray = [];
let directionsArray = [];
let cardHTML = `<section class="pokeCardFront">
  <h2 class="pokeName">venusaur</h2>
  <img
    class="pokePortrait"
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/3.png"
    alt="pokemon image"
  />
  <section class="idTypeFlexbox">
    <p class="pokeId">#0023</p>
    <img
      src="assets\expand_more_FILL0_wght400_GRAD0_opsz48.svg"
      alt=""
    />
    <p class="pokeType">grass</p>
  </section>
</section>
<section class="pokeCardBack">
  <img
    class="pokeAssPortrait"
    src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/3.png"
    alt=""
  />
  <p class="pokeHeight">Height: <span id="pokeHeight">0</span></p>
  <p class="pokeWeight">Weight: <span id="pokeWeight">0</span></p>
</section>
`;

//----------------FUNCTIONS--------------------

async function pokedexLog() {
  let object = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000");
  let pokedex = await object.json();
  console.dir(pokedex);
  let searchPokemon = document.getElementById("pokemonInput").value;
  document.getElementById("printer").innerHTML = searchPokemon;
  pokemonIndex = pokedex.results.findIndex(
    (pokemon) => pokemon.name === searchPokemon
  );
  console.log(pokemonIndex);
}

const raiseNumber = () => {
  document.getElementById("randomSearchInput").innerHTML++;
};

const lowerNumber = () => {
  if (document.getElementById("randomSearchInput").innerHTML > 0) {
    document.getElementById("randomSearchInput").innerHTML--;
  }
};

const getRandomPokeId = () => {
  return Math.floor(Math.random() * 1279);
};

const CreateRandomNumArray = () => {
  let randomNum = document.getElementById("randomSearchInput").innerHTML;
  let i = 0;
  randomNumArray = [];
  while (randomNum > i) {
    let num = getRandomPokeId();
    if (randomNumArray.every((x) => x !== num)) {
      randomNumArray.push(num);
      i++;
    }
  }

  console.dir(randomNumArray);
};

const fetchPokeIdArray = (api, idsArray) => {
  //directionsArray = [];
  fetch(api)
    .then((x) => x.json())
    .then((y) => {
      //console.dir(y);
      idsArray.forEach((id) => {
        directionsArray.push(y.results[id].url);
      });
    });
  //console.dir(directionsArray);
};

const searchByIndex = () => {
  fetch("https://pokeapi.co/api/v2/pokemon?limit=100000")
    .then((pokedex) => pokedex.json())
    .then((pokemon) => {
      let searchPokemon = document.getElementById("pokemonInput").value;
      let targetPokemon = pokemon.results[+(searchPokemon - 1)].url;
      fetch(targetPokemon)
        .then((x) => x.json())
        .then((y) => {
          console.log(y);
          let i = 0;
          do {
            document.getElementById("printer").innerHTML +=
              " " + y.types[i].type.name;
            i++;
          } while (i < y.types.length);

          document.getElementById("printer").innerHTML += "<br>" + y.height;
        });
    });
};

const changeUrl = (url) => {
  document.location.href = url;
};

const createPokeCard = (array) => {
  for (let i = 0; i < array.length; i++) {
    let pokeCard = document.createElement("section");
    document.getElementById("pokeListBox").appendChild(pokeCard);
    pokeCard.setAttribute("id", `pokeCard${i}`);
    document.getElementById(
      `pokeCard${i}`
    ).innerHTML = `<section id="pokeCardFront${i} "class="pokeCardFront">
    <h2 id="pokeName${i}" class="pokeName"></h2>
    <img
      id="pokePortrait${i}"
      class="pokePortrait"
      src=""
      alt="pokemon image"
    />
    <section class="idTypeFlexbox">
      <p id="pokeId${i}" class="pokeId"></p>
      <img
        id="pokeFrontArrow${i}"
        class= "arrows frontArrow"
        src="assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
        alt=""
      />
      <p id="pokeType${i}" class="pokeType"></p>
    </section>
  </section>
  <section class="pokeCardBack">
    <img
    id="pokeBackArrow${i}"
    class= "arrows backArrow"
    src="assets/expand_more_FILL0_wght400_GRAD0_opsz48.svg"
    alt=""
    />
    <img
      id="pokeAssPortrait${i}"
      class="pokeAssPortrait"
      src=""
      alt=""
    />
    <p class="pokeHeight">Height: <span id="pokeHeight${i}"></span></p>
    <p class="pokeWeight">Weight: <span id="pokeWeight${i}"></span></p>
    
  </section>
  `;
  }
};

const printPokeCards = (array) => {
  for (let i = 0; i < array.length; i++) {
    let frontImage;
    let backImage;
    console.log(`https://pokeapi.co/api/v2/pokemon/${array[i]}/`);
    fetch(`https://pokeapi.co/api/v2/pokemon/${array[i]}/`)
      .then((x) => x.json())
      .then((y) => {
        document.getElementById(`pokeName${i}`).innerHTML = y.name;
        document.getElementById(`pokePortrait${i}`).src =
          y.sprites.front_default;
        document.getElementById(`pokeId${i}`).innerHTML = `#${y.id}`;
        document.getElementById(`pokeType${i}`).innerHTML =
          y.types[0].type.name;
        document.getElementById(`pokeAssPortrait${i}`).src =
          y.sprites.back_default;
        document.getElementById(`pokeHeight${i}`).innerHTML = y.height;
        document.getElementById(`pokeWeight${i}`).innerHTML = y.weight;
        console.log(y.height);
        console.log(y.weight);
        console.log(y.name);
        console.log(y.types[0].type.name);
        console.log(y.id);
        frontImage = y.sprites.front_default;
        backImage = y.sprites.back_default;
      });
  }
};

const hideLuckyButton = () => {
  document.getElementById("pokeInputFlexbox").style.display = "none";
  document.getElementById("pokeSearchBar").style.display = "none";
};

const showSwapButton = () => {
  document.getElementById("swapCardsButton").style.display = "flex";
};

const swapCards = () => {
  console.log("working");
  let front = document.querySelectorAll(".pokeCardFront");
  let back = document.querySelectorAll(".pokeCardBack");
  if (document.querySelector(".pokeCardFront").style.display === "grid") {
    front.forEach((x) => (x.style.display = "none"));
    back.forEach((x) => (x.style.display = "grid"));
  } else {
    front.forEach((x) => (x.style.display = "grid"));
    back.forEach((x) => (x.style.display = "none"));
  }
};

const swapSingleCard = () => {
  let frontButtons = document.querySelectorAll(".frontArrow");
  let backButtons = document.querySelectorAll(".backArrow");
};

//-----------------EVENTS FUNCTIONS---------------------
const LetsGetLucky = () => {
  CreateRandomNumArray();
  fetchPokeIdArray(pokeApi, randomNumArray);
  createPokeCard(randomNumArray);
  printPokeCards(randomNumArray);
  hideLuckyButton();
  showSwapButton();
};

const clickSearchButton = () => {
  pokedexLog();
  searchByIndex();
};

const clickSwapCard = () => {
  swapCards();
};

// const clickChangeWeb = () => {
//   changeUrl(pokeListUrl);
// };
//----------------EVENTS-------------------
raiseButton.addEventListener("click", raiseNumber);
lowerButton.addEventListener("click", lowerNumber);
luckyButton.addEventListener("click", LetsGetLucky);
swapButton.addEventListener("click", clickSwapCard);
// pokeButton.addEventListener("click", clickSearchButton);

// luckyButton.addEventListener("click", clickChangeWeb);

// const findIndexOfPokemon = (searchPokemon) => {
//     pokedex.results.findIndex(pokemon => {
//         pokemon.name === searchPokemon}
//         );
// }

// const findIndexOfPokemon = (pokemonName) => {
//     pokedex.findIndex(pokemon => {
//         pokemon.name === pokemonName}
//         );
// };

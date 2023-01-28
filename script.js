//-----------------VARIABLES-----------------
let pokemonIndex;
const pokeButton = document.getElementById("pokeButton");
let raiseButton = document.getElementById("raiseNumber");
let lowerButton = document.getElementById("lowerNumber");
let luckyButton = document.getElementById("luckyButton");
let pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=100000";
let randomNumArray = [];
let directionsArray = [];

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
    randomNumArray.push(num);
    i++;
  }

  console.dir(randomNumArray);
};

const fetchPokeIdArray = (api, idsArray) => {
  directionsArray = [];
  fetch(api)
    .then((x) => x.json())
    .then((y) => {
      console.dir(y);
      idsArray.forEach((id) => {
        directionsArray.push(y.results[id].url);
      });
    });
  console.dir(directionsArray);
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
//-----------------EVENTS FUNCTIONS---------------------
const LetsGetLucky = () => {
  CreateRandomNumArray();
  fetchPokeIdArray(pokeApi, randomNumArray);
};

const clickSearchButton = () => {
  pokedexLog();
  searchByIndex();
};
//----------------EVENTS-------------------
raiseButton.addEventListener("click", raiseNumber);
lowerButton.addEventListener("click", lowerNumber);
luckyButton.addEventListener("click", LetsGetLucky);
pokeButton.addEventListener("click", clickSearchButton);

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

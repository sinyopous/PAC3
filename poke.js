const pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=10000";
const totalNumOfPokemon = 1279;
const smallArray = [1,2,3];
let numOfPokemonToFetch =
  document.getElementById("randomSearchInput").innerHTML;
let raiseButton = document.getElementById("raiseNumber");
let lowerButton = document.getElementById("lowerNumber");
let luckyButton = document.getElementById("luckyButton");
//----------------FUNCTIONS--------------------

const getRandomNum = (maxNum) => {
  return Math.floor(Math.random() * maxNum);
};

const createRandomNumsArray = (maxNum, arrayLength) => {
  let randomNumsArray = [];
  while (arrayLength > randomNumsArray.length) {
    let num = getRandomNum(maxNum);
    if (randomNumsArray.every((x) => x !== num)) {
      randomNumsArray.push(num);
    }
  }
  return randomNumsArray;
};

const consultFetch = (url) => {
  return fetch(url).then((x) => x.json());
};

const getIdsAccesUrls = () => {
  return pokeFetch.then((x) => {
    return x.results.map((y) => y.url);
  });
};

const getXRandomAccesUrls = () => {
  return idAccesUrls.then((urlList) => {
    let pokeUrls = [];
    for (let url of urlList) {
      for (let num of randomNumArray) {
        if (num === urlList.indexOf(url)) {
          pokeUrls.push(url);
        }
      }
    }
    return pokeUrls;
  });
};

const printXRandomCards = () => {
  randomIdAccesUrls.then((urlList) => {
    urlList.forEach((url) => {
      fetch(url)
        .then((x) => x.json())
        .then((y) => {
          //--------------------LOGS-----------------
          //   console.dir(y);
          //   console.log(y.name);
          //   console.log(y.id);
          //   console.log(y.sprites.front_default);
          //   console.log(y.sprites.back_default);
          //   console.log(`attack: ${y.stats[1].base_stat}`);
          //   console.log(`defense: ${y.stats[2].base_stat}`);

          //   y.types.forEach((z) => {
          //     console.log(z.type.name);
          //   });
          //-------------PRINT TEMPLATE-------------

          const out = document.getElementById("pokeListBox");
          const template = document.getElementById("templateSimpleCard");
          const clonedTemplate = template.content.cloneNode(true);

          let card = clonedTemplate.querySelector(".pokeSimpleCard");
          let image = clonedTemplate.querySelector(".pokePortrait");
          let pokeName = clonedTemplate.querySelector(".pokeName2");

          card.setAttribute("id", y.id);
          if (y.sprites.front_default) {
            image.setAttribute("src", y.sprites.front_default);
          } else {
            image.setAttribute(
              "src",
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png"
            );
          }
          pokeName.innerHTML = y.name;
          // card.addEventListener('click', funcionasion);

          out.appendChild(clonedTemplate);
        });
    });
  });
};

const swapDisplay = (target) => {
  document.getElementById("pokeInputFlexbox").style.display = "none";
  document.getElementById("pokeSearchBar").style.display = "none";
  let simpleCards = document.querySelectorAll(".pokeSimpleCard");
  simpleCards.forEach((x) => (x.style.display = "none"));

  document.querySelector(".pokeStatsCard").style.display = "flex";
  document.getElementById(`${target.id}`).style.display = "none";
};

//------------------GET LUCKY BUTTON----------------------
const raiseNumber = () => {
  if (numOfPokemonToFetch < totalNumOfPokemon)
  {document.getElementById("randomSearchInput").innerHTML++;
  numOfPokemonToFetch++;}
};

const lowerNumber = () => {
  if (document.getElementById("randomSearchInput").innerHTML > 1) {
    document.getElementById("randomSearchInput").innerHTML--;
    numOfPokemonToFetch--;
  }
};

const LetsGetLucky = () => {
  hideScreenElements();
  randomNumArray = createRandomNumsArray(
    totalNumOfPokemon,
    numOfPokemonToFetch
  );
  randomIdAccesUrls = getXRandomAccesUrls();
  printXRandomCards();
};


const luckyButtonPlay = (array) => {
  if (document.getElementById("orderedPokemonCheck").checked === true) {
    orderedPokemon(array);
  } else {
    LetsGetLucky();
  }
};

//----------------------WORK IN ORDERD POKELIST, CREATE A FUNC THAT GENERATES AN ARRAY OF NUMBERS FROM 0 TO MAX OF POKEMON-------------

const orderedPokemon = (array) => {
  hideScreenElements();
  //------------------------------MANIPULATE ORDEREDARRAY TO BE THE LENGTH OF INPUT------------------
  orderedArray = orderedArray.filter(num => num <= numOfPokemonToFetch);
  randomNumArray = orderedArray;
  console.dir(randomNumArray);
  randomIdAccesUrls = getXRandomAccesUrls();
  printXRandomCards();
};

const generateOrderedArray = (num) => {
  let array = [];
  for (let i = 0; i < num; i++){
    array.push(i);
  }
  return array
}

const hideScreenElements = () => {
  document.getElementById("pokeInputFlexbox").style.display = "none";
  document.getElementById("pokeSearchBar").style.display = "none";
  let simpleCards = document.querySelectorAll(".pokeSimpleCard");
  simpleCards.forEach((x) => (x.style.display = "none"));
};

//-------------------VARIABLES-------------------------------

let pokeFetch = consultFetch(pokeApi);
let randomNumArray = createRandomNumsArray(
  totalNumOfPokemon,
  numOfPokemonToFetch
);

let idAccesUrls = getIdsAccesUrls();
let randomIdAccesUrls = getXRandomAccesUrls();
let orderedArray = generateOrderedArray(totalNumOfPokemon);
//-----------------EVENT LISTENERS-------------------------
raiseButton.addEventListener("click", raiseNumber);
raiseButton.addEventListener("drag", raiseNumber);
lowerButton.addEventListener("click", lowerNumber);
lowerButton.addEventListener("drag", lowerNumber);
luckyButton.addEventListener("click", luckyButtonPlay);

//--------------COM USAR LA INFO QUE RETORNA UNA PROMESA (.then)-----------------------

idAccesUrls.then((x) => console.dir(x));

//--------------------------------------------------------------------------
//--------------------------LOGCHECKS---------------------------------------
console.dir(randomNumArray);
randomIdAccesUrls.then((x) => console.dir(x));
printXRandomCards();

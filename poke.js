const pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=10000";
const totalNumOfPokemon = 1279;
let mainScreen = true;
const dittoFace =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png";
const dittoAss =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/132.png";
const dittoShinyFace =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png";
const dittoShinyAss =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/back/shiny/132.png";
let numOfPokemonToFetch =
  document.getElementById("randomSearchInput").innerHTML;
let raiseButton = document.getElementById("raiseNumber");
let lowerButton = document.getElementById("lowerNumber");
let luckyButton = document.getElementById("luckyButton");
let searchByNameButton = document.getElementById("pokeButton");
let nameInputField = document.getElementById("pokemonInput");
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
            image.setAttribute("src", dittoShinyFace);
          }
          pokeName.innerHTML = y.name;

          out.appendChild(clonedTemplate);

          //----------------------PRINT STATSCARD TEMPLATE----------------------

          const templateStats = document.getElementById("pokeStatsCard");
          const clonedTemplateStats = templateStats.content.cloneNode(true);

          let cardStats = clonedTemplateStats.querySelector(".pokeStatsCard");
          let imageStatsFront =
            clonedTemplateStats.querySelector("#imageStatsFront");
          let imageStatsBack =
            clonedTemplateStats.querySelector("#imageStatsBack");
          let imageStatsFrontShiny = clonedTemplateStats.querySelector(
            "#imageStatsFrontShiny"
          );
          let imageStatsBackShiny = clonedTemplateStats.querySelector(
            "#imageStatsBackShiny"
          );
          let pokeNameStats =
            clonedTemplateStats.querySelector("#pokeNameStat");
          let pokeIdStats = clonedTemplateStats.querySelector("#pokeIdStat");
          let pokeTypeStats =
            clonedTemplateStats.querySelector("#pokeTypeStat");
          let pokeAttackStats =
            clonedTemplateStats.querySelector("#pokeAttackStat");
          let pokeDefenseStats =
            clonedTemplateStats.querySelector("#pokeDefenseStat");

          cardStats.setAttribute("id", `stats${y.id}`);
          printImage(imageStatsFront, y.sprites.front_default, dittoFace);
          printImage(imageStatsBack, y.sprites.back_default, dittoAss);
          printImage(
            imageStatsFrontShiny,
            y.sprites.front_shiny,
            dittoShinyFace
          );
          printImage(imageStatsBackShiny, y.sprites.back_shiny, dittoShinyAss);
          pokeNameStats.innerHTML += y.name;
          pokeIdStats.innerHTML += y.id;
          let i = 0;
          do {
            pokeTypeStats.innerHTML += `${y.types[i].type.name}<br>`;
            i++;
          } while (y.types.length > i);

          pokeAttackStats.innerHTML += y.stats[1].base_stat;
          pokeDefenseStats.innerHTML += y.stats[2].base_stat;

          out.appendChild(clonedTemplateStats);
        });
    });
  });
};

const swapDisplay = (target) => {
  console.log(target.id);
  console.log(`stats${target.id}`);
  document.getElementById("pokeInputFlexbox").style.display = "none";
  document.getElementById("pokeSearchBar").style.display = "none";
  let simpleCards = document.querySelectorAll(".pokeSimpleCard");
  simpleCards.forEach((x) => (x.style.display = "none"));
  document.getElementById(`stats${target.id}`).style.display = "grid";
};

//------------------GET LUCKY BUTTON----------------------
const raiseNumber = () => {
  if (numOfPokemonToFetch < totalNumOfPokemon) {
    document.getElementById("randomSearchInput").innerHTML++;
    numOfPokemonToFetch++;
  }
};

const lowerNumber = () => {
  if (document.getElementById("randomSearchInput").innerHTML > 1) {
    document.getElementById("randomSearchInput").innerHTML--;
    numOfPokemonToFetch--;
  }
};

const LetsGetLucky = () => {
  hideScreenElements();
  document.querySelectorAll(".pokeSimpleCard").forEach((x) => x.remove());
  document.querySelectorAll(".pokeStatsCard").forEach((x) => x.remove());
  mainScreen = false;
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

//----------------------ORDERED POKELIST-------------

const orderedPokemon = (array) => {
  hideScreenElements();
  document.querySelectorAll(".pokeSimpleCard").forEach((x) => x.remove());
  document.querySelectorAll(".pokeStatsCard").forEach((x) => x.remove());
  mainScreen = false;
  orderedArray = orderedArray.filter((num) => num < numOfPokemonToFetch);
  randomNumArray = orderedArray;
  console.dir(randomNumArray);
  randomIdAccesUrls = getXRandomAccesUrls();
  printXRandomCards();
};

const generateOrderedArray = (num) => {
  let array = [];
  for (let i = 0; i < num; i++) {
    array.push(i);
  }
  return array;
};

const hideScreenElements = () => {
  document.getElementById("pokeInputFlexbox").style.display = "none";
  document.getElementById("pokeSearchBar").style.display = "none";
  let simpleCards = document.querySelectorAll(".pokeSimpleCard");
  simpleCards.forEach((x) => (x.style.display = "none"));
  let statsCards = document.querySelectorAll(".pokeStatsCard");
  statsCards.forEach((x) => (x.style.display = "none"));
};

//-------------------SEACH BY NAME------------------------

const getNmesAccsUrls = () => {
  return idAccesUrls.then((urlList) => {
    let pokeUrls = [];
    for (let url of urlList) {
      randomNumArray.then((x) => {
        for (let num of x) {
          if (num === urlList.indexOf(url)) {
            pokeUrls.push(url);
          }
        }
      });
    }

    return pokeUrls;
  });
};

const getAllNmesArr = (url) => {
  return consultFetch(url).then((x) => {
    return x.results.map((y) => y.name);
  });
};

const getSearchNmesArr = (name) => {
  let allNmesArr = getAllNmesArr(pokeApi);

  return allNmesArr.then((x) => {
    //console.dir(x);
    //console.log(name);
    let indexList = [];
    for (let i = 0; i < x.length; i++) {
      if (x[i].includes(name)) {
        indexList.push(i);
      }
    }
    //console.dir(allNmesArr);
    //console.dir(indexList);
    return indexList;
  });
};

const searchByName = () => {
  hideScreenElements();
  document.querySelectorAll(".pokeSimpleCard").forEach((x) => x.remove());
  document.querySelectorAll(".pokeStatsCard").forEach((x) => x.remove());
  mainScreen = false;
  let nameToSearch = document.getElementById("pokemonInput").value;
  console.log(nameToSearch);
  // randomNumArray = //GET THE ID/S OF POKEMON/S IN AN ARRAY
  //   randomIdAccesUrls = getXRandomAccesUrls();
  // printXRandomCards();
};

const searchByActualInputName = () => {
  document
    .querySelectorAll(".pokeSimpleCard")
    .forEach((x) => (x.style.display = "none"));

  mainScreen = false;
  let nameToSearch = document.getElementById("pokemonInput").value;
  nameToSearch = nameToSearch.toLowerCase();
  console.log(nameToSearch);

  if (!nameToSearch) {
    document
      .querySelectorAll(".pokeSimpleCard")
      .forEach((x) => (x.style.display = "flex"));
  } else if (nameToSearch) {
    randomNumArray = getSearchNmesArr(nameToSearch);

    randomIdAccesUrls = getNmesAccsUrls();
    randomIdAccesUrls.then((x) => {
      console.dir(x);
    });
    printXRandomCards();
  }
};

const getSearchNamesList = (name) => {
  allPkeArr = consultFetch(pokeApi);
  return allPkeArr.then((x) => {
    //console.dir(x);
    //console.dir(x.results);
    let list = x.results.filter((y) => y.name.includes(name));
    //console.dir(list);
    return list;
  });
};

const getNamesUrls = (name) => {
  let searchNameList = getSearchNamesList(name);
  return searchNameList.then((x) => {
    console.dir(x);
    let list = [];
    x.forEach((y) => list.push(y.url));
    return list;
  });
};

const searchByActualInputName2 = () => {
  document
    .querySelectorAll(".pokeSimpleCard")
    .forEach((x) => (x.style.display = "none"));

  let nameToSearch = document.getElementById("pokemonInput").value;
  nameToSearch = nameToSearch.toLowerCase();

  if (nameToSearch.length <= 2) {
    document.querySelectorAll(".pokeSimpleCard").forEach((x) => x.remove());
    document.querySelectorAll(".pokeStatsCard").forEach((x) => x.remove());
    printXRandomCards();
  } else if (nameToSearch.length > 2) {
    document.querySelectorAll(".pokeSimpleCard").forEach((x) => x.remove());
    document.querySelectorAll(".pokeStatsCard").forEach((x) => x.remove());
    let namesUrl = getNamesUrls(nameToSearch);
    namesUrl.then((urlList) => {
      console.dir(urlList);
      //---------------------PRINTING TIME brrrrrrrrrr---------------------
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
              image.setAttribute("src", dittoShinyFace);
            }
            pokeName.innerHTML = y.name;

            out.appendChild(clonedTemplate);

            //----------------------PRINT STATSCARD TEMPLATE----------------------

            const templateStats = document.getElementById("pokeStatsCard");
            const clonedTemplateStats = templateStats.content.cloneNode(true);

            let cardStats = clonedTemplateStats.querySelector(".pokeStatsCard");
            let imageStatsFront =
              clonedTemplateStats.querySelector("#imageStatsFront");
            let imageStatsBack =
              clonedTemplateStats.querySelector("#imageStatsBack");
            let imageStatsFrontShiny = clonedTemplateStats.querySelector(
              "#imageStatsFrontShiny"
            );
            let imageStatsBackShiny = clonedTemplateStats.querySelector(
              "#imageStatsBackShiny"
            );
            let pokeNameStats =
              clonedTemplateStats.querySelector("#pokeNameStat");
            let pokeIdStats = clonedTemplateStats.querySelector("#pokeIdStat");
            let pokeTypeStats =
              clonedTemplateStats.querySelector("#pokeTypeStat");
            let pokeAttackStats =
              clonedTemplateStats.querySelector("#pokeAttackStat");
            let pokeDefenseStats =
              clonedTemplateStats.querySelector("#pokeDefenseStat");

            cardStats.setAttribute("id", `stats${y.id}`);
            printImage(imageStatsFront, y.sprites.front_default, dittoFace);
            printImage(imageStatsBack, y.sprites.back_default, dittoAss);
            printImage(
              imageStatsFrontShiny,
              y.sprites.front_shiny,
              dittoShinyFace
            );
            printImage(
              imageStatsBackShiny,
              y.sprites.back_shiny,
              dittoShinyAss
            );
            pokeNameStats.innerHTML += y.name;
            pokeIdStats.innerHTML += y.id;
            let i = 0;
            do {
              pokeTypeStats.innerHTML += `${y.types[i].type.name}<br>`;
              i++;
            } while (y.types.length > i);

            pokeAttackStats.innerHTML += y.stats[1].base_stat;
            pokeDefenseStats.innerHTML += y.stats[2].base_stat;

            out.appendChild(clonedTemplateStats);
          });
      });
    });

    // randomIdAccesUrls = getNmesAccsUrls();
    // printXRandomCards();
  }
};

//-----------------SEARCH BY ID IN URLBAR------------------------

const searchUrlId = () => {
  let params = new URLSearchParams(document.location.search);
  let id = params.get("pokeID");
  return id;
};

//----------------------RETURN BUTTON-----------------------

const pokeReturn = () => {
  let pokesOnScreen = document.querySelectorAll(".pokeSimpleCard");
  let allPokeStatsCards = document.querySelectorAll(".pokeStatsCard");
  let onePokeSimpleCard = document.querySelector(".pokeSimpleCard");
  let onePokeStatsCard = document.querySelector(".pokeStatsCard");
  let id = searchUrlId();
  if (
    !onePokeSimpleCard &&
    !onePokeStatsCard
  ) {
    document.location.reload();
  } else {
    if (id) {
      if (onePokeSimpleCard.style.display === "none") {
        console.log(id);
        console.log("case1");
        pokesOnScreen.forEach((x) => (x.style.display = "flex"));
        allPokeStatsCards.forEach((x) => (x.style.display = "none"));
      } else {
        console.log("case2");
        window.history.back();
      }
    } else {
      if (mainScreen) {
        if (onePokeSimpleCard.style.display === "none") {
          console.log("case3");
          pokesOnScreen.forEach((x) => (x.style.display = "flex"));
          allPokeStatsCards.forEach((x) => (x.style.display = "none"));
          document.getElementById("pokeSearchBar").style.display = "block";
          document.getElementById("pokeInputFlexbox").style.display = "flex";
        } else {
          console.log("case4");
          document.location.reload();
        }
      } else if (!mainScreen) {
        if (onePokeSimpleCard.style.display === "none") {
          console.log("case5");
          pokesOnScreen.forEach((x) => (x.style.display = "flex"));
          allPokeStatsCards.forEach((x) => (x.style.display = "none"));
        } else {
          console.log("case6");
          document.location.reload();
        }
      } else {
        document.location.reload();
      }
    }
  }
};

//-------------------TEMPLATEPRINT FUNCTIONS----------------------

const printImage = (imageToPrint, spriteSrc, dittoSprite) => {
  if (spriteSrc) {
    imageToPrint.setAttribute("src", spriteSrc);
  } else {
    imageToPrint.setAttribute("src", dittoSprite);
  }
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
//searchByNameButton.addEventListener("click", searchByName);
nameInputField.addEventListener("input", searchByActualInputName2);

//--------------COM USAR LA INFO QUE RETORNA UNA PROMESA (.then)-----------------------

idAccesUrls.then((x) => console.dir(x));

//--------------------------------------------------------------------------
//--------------------------LOGCHECKS---------------------------------------
// console.dir(randomNumArray);
// randomIdAccesUrls.then((x) => console.dir(x));

//---------------------INITIAL LOAD-------------------------------

if (searchUrlId()) {
  hideScreenElements();
  let oneIdArray = [];
  oneIdArray.push(searchUrlId() - 1);
  randomNumArray = oneIdArray;
  printXRandomCards();
} else {
  printXRandomCards();
}

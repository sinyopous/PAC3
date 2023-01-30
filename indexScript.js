console.log("hola");
let randomNumsArray = [];
let pokeUrls = [];
let pkApi = "https://pokeapi.co/api/v2/pokemon?limit=10000";
let pkUrl = "https://pokeapi.co/api/v2/pokemon/";
let z = [];
//-----------------FUNCTIONS---------------

const consultFetch = (url) => {
  fetch(url)
    .then((x) => x.json())
    .then((y) => {
      console.dir(y);
      return y;
    });
};

const getRandomPokeIds = () => {
  return Math.floor(Math.random() * 1279);
};

const getIdsAccesUrls = (url) => {
  fetch(url)
    .then((x) => x.json())
    .then((y) => {
      z = y.results.map((x) => x.url);
      //console.dir(z);
      return z;
    });
};

const getIdsUrls = (array, url) => {
  //let pokeUrls = [];
  fetch(url)
    .then((x) => x.json())
    .then((y) => {
      z = y.results.map((x) => x.url);
      console.dir(z);
      for (let u of z) {
        //console.log(u);
        //console.log(z.indexOf(u))
        for (let pkmon of array) {
          //console.log(pkmon);
          if (pkmon === z.indexOf(u)) {
            //console.log(u)
            pokeUrls.push(u);
          }
        }
      }
      console.dir(pokeUrls);
    });

  //console.log(pokeUrls);
};

const print10RandomCards = (array, url) => {
  fetch(url)
    .then((x) => x.json())
    .then((y) => {
      z = y.results.map((x) => x.url);
      console.dir(z);
      for (let u of z) {
        for (let pkmon of array) {
          if (pkmon === z.indexOf(u)) {
            pokeUrls.push(u);
          }
        }
      }

      console.dir(pokeUrls);
      //-------------------
      pokeUrls.forEach((ab) => {
        fetch(ab)
          .then((cd) => cd.json())
          .then((ef) => {
            console.dir(ef);
            console.log(ef.name);
            console.log(ef.id);
            console.log(ef.sprites.front_default);
            console.log(ef.sprites.back_default);
            console.log(`attack: ${ef.stats[1].base_stat}`);
            console.log(`defense: ${ef.stats[2].base_stat}`);

            ef.types.forEach((jk) => {
              console.log(jk.type.name);
            });
            //-------------PRINT TEMPLATE-------------

            const out = document.getElementById("pokeListBox");
            const template = document.getElementById("templateSimpleCard");
            const clonedTemplate = template.content.cloneNode(true);

            let card = clonedTemplate.querySelector(".pokeSimpleCard");
            let image = clonedTemplate.querySelector(".pokePortrait");
            let pokeName = clonedTemplate.querySelector(".pokeName2");

            card.setAttribute("id", ef.id);
            if (ef.sprites.front_default) {
              image.setAttribute("src", ef.sprites.front_default);
            } else {
              image.setAttribute("src", "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/shiny/132.png")
            }
            pokeName.innerHTML = ef.name;
            // card.addEventListener('click', funcionasion);

            out.appendChild(clonedTemplate);
          });
      });
    });

  //console.log(pokeUrls);
};

const createRandomIdsArray = () => {
  randomNumsArray = [];
  while (10 > randomNumsArray.length) {
    let num = getRandomPokeIds();
    if (randomNumsArray.every((x) => x !== num)) {
      randomNumsArray.push(num);
    }
  }
  console.dir(randomNumsArray);
};

const fetchArray = (array) => {
  array.forEach((link) => {
    console.log(link);
    fetch(link)
      .then((x) => x.json())
      .then((y) => {
        console.log(y);
      });
  });
};

async function fetchAsync(url) {
  let x = await fetch(url);
  let y = await x.json();
  return y;
}

const fetchArrayAsync = (url, array) => {
  array.forEach((id) => {
    fetchAsync(`${url}${id}`).then((x) => {
      console.log(x);
      return x;
    });
  });
};

const swapDisplay = (target) => {
  document.getElementById("pokeInputFlexbox").style.display = "none";
  document.getElementById("pokeSearchBar").style.display = "none";
  let simpleCards = document.querySelectorAll(".pokeSimpleCard");
  simpleCards.forEach( x => x.style.display = 'none');

  document.querySelector('.pokeStatsCard').style.display = 'flex';
  document.getElementById(`${target.id}`).style.display = 'none';
}

createRandomIdsArray();
//getIdsUrls(randomNumsArray, pkApi);
print10RandomCards(randomNumsArray, pkApi);
//consultFetch(pkApi);
//getIdsAccesUrls(pkApi);
//console.dir(pokeUrls);
//fetchArray(pokeUrls);
//fetchArrayAsync(pkUrl, randomNumsArray);

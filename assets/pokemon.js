const searchInput = document.getElementById('search-input'); 
const searchBtn = document.getElementById('search-button'); 
const pokemonName = document.getElementById('pokemon-name');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const spriteContainer = document.getElementById('sprite-container')
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');

let pokemonData;
let pokemonInnerData;

const pokemonUrl = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon"



const fetchPokemon = async () => {
    try {
      const res = await fetch(pokemonUrl);
      const data = await res.json();
      pokemonData = data; 
    //   console.log(pokemonData)

    const searchVal = searchInput.value.trim()
    const wantedRegex = /\bPikachu\b|\b[0-9]+\b/

    if (!wantedRegex.test(searchVal)) {
         return alert('Pokémon not found')
    } else {
        reset()
        let newSearchVal = isNaN(parseFloat(searchVal)) ? searchVal.toLowerCase() : parseFloat(searchVal)
        // console.log(newSearchVal)
        // console.log(typeof newSearchVal)
        pokemonData.results.map(({id, name, url}, index) => {
            
            if (newSearchVal === name || newSearchVal === id) {
                const refinedName = name.split(" ").join("-")
                pokemonName.innerHTML = refinedName;
                pokemonId.innerHTML = `#${id}`; 

                fetch(url)
                .then((newRes) => newRes.json())
                .then((newData) => {
                pokemonInnerData = newData
                // console.log(pokemonInnerData)
                
                weight.innerHTML = pokemonInnerData.weight;
                height.innerHTML = pokemonInnerData.height;
                hp.innerHTML = pokemonInnerData.stats[0].base_stat;
                attack.innerHTML = pokemonInnerData.stats[1].base_stat;
                defense.innerHTML = pokemonInnerData.stats[2].base_stat;
                specialAttack.innerHTML = pokemonInnerData.stats[3].base_stat;
                specialDefense.innerHTML = pokemonInnerData.stats[4].base_stat;
                speed.innerHTML = pokemonInnerData.stats[5].base_stat;
                spriteContainer.innerHTML = `<img id="sprite" src="${pokemonInnerData.sprites.front_default}" alt="${name} front_default sprite">`; 

                let typesArr = pokemonInnerData.types;
                for (let i = 0; i < typesArr.length; i++ ) {
                    let typeCategory = `<button class="tp1">${typesArr[i].type.name}</button>`
                    types.innerHTML += typeCategory
                }
                 })  
            } else {
                 return ""
            }
        });
    
    };

    } catch (err) {
      console.log(err);
    }
  };


const reset = () => {
    pokemonName.innerHTML = "";
    pokemonId.innerHTML = ``; 
    weight.innerHTML = "";
    height.innerHTML = "";
    hp.innerHTML = "";
    attack.innerHTML = "";
    defense.innerHTML = "";
    specialAttack.innerHTML = "";
    specialDefense.innerHTML = "";
    speed.innerHTML = "";
    spriteContainer.innerHTML = ``; 
    types.innerHTML = "";
}

searchBtn.addEventListener('click', fetchPokemon)
let pokemonRepository = (function() {
  let pokemonList = [
  { name: "Bulbasaur", height: 2, type: ["grass", "poison"] },
  { name: "Charizard", height: 5, type: ["fire", "flying"] },
  { name: "Torterra", height: 7, type: ["water", "ground"] },
  { name: "Morgrem", height: 2, type: ["dark", "fairy"] },
  ];

  return {
    add: function(pokemon) {
      return pokemonList.push(pokemon);
    },
    getAll: function() {
      return pokemonList;
    }
  }
}) ();

pokemonRepository.getAll().forEach(function(pokemon) {
  let size = "";
  let list = document.querySelector('.pokemon-list');
  let listItem = document.createElement('li');
  let button = document.createElement('button');
  button.innerText = "pokemonList.name";
  button.classList.add('pokemon-button');
  });

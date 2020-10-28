let pokemonRepository = (function() {
  let repository = [
  { name: "Bulbasaur", height: 2, type: ["grass", "poison"] },
  { name: "Charizard", height: 5, type: ["fire", "flying"] },
  { name: "Torterra", height: 7, type: ["water", "ground"] },
  { name: "Morgrem", height: 2, type: ["dark", "fairy"] },
  ];

  return {
    add: function(pokemon) {
      return repository.push(pokemon);
    },
    getAll: function() {
      return repository;
    },
    addListItem: function(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      },
    showDetails: function(pokemon) {
      console.log(pokemon);
    },
  }
}) ();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });

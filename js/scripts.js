let pokemonRepository = (function() {
  let repository = [
  { name: "Bulbasaur", height: 2, type: ["grass", "poison"] },
  { name: "Charizard", height: 5, type: ["fire", "flying"] },
  { name: "Torterra", height: 7, type: ["water", "ground"] },
  { name: "Morgrem", height: 2, type: ["dark", "fairy"] },
  ];

    function add(pokemon) {
      return repository.push(pokemon);
    };
    function getAll() {
      return repository;
    };
    function showDetails(pokemon) {
      console.log(pokemon);
    };
    function addListItem(pokemon) {
      let pokemonList = document.querySelector('.pokemon-list');
      let listItem = document.createElement('li');
      let button = document.createElement('button');
      button.innerText = pokemon.name;
      button.classList.add('pokemon-button');
      listItem.appendChild(button);
      pokemonList.appendChild(listItem);
      button.addEventListener('click', function() {
        showDetails(pokemon);
      });
      }; 
      return {
        add: add,
        getAll: getAll,
        showDetails: showDetails,
        addListItem: addListItem
      };
}) ();

pokemonRepository.getAll().forEach(function(pokemon) {
  pokemonRepository.addListItem(pokemon);
  });

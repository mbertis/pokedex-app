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
  if (pokemon.height > 6) {
    size = " This is a big Pokemon!";
  } else if (pokemon.height < 3) {
    size = " This is a small Pokemon!";
  } else {
    size = " This is an average Pokemon!";
  }
  );
});

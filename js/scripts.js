let pokemonList = [
  { name: "Bulbasaur", height: 2, type: ["grass", "poison"] },
  { name: "Charizard", height: 5, type: ["fire", "flying"] },
  { name: "Torterra", height: 7, type: ["water", "ground"] },
  { name: "Morgrem", height: 2, type: ["dark", "fairy"] },
];

pokemonList.forEach(function(pokemon) {
  let size = "";
  if (pokemon.height > 6) {
    size = " This is a big Pokemon!";
  } else if (pokemon.height < 3) {
    size = " This is a small Pokemon!";
  } else {
    size = " This is an average Pokemon!";
  }
  let color = "";
  for (let k = 0; k < pokemon.type.length; k++){
      if(pokemon.type[k] == "water"){
          color = '<span style = "color: blue;">'
      } else if(pokemon.type[k] == "fire"){
          color = '<span style = "color: red;">'
      } else if(pokemon.type[k] == "grass"){
          color = '<span style = "color: green;">'
      } else if(pokemon.type[k] == "dark"){
          color = '<span style = "color: purple;">'
      }
  }
  document.write(
      '<div class = "box">' +
    pokemon.name +
      " (height: " +
      pokemon.height +
      ")" +
      size +
      color +
      "<br>" +
      pokemon.type +
      "<br>" +
      '</div>'
  );
});

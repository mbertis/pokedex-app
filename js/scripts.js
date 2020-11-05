let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
 
  function add(pokemon) {
    return repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
    
    let modalBody = $(".modal-body");
    let modalTitle = $(".modal-title");
    
    modalTitle.empty();
    modalBody.empty();

    let nameElement = $("<h1>" + pokemon.name + "<h1>");

    let imageElement = $("<img class = 'modal-image' style = 'width:50%'>");
    imageElement.attr("src", pokemon.imageUrl);

    let heightElement = $("<p>" + "Height: " + pokemon.height + "</p>");

    modalTitle.append(nameElement);
    modalBody.append(imageElement);
    modalBody.append(heightElement);
   });
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("btn-outline-info");
    listItem.appendChild(button);
    listItem.classList.add("group-list-item");
    pokemonList.appendChild(listItem);
    button.addEventListener("click", function () {
      showDetails(pokemon); // this will allow the modal to be displayed when pokemon button is clicked
  });
}

  function loadList() {
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function loadDetails(item) {
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        item.imageUrl = details.sprites.front_default;
        item.height = details.height;
        item.types = details.types;
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

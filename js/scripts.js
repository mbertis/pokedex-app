let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  let modalContainer = document.querySelector("#modal-container");
  
  function add(pokemon) {
    return repository.push(pokemon);
  }

  function getAll() {
    return repository;
  }

  function showDetails(pokemon) {
    loadDetails(pokemon).then(function () {
       modalContainer.innerHTML = ""; // this clears out anything inside modal
       let modal = document.createElement('div'); // creates div for modal
       modal.classList.add('modal');

       let closeButtonElement = document.createElement('button');
       closeButtonElement.classList.add('modal-close');
       closeButtonElement.innerText = "Close";
       closeButtonElement.addEventListener("click", hideModal);

       let titleElement = document.createElement('h1');
       titleElement.innerText = pokemon.name;

       let contentElement = document.createElement('p');
       contentElement.innerText = pokemon.height;

       modal.appendChild(closeButtonElement);
       modal.appendChild(titleElement);
       modal.appendChild(contentElement);
       modalContainer.appendChild(modal); // appends modal to modalContainer element

       modalContainer.classList.add("is-visible"); // allows modal-container to be visible
     });
   }

  function hideModal(pokemon) {
    modalContainer.classList.remove("is-visible");
  }

  function addListItem(pokemon) {
    let pokemonList = document.querySelector(".pokemon-list");
    let listItem = document.createElement("li");
    let button = document.createElement("button");
    button.innerText = pokemon.name;
    button.classList.add("pokemon-button");
    listItem.appendChild(button);
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
    //hideModal: hideModal
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

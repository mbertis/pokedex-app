let pokemonRepository = (function () {
  let repository = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=150";
  // let modalContainer = document.querySelector("#modal-container");

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



    
    //   modalContainer.innerHTML = ""; // this clears out anything inside modal
    //   let modal = document.createElement("div"); // creates div for modal
    //   modal.classList.add("modal");

    //   let closeButtonElement = document.createElement("button");
    //   closeButtonElement.classList.add("modal-close");
    //   closeButtonElement.innerText = "Close";
    //   closeButtonElement.addEventListener("click", hideModal); // will allow modal to be closed by clicking on 'close' button

    //   let titleElement = document.createElement("h1");
    //   titleElement.innerText = pokemon.name;

    //   let contentElement = document.createElement("p");
    //   contentElement.innerText = "Height: " + pokemon.height;

    //   let imageElement = document.createElement("img");
    //   imageElement.src = pokemon.imageUrl; // dynamically selects pokemon image url

    //   modal.appendChild(closeButtonElement);
    //   modal.appendChild(titleElement);
    //   modal.appendChild(contentElement);
    //   modal.appendChild(imageElement);
    //   modalContainer.appendChild(modal); // appends modal to modalContainer element

    //   modalContainer.classList.add("is-visible"); // allows modal-container to be visible
   });
  }

  // function hideModal() {
  //   modalContainer.classList.remove("is-visible");
  // }

  // modalContainer.addEventListener("click", (e) => {
  //   // allows modal to be closed if user clicks outside of modal
  //   let target = e.target;
  //   if (target === modalContainer) {
  //     hideModal();
  //   }
  // });

  // window.addEventListener("keydown", (e) => {
  //   // allows modal to be closed if user presses escape key
  //   if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
  //     hideModal();
  //   }
  // });

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
    // hideModal: hideModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

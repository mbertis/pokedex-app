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
      showModal(pokemon);
    });
  }

  function addListItem(pokemon) {
    pokemonRepository.loadDetails(pokemon).then(function () {
      let row = $(".row");

      let card = $(
        '<div class="card bg-dark text-white" style="width:300px; margin: 5px;"></div>'
      );
      let image = $(
        '<img class="card-img-top" alt="Card image" style="width:35%; margin-left: 30%;" />'
      );
      image.attr("src", pokemon.imageUrl);
      let cardBody = $('<div class="card-body"></div>');
      let cardTitle = $("<h4 class='card-title' >" + pokemon.name + "</h4>");
      let seeProfile = $(
        '<button type="button" class="btn btn-info" data-toggle="modal" data-target="#pokemonModal">See Profile</button>'
      );

      row.append(card);
      //Append the image to each card
      card.append(image);
      card.append(cardBody);
      cardBody.append(cardTitle);
      cardBody.append(seeProfile);

      seeProfile.on("click", function (event) {
        showDetails(pokemon);
      });
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
            image: item.imageUrl,
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
        item.types = [];
        details.types.forEach(function (typeItem) {
          item.types.push(typeItem.type.name);
        });
      })
      .catch(function (e) {
        console.error(e);
      });
  }

  function showModal(pokemon) {
    let modalBody = document.querySelector(".modal-body");
    let modalTitle = document.querySelector(".modal-title");

    modalTitle.innerHTML = "";
    modalBody.innerHTML = "";

    let nameElement = document.createElement("h1");
    nameElement.innerText = pokemon.name;

    let imageElement = document.createElement("img");
    imageElement.src = pokemon.imageUrl;

    let heightElement = document.createElement("p");
    heightElement.innerText = "Height: " + pokemon.height;

    let typeElement = document.createElement("p");
    typeElement.innerText = "Type(s): " + pokemon.types;

    modalTitle.appendChild(nameElement);
    modalBody.appendChild(imageElement);
    modalBody.appendChild(heightElement);
    modalBody.appendChild(typeElement);
  }

  return {
    add: add,
    getAll: getAll,
    showDetails: showDetails,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
    showModal: showModal,
  };
})();

pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});

function search() {
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.querySelectorAll(".card");
  for (i = 0; i < li.length; i++) {
    a = li[i].querySelector(".card-body").querySelector(".card-title");
    console.log(a.innerText);
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
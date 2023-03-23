let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=152";

    function add(pokemon) {
        if (typeof pokemon === "object" &&
        "name" in pokemon &&
        "detailsUrl" in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log("Not a pokemon.")
        }
    }
  
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector(".pokemon-list");
        let listItem = document.createElement("li");
        listItem.classList.add("list-group-item");
        let pokeButton = document.createElement("button");
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add("btn-block");
        pokeButton.classList.add("btn-primary");
        pokeButton.classList.add("pokemon-button");
        pokeButton.setAttribute("data-toggle", "modal");
        pokeButton.setAttribute("data-target", "#exampleModal");
        listItem.classList.add("col-xl-3");
        listItem.classList.add("col-lg-4");
        listItem.classList.add("col-md-6");

        listItem.appendChild(pokeButton);
        pokemonList.appendChild(listItem);
        
        pokeButton.addEventListener("click", function(event) {
            showDetails(pokemon);
        });
    }

    function showDetails(pokemon) {
        loadDetails(pokemon).then(function() {
            showModal(pokemon);
        });
    }

    function showModal(pokemon) {
        let modalBody = $(".modal-body");
        let modalTitle = $(".modal-title");
        
        modalBody.empty();
        modalTitle.empty();
        
        let pokemonName = $("<h1>" + pokemon.name + "</h1>");
        let pokemonImage = $('<img class="modal-img" style="width:50%">');
        pokemonImage.attr("src", pokemon.imageUrl);
        let pokemonHeight = $("<p>" + "<strong>" + "Height: " + pokemon.height + "</p>");
        let pokemonTypes = $("<p>" + "<strong>" + "Type/s: " + pokemon.types + "</p>");

        
        modalBody.append(pokemonImage);
        modalBody.append(pokemonHeight);
        modalTitle.append(pokemonName);
    }

    function hideModal() {
        let modalContainer = document.querySelector("#modal-conatiner");
        modalContainer.classList.add("is-visible");
    }
        
    window.addEventListener("keydown", (e) => {
       let modalContainer = document.querySelector("#modal-container");
        if (e.key === "Escape" && modalContainer.classList.contains("is-visible")) {
            hideModal();
        }
    });

    // Promise & fetch function
    function loadList() {
        return fetch(apiUrl)
        .then(function (response) {
            return response.json();
        }).then(function (json) {
            json.results.forEach(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                add(pokemon);            
            });
        }).catch(function (e) {
            console.error(e);
        });
    }

    function loadDetails(item) {
        let url = item.detailsUrl;
        return fetch(url)
        .then(function (response) {
            return response.json();
        }).then(function (details) {
            // Now we add the details to the item
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
        });
    }

    return {
        getAll: getAll,
        add: add,
        addListItem : addListItem,
        loadList: loadList,
        loadDetails: loadDetails,
        showDetails: showDetails
    };
})();


pokemonRepository.loadList().then(function() {
    // Now the data is loaded!
    pokemonRepository.getAll().forEach(function(pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
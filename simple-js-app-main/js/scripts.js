let pokemonRepository = (function () {
let pokemonList = [];
let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function add(pokemon) {
        if (typeof pokemon === 'object' && 'name' in pokemon) {
            pokemonList.push(pokemon);
        } else {
            console.log('Not a pokemon.')
        }
    }
  
    function getAll() {
        return pokemonList;
    }

    function addListItem(pokemon) {
        let pokemonList = document.querySelector('.pokemon-list');
        let listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        let pokeButton = document.createElement('button');
        pokeButton.innerText = pokemon.name;
        pokeButton.classList.add('btn-block');
        pokeButton.classList.add('btn-primary');
        pokeButton.classList.add('pokemon-button');
        pokeButton.setAttribute('data-toggle', 'modal');
        pokeButton.setAttribute('data-target', '#exampleModal');
        listItem.classList.add('col-xl-3');
        listItem.classList.add('col-lg-4');
        listItem.classList.add('col-md-6');

        listItem.appendChild(pokeButton);
        pokemonList.appendChild(listItem);
        
        pokeButton.addEventListener('click', function(event) {
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
        let pokemonImage = $('img class="modal-img" style="width: 50%">');
        pokemonImage.attr("src", pokemon.imageUrl);
        let pokemonHeight = $("<p>" + pokemon.height + "</p>");

        modalBody.appendChild(pokemonImage);
        modalBody.appendChild(pokemonHeight);
        modalTitle.appendChild(pokemonName);
        
    }

    function hideModal() {
        let modalContainer = document.querySelector("#modal-conatiner");
        modalContainer.classList.add("is-visible");
    }
        
    window.addEventListener('keydown', (e) => {
       let modalContainer = document.querySelector("#modal-container");
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
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
            console.log(e);
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




    // function showDetails(item) {
    //     pokemonRepository.loadDetails(item).then(function () {
    //         // Modal starts
    //         let modalContainer = document.querySelector('#modal-container');

    //         modalContainer.innerHTML = '';

    //         let modal = document.createElement('div');
    //         modal.classList.add('modal');

    //         let sprite = document.createElement('img');
    //         // sprite.createList.add('sprite');
    //         sprite.src = item.imageUrl;

    //         let closeButtonElement = document.createElement('button');
    //         closeButtonElement.innerText = 'X';
    //         closeButtonElement.addEventListener('click', hideModal);

    //         let titleElement = document.createElement('h1');
    //         titleElement.innerText = item.name;
            
    //         let contentElement = document.createElement('p');

    //         let pokemonTypes = '';

    //         for (let i = 0; i < item.types.length; i++) {
    //             pokemonTypes += item.types[i].type.name;

    //             if (i < item.length - 1) {
    //                 pokemonTypes += ', ';
    //             }
    //         }

    //         contentElement.innerText =
    //         'Height: ' + item.height + '\n' + '\n' + 'Types: ' + pokemonTypes;

    //         modal.appendChild(closeButtonElement);
    //         modal.appendChild(titleElement);
    //         modal.appendChild(contentElement);
    //         modalContainer.appendChild(modal);
    //         modal.apppendChild(sprite);

    //         modalContainer.classList.add('is.visible');

    //         function hideModal() {
    //             modalContainer.classList.remove('is-visible');
    //         }

    //         // Hide modal using ESC

    //         window.addEventListener('keydown', (e) => {
    //             if (
    //                 e.key === 'Escape' &&
    //                 modalContainer.classList.contains('is-visible')
    //             ) {
    //                 hideModal();
    //             }
    //         });

    //         // Hide modal by clicking 
            
    //         modalContainer.addEventListener('click', (e) => {
    //             let target = e.target;
    //             if (target === modalContainer) {
    //                 hideModal();
    //             }
    //         });

    //         document
    //         .querySelector('button.button-class')
    //         .addEventListener('click', () => {
    //             showDetails('Modal Title', 'Modal Content');
    //         });
    //     });
    // }





// pokemonRepository.add({
//     name: "Wartortle",
//     type: "water",
//     height: 1
// });

// console.log(pokemonRepository.getAll());


// pokemonRepository.getAll().foreach(function (pokemon) {
//     pokemonRepository.addListItem(pokemon);
// });




// OLD List of pokemon
//let pokemonList = [
//    {name: "Charmander", height: 6, type: ["fire"]},
//    {name: "Pikachu", height: 5, type: ["electric"]},
//    {name: "Squirtle", height: 5, type: ["water"]}
//  ];

// forEach() loop
// pokemonList.forEach(function(pokemon) {
//     if (pokemon.height > 5) {
//         document.write(pokemon.name + ' is a big pokemon!');
//     } else if (pokemon.height === 5) {
//         document.write(pokemon.name + ' is an average pokemon!');
//     } else {
//         document.write(pokemon.name + 'is a small pokemon!')
//     }
// });

//forEach() loop
//pokemonList.forEach(function(pokemon) {
//    console.log(pokemon.name + ' is ' + pokemon.height + ' inches tall and is a ' + pokemon.type + ' type.')
//  });

// OLD Loop of pokemon
//  for (let i=0; i < pokemonList.length; i++) {
//    //If the height is less than 7 and greater than 5 it is big
//    if (pokemonList[i].height <7 && pokemonList[i].height >5) {
//      document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " I'm a big one! ");
//   //If the pokemon is less than 5 then it is average
//    }else {
//      document.write(pokemonList[i].name + " - height: " + pokemonList[i].height + " I'm average. ");
//    }
//  }
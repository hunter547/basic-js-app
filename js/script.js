// An Immediately Invoked Function Expression to instantiate a pokemon repository and protect it from being accessed globally
var pokemonRepository = (function () {
	var repository = []; 
	var apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

	// Add new pokemon to the repository
	function add(pokemon) {
		repository.push(pokemon);
	} 

	function loadList() {
		return fetch(apiUrl).then(function (response) { 
			return response.json();
		}).then(function (json) { 
			json.results.forEach(function (item) {
				var pokemon = {
					name: item.name.charAt(0).toUpperCase() + item.name.slice(1),
					detailsUrl: item.url
				};
				add(pokemon);
			});
		}).catch(function (e) {
			console.error(e);
		})
	}

	// Return all pokemon in the repository
	function getAll() {
		return repository; 
	} 

	// Display all pokemon in the repository
	function addListItem(pokemon) { 
		var pokemonListItem = document.createElement('LI'); 
		var pokemonLIButton = document.createElement('BUTTON'); 
		pokemonLIButton.classList.add('pokemon-buttons');
		pokemonLIButton.innerText = pokemon.name; 
		pokemonListItem.appendChild(pokemonLIButton); 
		pokemonList.appendChild(pokemonListItem); 
		addPokemonListener(pokemonLIButton, pokemon);
	}  

	// Creates event listeners for the buttons as they are being created.
	function addPokemonListener (button, pokemon) {
		button.addEventListener('click', function() {
			showDetails(pokemon);
		});
	} 

	// A simple function that logs the contents of the pokemon objects to the console.
	function showDetails(pokemon) {
		loadDetails(pokemon).then(function () {
    		console.log(pokemon);   
    	});
	} 

	function loadDetails(item) {
		var url = item.detailsUrl;
		return fetch(url).then(function (response) {
			return response.json();
		}).then(function (details) {
	       // Now we add the details to the item
	       item.imageUrl = details.sprites.front_default;
	       item.height = details.height;
	       item.types = Object.keys(details.types);
  		}).catch(function (e) {
  		   console.error(e);
  		});
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem, 
		loadList: loadList, 
		loadDetails: loadDetails
	};
})(); 

var pokemonList = document.querySelector('.pokemon-list'); 

var pokemonLoadingMessage = document.createElement('p'); 
pokemonLoadingMessage.innerText = 'Loading...'; 
pokemonLoadingMessage.classList.add('loading-message');
var pokemonTitle = document.getElementById('title'); 
pokemonTitle.appendChild(pokemonLoadingMessage); 

pokemonRepository.loadList().then(()=>{
  // Data loaded successfully
	pokemonRepository.getAll().forEach((pokemon)=>{
  		pokemonRepository.addListItem(pokemon);
  }); 
	pokemonTitle.removeChild(pokemonLoadingMessage);
});  


 
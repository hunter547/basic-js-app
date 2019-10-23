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
			showModal(pokemon);   
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
	       item.types = details.types;
  		}).catch(function (e) {
  		   console.error(e);
  		});
	}  


	// MODALS

	function showModal(pokemon) {
		var $modalContainer = document.querySelector('#modal-container'); 
		// Clear any existing text if being used again. 
		$modalContainer.innerHTML = ''; 

		// Will close the modal container if the user clicks out side of the modal div 
		$modalContainer.addEventListener('click', (e) => {
		 	var target = e.target;
		  	if (target === $modalContainer) {
		  	hideModal();
			}
		}); 

		// Create a modal div to go into the container 
		var modal = document.createElement('div'); 
		modal.classList.add('modal'); 

		// Give the modal some content based on the pokemon and UI elements  
		var closeButton = document.createElement('BUTTON'); 
		closeButton.classList.add('modal-close'); 
		closeButton.innerText = 'Close'; 
		closeButton.addEventListener('click', hideModal);

		var modalTitle = document.createElement('H1'); 
		modalTitle.innerText = pokemon.name; 

		var modalBodyDiv = document.createElement('div'); 
		modalBodyDiv.classList.add('modal-body-div');

		var modalBody = document.createElement('P'); 
		var modalBodyTextDiv = document.createElement('div'); 
		modalBodyTextDiv.classList.add('modal-body-text-div');
		modalBodyTextDiv.appendChild(modalBody);
		modalBody.innerText = 'Height: ' + (pokemon.height / 10) + ' m';

		var modalTypeTable = document.createElement('table'); 
		modalTypeTable.classList.add('types-table');
		var modalTypeTblHead = document.createElement('th');
		modalTypeTblHead.innerText = 'Type';
		if (pokemon.types.length > 1) {
			modalTypeTblHead.innerText = 'Types';
		} 

		modalTypeTable.appendChild(modalTypeTblHead); 

		pokemon.types.forEach((type) => {
			var modalTableContent = document.createElement('td'); 
			modalTableContent.innerText = type.type.name.charAt(0).toUpperCase() + type.type.name.slice(1); 
			modalTableContent.classList.add('types-content');
			modalTypeTblHead.appendChild(modalTableContent);
		}); 

		var modalImage = document.createElement('IMG'); 
		modalImage.src = pokemon.imageUrl;

		modal.appendChild(closeButton); 
		modal.appendChild(modalTitle);
		modalBodyDiv.appendChild(modalImage);
		modalBodyDiv.appendChild(modalBodyTextDiv); 
		modalBodyDiv.appendChild(modalTypeTable); 
		modal.appendChild(modalBodyDiv);
		

		$modalContainer.appendChild(modal);

		// Display the modal after all content has been set 
		$modalContainer.classList.add('is-visible'); 
	}  


	function hideModal() {
		document.querySelector('#modal-container').classList.remove('is-visible');
	} 

	// Add a listener that will close the modal if the user presses the escape button
	window.addEventListener('keydown', (e) => {
		var $modalContainer = document.querySelector('#modal-container');
		if (e.key === 'Escape' && $modalContainer.classList.contains('is-visible')) {
			hideModal();  
		}
	});

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


 
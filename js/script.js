// An Immediately Invoked Function Expression to instantiate a pokemon repository and protect it from being accessed globally
var pokemonRepository = (function () {
	var repository = [ 
	{  	 
		name: 'Pikachu',
		height: '0.4 m', 
		type: 'electric'
	}, 
	{
		name: 'Blastoise', 
		height: '1.6 m', 
		type: 'water'
	}, 
	{
		name: 'Poliwhirl', 
		height: '1.0 m', 
		type: 'water'
	},
	{
		name: 'Ivysaur', 
		height: '1.0 m', 
		type: ['grass', 'poison']
	}, 
	{
		name: 'Gyarados', 
		height: '6.5 m', 
		type: ['water', 'flying']
	}, 
	{
		name: 'Genger',
		height: '1.5 m', 
		type: ['ghost', 'poison']
	}
	]; 

	function add(pokemon) {
		repository.push(pokemon); // Add new pokemon to the repository
	}

	function getAll() {
		return repository; // Return all pokemon in the repository
	} 

	function addListItem(pokemon) { // Display all pokemon in the repository
		var pokemonListItem = document.createElement('LI'); 
		var pokemonLIButton = document.createElement('BUTTON'); 
		pokemonLIButton.classList.add('pokemon-buttons');
		pokemonLIButton.innerText = pokemon.name; 
		pokemonListItem.appendChild(pokemonLIButton); 
		pokemonList.appendChild(pokemonListItem); 
		addPokemonListener(pokemonLIButton, pokemon);
	} 

	function addListItem(pokemon, button) { // Overload the function for when the item needs to be inserted before the button
		var pokemonListItem = document.createElement('LI'); 
		var pokemonLIButton = document.createElement('BUTTON'); 
		pokemonLIButton.classList.add('pokemon-buttons');
		pokemonLIButton.innerText = pokemon.name; 
		pokemonListItem.appendChild(pokemonLIButton); 
		pokemonList.insertBefore(pokemonListItem, button); 
		addPokemonListener(pokemonLIButton, pokemon);
	} 

	function addPokemonListener (button, pokemon) {
		button.addEventListener('click', function() {
			showDetails(pokemon);
		});
	}

	function showDetails(pokemon) {
		console.log(pokemon);
	}

	return {
		add: add,
		getAll: getAll,
		addListItem: addListItem
	};
})();

var fullRepository = pokemonRepository.getAll(); 

var newPokemon = { 
	name: 'Eevee', 
	height: '0.6 m', 
	type: 'normal'
}; 
pokemonRepository.add(newPokemon); 

var pokemonList = document.querySelector('.pokemon-list'); 

fullRepository.forEach((currentPokemon) => { 
	pokemonRepository.addListItem(currentPokemon);
}); 

var addPokemonBtn = document.createElement('BUTTON'); 
addPokemonBtn.innerText = 'Add your own pokemon'; 
pokemonList.appendChild(addPokemonBtn); 
addPokemonBtn.addEventListener('click', enterPokemon);  


function enterPokemon(){ 
	var pokemonName = enterPokemonName(); 
	if (pokemonName == null) { 
		return;
	}
	var pokemonHeight = enterPokemonHeight(); 
	if (pokemonHeight == null) {
		return;
	}
	var pokemonType = enterPokemonType(); 
	if (pokemonType == null) {
		return;
	}
	var newPokemon = { 
		name: null, 
		height: null, 
		type: [null]
	};  
	newPokemon.name = pokemonName; 
	newPokemon.height = pokemonHeight; 
	anotherType(newPokemon, pokemonType); 
	pokemonRepository.add(newPokemon); 
	pokemonRepository.addListItem(newPokemon, addPokemonBtn);
	
}; 

function enterPokemonName() { 
	var pokemonName = null; 
	while (pokemonName == null 
	|| pokemonName == ''
	|| typeof pokemonName != 'string'
	|| pokemonName.indexOf(' ') != -1
	|| pokemonName.match(/[0-9]/) != null
	|| pokemonName.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) != null) { 
		if (pokemonName == null) {
			pokemonName = prompt('Please enter a name for your pokemon', ''); 
			if (pokemonName == null) {
				return;
			}
		}
		if (pokemonName == '') {
			pokemonName = prompt('Please type at least one letter for your pokemon', ''); 
			if (pokemonName == null) {
				return;
			}
		} 
		if (pokemonName.indexOf(' ') != -1) {
			pokemonName = prompt('Please type a name with no spaces', ''); 
			if (pokemonName == null) {
				return;
			}
		}
		if (pokemonName.match(/[0-9]/) != null) {
			pokemonName = prompt('Please only enter letters for your pokemon',''); 
			if (pokemonName == null) {
				return;
			}
		}  
		if (pokemonName.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) != null) {
			pokemonName = prompt('Please only enter letters with no special characters'); 
			if (pokemonName == null) {
				return;
			}
		}
	} 
	return pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1).toLowerCase();
}; 

function enterPokemonHeight() { 
	var pokemonHeight = null;
	while (pokemonHeight == null || pokemonHeight == '' || typeof pokemonHeight != 'number') { 
		if (pokemonHeight == null) {
			pokemonHeight = prompt('Please enter a number for your pokemon\'s height',''); 
			if (pokemonHeight == null) {
				return;
			}
		}
		if (pokemonHeight == '') {
			pokemonHeight = prompt('Please type at least one number for your pokemon\'s height',''); 
			if (pokemonHeight == null) {
				return;
			}
		}
		if (pokemonHeight.match(/^\d+(\.?\d*)?$/) == null && pokemonHeight.match(/^\.{1}\d*$/) == null) {
			pokemonHeight = prompt('Please only enter numbers for your pokemon\'s height',''); 
			if (pokemonHeight == null) {
				return;
			}
		} 
		else {
			pokemonHeight = parseFloat(pokemonHeight);
		} 
	} 	
	pokemonHeight += ' m'; 
	return pokemonHeight;
}; 

function enterPokemonType() {
	var pokemonType = null; 
	while (pokemonType == null 
	|| pokemonType == '' 
	|| typeof pokemonType != 'string' 
	|| pokemonType.indexOf(' ') != -1 
	|| pokemonType.match(/[0-9]/) != null 
	|| pokemonType.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) != null) { 
		if (pokemonType == null) {
			pokemonType = prompt('Please enter a type for your pokemon',''); 
			if (pokemonType == null) {
				return;
			} 
		}
		if (pokemonType == '') {
			pokemonType = prompt('Please type at least one letter for your pokemon\'s type',''); 
			if (pokemonType == null) {
				return;
			}
		} 
		if (pokemonType.indexOf(' ') != -1) {
			pokemonType = prompt('Please type a name with no spaces', ''); 
			if (pokemonType == null) {
				return;
			}
		}
		if (pokemonType.match(/[0-9]/) != null) {
			pokemonType = prompt('Please only enter letters for your pokemon\'s type',''); 
			if (pokemonType == null) {
				return;
			}
		} 
		if (pokemonType.match(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/) != null) {
			pokemonType = prompt('Please only enter letters with no special characters',''); 
			if (pokemonType == null) {
				return;
			}
		}  
	} 
	return pokemonType;
}; 

function anotherType(pokemon, firstType){
	var anotherType = confirm('Would you like to add another type?') 
		if (!anotherType){ 
			pokemon.type = firstType.charAt(0).toUpperCase() + firstType.slice(1).toLowerCase();
		} 
		else { 
			pokemon.type[0] = firstType.charAt(0).toUpperCase() + firstType.slice(1).toLowerCase();
			while (anotherType){
				var nextType = enterPokemonType(); 
				if (nextType == null) {
					break;
				}
				if (typeof nextType != 'undefined' ) {
					pokemon.type.push(nextType.toLowerCase()); 
				}	
				anotherType = confirm('Would you like to add another type?');
			}
		}
}; 
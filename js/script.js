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

	function printAll() { // Print all pokemon in the repository
		repository.forEach((pokemon) => { 
			var displayString = '';  
			displayString = '<br />' + pokemon.name+'. '+getTypes(pokemon)+' Height: '+pokemon.height+'.'; 
			if (parseFloat(pokemon.height) > 1.0) {
				displayString += ' - Wow, that is tall!'; 
			} 
			document.write(displayString);
		});
	}

	return {
		add: add,
		getAll: getAll, 
		printAll: printAll
	};
})();

var fullRepository = pokemonRepository.getAll(); 

var newPokemon = { 
	name: 'Eevee', 
	height: '0.6 m', 
	type: 'normal'
}; 

pokemonRepository.add(newPokemon);

fullRepository.forEach((currentPokemon) => { 
	printArrayDetails(currentPokemon);
}); 

function printArrayDetails(pokemon) { 
	var displayString = '';  
	displayString = '<br />' + pokemon.name+'. '+getTypes(pokemon)+' Height: '+pokemon.height+'.'; 
	if (parseFloat(pokemon.height) > 1.0) {
		displayString = displayString.substring(0, displayString.length-1) + ' - Wow, that is tall!'; 
	} 
	document.write(displayString);
}; 

function getTypes(pokemon) { 
	var typeString = 'Type: ';
	if (pokemon.type instanceof Array) {
		pokemon.type.forEach((currentType) => {
			typeString += currentType + ' and '; 
		});
		typeString = typeString.substring(0,typeString.length-5) + '.';
	} 
	else { 
		typeString += pokemon.type+'.';
	} 
	return typeString;
};  


function enterPokemon(){ 
	document.body.innerHTML = '';
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

	pokemonRepository.printAll(); 

	var addButton = document.createElement('BUTTON'); 
	var buttonText = document.createTextNode('Add another pokemon');  
	addButton.onclick = function() {
		enterPokemon();
	}
	addButton.appendChild(buttonText); 
	document.writeln();  
	document.body.appendChild(addButton);
}; 

function enterPokemonName() { 
	var pokemonName = null; 
	while (pokemonName == null || pokemonName == '' || typeof pokemonName != 'string' || pokemonName.indexOf(' ') != -1 || pokemonName.match(/[0-9]/) != null) { 
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
	} 
	return pokemonName; 
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
		if (pokemonHeight.match(/^\d+(\.?\d*)?$/) == null) {
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
	while (pokemonType == null || pokemonType == '' || typeof pokemonType != 'string' || pokemonType.indexOf(' ') != -1 || pokemonType.match(/[0-9]/) != null) { 
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

	} 

	return pokemonType;
}; 

function anotherType(pokemon, firstType){
	var anotherType = confirm('Would you like to add another type?') 
		if (!anotherType){ 
			pokemon.type = firstType;
		} 
		else { 
			pokemon.type[0] = firstType;
			while (anotherType){
				var nextType = enterPokemonType(); 
				pokemon.type.push(nextType); 
				anotherType = confirm('Would you like to add another type?');
			}
		}
}
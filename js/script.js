// An Immediately Invoked Function Expression to instantiate a pokemon repository and 
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
		repository.push(pokemon);
	}

	function getAll() {
		return repository;
	} 

	function printAll(poke) {

	}

	return {
		add: add,
		getAll: getAll
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
	displayString = '<br />' + pokemon.name+'. '+getTypes(pokemon)+' Height: '+pokemon.height; 
	if (parseFloat(pokemon.height) > 1.0) {
		displayString += ' - Wow, that is tall!'; 
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
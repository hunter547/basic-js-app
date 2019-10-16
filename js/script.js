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
} 
];	

var repository2 = [ 
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

var fullRepository = repository.concat(repository2);

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

//printArrayDetails(repository); 
//printArrayDetails(repository2);
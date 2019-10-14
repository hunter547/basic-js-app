var repository = [ 
{ 
	name: "Pikachu",
	height: "0.4 m", 
	type: ["electric", "fire"]
}, 
{
	name: "Blastoise", 
	height: "1.6 m", 
	type: "water"
}, 
{
	name: "Poliwhirl", 
	height: "1.0 m", 
	type: ["water", "fire"]
} 
];	

var repository2 = [ 
{
	name: "Ivysaur", 
	height: "1.0 m", 
	type: ["grass", "poison"]
}, 
{
	name: "Gyarados", 
	height: "6.5 m", 
	type: ["water", "flying"]
}, 
{
	name: "Genger",
	height: "1.5 m", 
	type: ["ghost", "poison"]
}	
];

function printArrayDetails(pokemonList) { 
	var displayString = "";  
	alert(pokemonList.length + ' in this array.');
	for (var i = 0; i <= pokemonList.length -1; i++) { 
		alert(i);
		alert(pokemonList[i]); 
		displayString = "<br />" + pokemonList[i].name+" (height: "+pokemonList[i].height+")."; 
		if (parseFloat(pokemonList[i].height) > 1.0) {
			displayString += " Wow that is tall!"; 
		} 
		document.write(displayString);
	} 
}; 

function getTypes(pokemon) { 
	if (pokemon.type == []) {
		for (var i = 0; i <= pokemon.length; i++) {
			
		}
	}
};

printArrayDetails(repository); 
printArrayDetails(repository2);
var repository = [ 
	{ 
		name: 'Pikachu',
		height: '0.4 m', 
		type: 'Electric'
	}, 
	{
		name: 'Blastoise', 
		height: '1.6 m', 
		type: 'Water'
	}, 
	{
		name: 'Poliwhirl', 
		height: '1.0 m', 
		type: 'Water'
	} 
];	  

for (var i = 0; i <= repository.length; i++) {
	if (parseFloat(repository[i].height) > 1.0) {
		document.write('<br />' + repository[i].name+' (height: '+repository[i].height+'). Wow that is tall!');
	} 
	else {
		document.write('<br />' + repository[i].name+' (height: '+repository[i].height+').');
	}

};
var repository = [ 
	{ 
		name: 'Pikachu',
		hieght: '0.4 m', 
		type: 'Electric'
	}, 
	{
		name: 'Blastoise', 
		hieght: '1.6 m', 
		type: 'Water'
	}, 
	{
		name: 'Poliwhirl', 
		hieght: '1.0 m', 
		type: 'Water'
	} 
];	  

for (var i = 0; i <= repository.length; i++) {
	 document.write(repository[i].name + '<br />'); 
	 document.write(repository[i].hieght + '<br />'); 
	 document.write(repository[i].type + '<br />');
};
var fs = require('fs');
var path = require('path') ;

var files = fs.readdirSync(__dirname);
files.forEach (function(file){
	var NombreArchivo = path.basename(file, '.js');
	//console.log("carga los controllers:",NombreArchivo);
	if(NombreArchivo!=='index'){
		exports[NombreArchivo]= require('./'+NombreArchivo);
		
	}
});
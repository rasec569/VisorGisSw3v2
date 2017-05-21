
var Inmuebleclass = require('./../Clases/Inmueble');
//console.log('prueba clases ' +Usuarioclass);
var imn = new Inmuebleclass();


module.exports = {

    getregistrarinmueble: function (req, res, next) {
		imn.getregistrarinmueble(req, res, next);
	}

};



var Usuarioclass = require('./../Clases/Usuario');
//console.log('prueba clases ' +Usuarioclass);
var u = new Usuarioclass();


module.exports = {

	getregistrar: function (req, res, next) {
		u.getregistrar(req, res, next);
	},
	postregistrar: function (req, res, next) {
		u.postregistrar(req, res, next);
	},
	getinicioSec: function (req, res, next) {
		u.getinicioSec(req, res, next);
	},
	salir: function (req, res, next) {
		u.salir(req, res, next);
	},
	getpanelusuario: function (req, res, next) {
		u.getpanelusuario(req, res, next);
	},
	getpanelusuarioA: function (req, res, next) {
		u.getpanelusuarioA(req, res, next);
	}
};
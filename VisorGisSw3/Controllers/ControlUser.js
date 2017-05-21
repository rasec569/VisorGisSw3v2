
var Usuarioclass = require('./../Clases/Usuario');
//console.log('prueba clases ' +Usuarioclass);
var u = new Usuarioclass();


module.exports = {

	getregistrar: function (req, res, next) {
		u.getregistrar(req, res, next);
	},
	getregistraruser: function (req, res, next) {
		u.getregistraruser(req, res, next);
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
	getvisoradmin: function (req, res, next) {
		u.getvisoradmin(req, res, next);
	},
	getperfil: function (req, res, next) {
		u.getperfil(req, res, next);
	},

	getgestionarUs: function (req, res, next) {
		u.getUsuarios(req, res, next);
	},
	getModificar: function (req, res, next) {
		u.getModificar(req, res, next);
	},
	postModificar: function (req, res, next) {
		u.postModificar(req, res, next);
	},
	eliminarPersona : function(req, res, next){
        u.eliminar(req, res, next);
    }

};
var express = require('express');
var app = express();
//conexion MySql
var mysql = require('mysql');
// Encriptar la pass
var bcrypt = require('bcryptjs');
// Datos
var conexion = require('../Datos/conexion');

// formato fecha
var dateFormat = require('dateformat');


function Usuario(Identificacion, Nombre, Apellido, Nacimiento, User, Pass, email, telefono, tipo_usuario, fecha_registro) {
	this.Identificacion = Identificacion,
	this.Nombre = Nombre;
	this.Apellido = Apellido;
	this.Nacimiento = Nacimiento;
	this.User = User;
	this.Pass = Pass;
	this.email = email;
	this.telefono = telefono;
	this.tipo_usuario = tipo_usuario;
	this.fecha_registro = fecha_registro;

	this.getregistrar = function (req, res, next) {
		res.render('./user/registrar.jade');
	};
	this.getregistraruser = function (req, res, next) {
		console.log('trajo', req.body.tipo_usuario)

		res.render('./administrador/registrar.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user

		});
	};

	this.postregistrar = function (req, res, next) {
		console.log(req.body);
		var salt = bcrypt.genSaltSync(10);
		var pass = bcrypt.hashSync(req.body.pas, salt);

		Usuario = {
			identificacion: req.body.ide,
			nombre: req.body.nom,
			apellido: req.body.ape,
			nacimiento: req.body.nac,
			usuario: req.body.us,
			pass: pass,
			email: req.body.email,
			telefono: req.body.tel
		}
		var db = mysql.createConnection(conexion);
		db.connect();
		db.query('INSERT INTO usuario  SET ?', Usuario,

			function (err, rows, fields) {
				if (err) {
					console.error('error running query', err);

					if (err.errno == 1062) {
						req.flash('mensaje', 'Usuario registrado')
						res.render('./user/registrar.jade', { mensaje: req.flash('mensaje'), authmessage: req.flash('authmessage') });


						//res.redirect('registrar');

					} else {

						res.redirect('inicioSec');

					}
				} else {
					req.flash('mensaje', 'Registo corecto, puede iniciar sesion')
					res.redirect('inicioSec');
				}
			});
		db.end();
	};

	this.getinicioSec = function (req, res, next) {
		res.render('./user/inicioSec.jade', { mensaje: req.flash('mensaje'), authmessage: req.flash('authmessage') });

	};
	this.salir = function (req, res, next) {
		req.logout();
		res.redirect('inicioSec');
	};
	this.getpanelusuario = function (req, res, next) {
		console.log('trajo', req.body.tipo_usuario)

		res.render('./user/panel.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user

		});
	};
	this.getvisoradmin = function (req, res, next) {
		console.log('trajo', req.body.tipo_usuario)

		res.render('./administrador/visoradmin.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user

		});
	};

	this.getperfil = function (req, res, next) {
		console.log('trajo', req.body.tipo_usuario)

		res.render('./user/Perfil.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user

		});
	};

	this.getUsuarios = function (req, res, next) {
		var db = mysql.createConnection(conexion);
		db.connect();
		db.query('SELECT * FROM usuario inner join tipo_usuario on id_Tipo = tipo_usuario', function (err, rows, fields) {
			if (err) throw err;
			Usuario = rows;

			db.end();
			res.render('administrador/gestionarUs', {
				usuarios: Usuario,
				isAuthenticated: req.isAuthenticated(),
				user: req.user
			});
		});
	},
	this.getModificar = function (req, res, next) {
		var db = mysql.createConnection(conexion);

		var iden = req.params.iden;
		var Rol = null;
		db.connect();
		db.query('SELECT * FROM tipo_usuario', function (err, rows, fields) {
			if (!err) {
				Rol = rows
				var str = JSON.stringify(Rol);
				console.log(str + ' Roles');
			} else {
				res.render('home.jade');
			};

		})
		db.query('SELECT * FROM usuario WHERE identificacion = ?', iden, function (err, rows, fields) {
			if (err) throw err;
			resultado = rows;
			var me = "";
			var me2 = "";
			me = rows[0].fecha_registro;
			me2 = rows[0].nacimiento;
			var fecha2 = dateFormat(me2, 'yyyy-mm-dd');
			var fecha = dateFormat(me, 'yyyy-mm-dd');
			//var res0 =String(me);
			//var valor = res0.substring(4, 16);
			//var me= resultado.nacimiento;
			//console.log("que hizo", valor);
			db.end();
			res.render('administrador/modificar', {
				Usuario: resultado, x: fecha, y: fecha2, rol: Rol, isAuthenticated: req.isAuthenticated(),
				user: req.user
			});

		});
	},
	this.postModificar = function (req, res, next) {
		var db = mysql.createConnection(conexion);
		db.connect();
		db.query('UPDATE usuario.usuario SET nombre = "'+ req.body.nom +'", apellido = "'+ req.body.ape +'", nacimiento = "'+ req.body.nac +'" , email = "'+ req.body.email +'"  , telefono = "'+ req.body.tel +'" WHERE identificacion= ' + req.body.ide, function (err, rows, fields){
			if (err) {
				console.error('error running query', err);
			}
			res.redirect('/user/gestionar');
			db.end();
		});
		
	},
	this.eliminar = function(req, res, next){
		var db = mysql.createConnection(conexion);
		db.connect();
		db.query('DELETE FROM usuario WHERE identificacion = ?', req.body.ide, function(err, rows, fields ){
        	if (err) {
				console.error('error running query', err);
			}
			res.redirect('/user/gestionar');
			db.end();
        });
	}
	return this;
	
};

module.exports = Usuario; 

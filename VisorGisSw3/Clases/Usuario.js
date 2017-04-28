var express = require('express');
var app = express();
//conexion postgret
var mysql = require('mysql');
// Encriptar la pass
var bcrypt = require('bcryptjs');
// Datos
var conexion = require('../Datos/conexion');
var db = mysql.createConnection(conexion);


function Usuario(Identificacion, Nombre, Apellido, User, Pass, email, telefono, tipo_usuario) {
	this.Identificacion = Identificacion,
		this.Nombre = Nombre;
	this.Apellido = Apellido;
	this.User = User;
	this.Pass = Pass;
	this.email = email;
	this.telefono = telefono;
	this.tipo_usuario = tipo_usuario;

	this.getregistrar = function (req, res, next) {
		res.render('./user/registrar.jade');
	};

	this.postregistrar = function (req, res, next) {
		console.log(req.body);
		var salt = bcrypt.genSaltSync(10);
		var pass = bcrypt.hashSync(req.body.pas, salt);


		Usuario = {
			identificacion: req.body.ide,
			nombre: req.body.nom,
			apellido: req.body.ape,
			usuario: req.body.us,
			pass: pass,
			email: req.body.email,
			telefono: req.body.tel
		}

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


	};

	this.getinicioSec = function (req, res, next) {
		res.render('./user/inicioSec.jade', { mensaje: req.flash('mensaje'), authmessage: req.flash('authmessage') });

	};
	this.salir = function (req, res, next) {
		req.logout();
		res.redirect('inicioSec');
	};
	this.getpanelusuario = function (req, res, next) {
		console.log('trajo',req.body.tipo_usuario)


		if (req.body.tipo_usuario == 1) {
			res.render('./user/panel.jade', {
				isAuthenticated: req.isAuthenticated(),
				user: req.user
			});
		} else {
			res.render('./user/panelAdmin.jade', {
				isAuthenticated: req.isAuthenticated(),
				user: req.user				
			});
		}
	};
	this.getpanelusuarioA = function (req, res, next) {
		res.render('./user/panelAdmin.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	}

	return this;
};

module.exports = Usuario; 

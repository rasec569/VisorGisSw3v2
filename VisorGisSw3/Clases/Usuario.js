var express = require('express');
var app = express();
//conexion postgret
var mysql = require('mysql');
// Encriptar la pass
var bcrypt = require('bcryptjs');
// Datos
var conexion = require('../Datos/conexion');
var db = mysql.createConnection(conexion);


function Usuario(Identificacion, Nombre, Apellido, User, Pass, email) {
	this.Identificacion = Identificacion,
		this.Nombre = Nombre;
	this.Apellido = Apellido;
	this.User = User;
	this.Pass = Pass;
	this.email = email;

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
			email: req.body.email

		}

		db.connect();
		db.query('INSERT INTO usuario  SET ?', Usuario,

			function (err, rows, fields) {
				if (err)
					console.error('error running query', err);
			});

		req.flash('mensaje', 'Registo corecto, puede iniciar sesion')
		res.redirect('inicioSec');

	};

	this.getinicioSec = function (req, res, next) {
		res.render('./user/inicioSec.jade', { mensaje: req.flash('mensaje'), authmessage: req.flash('authmessage') });

	};
	this.salir = function (req, res, next) {
		req.logout();
		res.redirect('inicioSec');
	};
	this.getpanelusuario = function (req, res, next) {
		res.render('./user/panel.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user
		});
	}

	return this;
};

module.exports = Usuario; 

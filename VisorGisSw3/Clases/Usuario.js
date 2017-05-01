var express = require('express');
var app = express();
//conexion postgret
var mysql = require('mysql');
// Encriptar la pass
var bcrypt = require('bcryptjs');
// Datos
var conexion = require('../Datos/conexion');
var db = mysql.createConnection(conexion);


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
		console.log('trajo', req.body.tipo_usuario)

		res.render('./user/panel.jade', {
			isAuthenticated: req.isAuthenticated(),
			user: req.user

		});
	};
	this.getUsuarios = function (req, res, next) {
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
	};
	this.getModificar = function (req, res, next) {
		identificacion: req.body.ide;
		usuario: req.body.us;
		
		console.log('trajo id', identificacion)
		console.log('trajo us', usuario)

		if (identificacion != null) {
			db.connect();
			db.query('SELECT * FROM usuario WHERE identificacion = ?', identificacion, function (err, rows, fields) {
				if (err) throw err;
				resultado = rows;
				console.log(resultado);
				db.end();
				res.render('./user/modificar.jade', { persona: resultado });
			});

		} else if (usuario != null) {
			db.connect();
			db.query('SELECT * FROM usuario WHERE usuario = ?', usuario, function (err, rows, fields) {
				if (err) throw err;
				resultado = rows;
				console.log(resultado);
				db.end();
				res.render('./user/modificar.jade', { persona: resultado });
			});
		}
	}
	return this;
};

module.exports = Usuario; 

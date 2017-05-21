var express = require('express');
var app = express();
//conexion MySql
var mysql = require('mysql');
// Datos
var conexion = require('../Datos/conexion');
// formato fecha
var dateFormat = require('dateformat');


function Inmueble(FID, Name, X, Y, Tipo, Direccion, habitacion, baños, garaje){
    this.FID = FID,
    this.Name = Name,
    this.X = X,
    this.Y = Y,
    this.Tipo = Tipo,
    this.Direccion = Direccion, 
    this.habitacion = habitacion,
    this.baños = baños,
    this.garaje = garaje,



    this.getregistrarinmueble = function (req, res, next) {
		res.render('./inmuebles/registrarinmueble.jade');
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
	}
	return this;
};
module.exports = Inmueble;
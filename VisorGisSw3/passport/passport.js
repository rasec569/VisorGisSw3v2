var LocalStrategy = require('passport-local').Strategy;
var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var conexion = require('../Datos/conexion');



module.exports = function (passport) {

	passport.serializeUser(function (user, done) {
		done(null, user);
	});

	passport.deserializeUser(function (obj, done) {
		done(null, obj);
	});

	passport.use(new LocalStrategy({
		passReqToCallback: true
	}, function (req, us, password, done) {
		var db = mysql.createConnection(conexion);
		console.log('Usuario: ' + us);
		console.log('pass: ' + password);
		db.connect();

		db.query('SELECT * FROM usuario where usuario = ?', us, function (err, rows, fields) {
			console.log(rows);

			if (err) throw err;
			//return throw err);
			db.end();

			if (rows.length > 0) {
				var user = rows[0];
				var resultado=bcrypt.compareSync(password, user.pass);
				console.log('comparo   :    ' + resultado);

				if (resultado) {
					console.log('prueba oass   :    ' + password);
					return done(null, {
						id: user.identificacion,
						nombre: user.nombre,
						apellido: user.apellido,
						usuario: user.usuario,
						nacimiento:user.nacimiento,
						email: user.email,
						telefono:user.telefono,
						roll: user.tipo_usuario,
						registro:user.fecha_registro
					});
				}
			}
				return done(null, false, req.flash('mensaje', 'Usuario o Password incorrecto.'));
		});
	}
	));

};
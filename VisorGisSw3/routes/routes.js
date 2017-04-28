var express = require('express');
var router = express.Router();
var Controllers = require('.././Controllers');
var passport = require('passport');
var IUsuario = require('.././Interface/IUsuario');
var Autenticado = require('.././middleware/auth');

//console.log("carga controllers:",Controllers);

router.get('/', Controllers.HomeController.index);
//console.log(IUsuario + ' instancia de IUsuario');

//rutas de usuario
if (IUsuario() == true) {
        router.get('/login/registrar', Controllers.ControlUser.getregistrar);
        router.post('/login/registrar', Controllers.ControlUser.postregistrar);
        router.get('/login/inicioSec', Controllers.ControlUser.getinicioSec);
        router.post('/login/inicioSec', passport.authenticate('local', {
                successRedirect: '/user/panel',
                failureRedirect: '/login/inicioSec',
                failureflash: true
        }));
       router.get('/login/salir', Controllers.ControlUser.salir);
       router.get('/user/panel', Autenticado.isLogged ,Controllers.ControlUser.getpanelusuario);
       router.get('/Admin/panelAdmin', Controllers.ControlUser.getpanelusuarioA);
}

module.exports = router;

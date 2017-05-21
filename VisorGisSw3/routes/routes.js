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
        router.get('/user/panel', Autenticado.isLogged, Controllers.ControlUser.getpanelusuario);
        router.get('/user/visoradmin', Autenticado.isLogged, Controllers.ControlUser.getvisoradmin);
        router.get('/user/gestionar', Autenticado.isLogged, Controllers.ControlUser.getgestionarUs);
        router.get('/user/perfil', Autenticado.isLogged, Controllers.ControlUser.getperfil);
        router.get('/user/registrar', Autenticado.isLogged, Controllers.ControlUser.getregistraruser);
        router.post('/user/registrar', Autenticado.isLogged, Controllers.ControlUser.postregistrar);
        router.get('/user/modificar/:iden', Autenticado.isLogged, Controllers.ControlUser.getModificar);
        router.post('/user/modificar', Autenticado.isLogged, Controllers.ControlUser.postModificar);
        router.post('/user/gestionar', Autenticado.isLogged, Controllers.ControlUser.eliminarPersona);

        router.get('/user/registrar/inmueble', Controllers.ControlInmueble.getregistrarinmueble);
}



module.exports = router;

var express = require('express');
var router = express.Router();

var auxControllerPartes = require('../controllers/aux_controller_partes');
var auxControllerActivitats = require('../controllers/aux_controller_activitats');
var auxControllerMaterial = require('../controllers/aux_controller_material');



var sessionController = require('../controllers/session_controller');



/* GET login.ejs. */
router.get('*', function(req, res, next) {
  //console.log("directori: " + process.cwd());
  if (!req.session.user){
  	console.log("USUARI NO IDENTIFICAT");
  	res.render('login', {error: null});
  }else{
  	next();
  }
  
});





// Definicion de rutas de session
router.get("/login",	sessionController.new);		// formulario login
router.post("/login",	sessionController.create);	// crear sesion
router.get("/logout",	sessionController.destroy);	// destruir sesion






/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'RMN' });
// });

//rutes per a la pagina de les PARTES
router.get('/partes', function(req, res) {
  res.render('auxiliars/partes');
});
//router.get('/partes/registresSegonsDataModalitat',	auxControllerPartes.llistarRegistresSegonsDataIModalitat);	// mostrar pantalla activitat RMN
router.get('/partes/BuscarRgistreServei',	auxControllerPartes.localitzarRegistreServei);	
router.post('/partes/guardarAuxiliar',	auxControllerPartes.guardarAuxiliar);	
router.get('/partes/registresPartes',	auxControllerPartes.localitzarRegistresPartes);
router.post('/partes/nouServei',		auxControllerPartes.afegirnouServei);
router.post('/partes/nouParte',			auxControllerPartes.afegirnouParte);
router.get('/partes/:codi/eliminar',	auxControllerPartes.eliminarParte);




//rutes per a la pagina de les ACTIVITATS
router.get('/activitats', function(req, res) {
  res.render('auxiliars/activitats');
});
router.get('/activitats/registresSegonsData',	auxControllerActivitats.llistarRegistresActivitatsSegonsData);	
router.post('/activitats/novaActivitat',		auxControllerActivitats.afegirnovaActivitat);
router.get('/activitats/:codi/eliminar',		auxControllerActivitats.eliminarActivitat);



//rutes per a la pagina de les MATERIAL REUTILITZABLE
router.get('/material', function(req, res) {
  res.render('auxiliars/controlMaterial');
});
router.get('/material/BuscarRgistreServei',		auxControllerMaterial.localitzarRegistreServei);
router.post('/material/guardarPersonal',		auxControllerMaterial.guardarPersonal);	
router.get('/material/registresMaterial',		auxControllerMaterial.localitzarRegistresMaterial);
router.post('/material/nouControl',				auxControllerMaterial.afegirnouControl);
router.post('/material/guardarRegistreMaterial',	auxControllerMaterial.guardarRegistreMaterial);



module.exports = router;

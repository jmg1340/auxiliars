// GET login  -  fomrulario de login
exports.new = function (req, res){
	var errors = req.session.errors || [];
	req.session.errors = [];

	console.log("*** S'HA REDIRECCIONAT AL FORMULARI LOGIN ****");
	res.render('login', {error: null});
};



// POST login  -  crea la session
exports.create = function(req, res){

	console.log("modul CREACIO DE SESSIO");

	var usuari 		= "auxiliar";
	var password	= req.body.pass;

	console.log("password: " + password);

	var userController = require('./user_controller');
	userController.autenticar(usuari, password, function(error, user){
		
		if (error){		// si hay error retornamos mensajes de error de session
			//req.session.errors = [{"message": "Error: " + error}];
			console.log(error.message);
			res.render("login", {error: error.message});
			return;
		}

		// Crear req.session.user y guardar campos id i username
		// La sesion se define por la existencia de REQ.SESSION.USER
		req.session.user = {id: user.id, username: user.username};
		console.log("id: " + user.id + "\n" + "id: " + user.username);
		


		res.redirect('/partes'); 		// redireccina a la pagina del llibre de quirofan

	});
};




// DELETE /logout 	-	Destruir la sesion
exports.destroy = function(req, res){
	delete req.session.user;
	res.render("login", {error: null});
};
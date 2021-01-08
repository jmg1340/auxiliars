var models 	  = require("../models/models.js");
var Sequelize = require("sequelize");
var utils 	  = require("./utils.js");



exports.localitzarRegistreServei = function(req, res){
	console.log("******  llistarRegistresPartes *****")
	
	var clWhere = {
		data: 	req.query.data2,
		uh: 	req.query.uh,
		torn: 	req.query.torn
	};
	//console.log("data: " + clWhere.data + "\nuh: " + clWhere.uh + "\ntorn: " + clWhere.torn);
	var dataAAAAMMDD = utils.convertirData(clWhere.data, "dd-mm-aaaa", "aaaa-mm-dd");
	console.log("data: " + clWhere.data + "\nuh: " + clWhere.uh + "\ntorn: " + clWhere.torn + "\dataAAAAMMDD: " + dataAAAAMMDD);

	models.TblControl.findAndCountAll(
		{
			attributes: ['codi', 'data', 'servei', 'torn', 'PersAux', 'PersEsteri'],
			//include: models.TblPartes, 
			where: {"data": dataAAAAMMDD, "servei": {$like: clWhere.uh}, "torn": {$like: clWhere.torn} }
		}
	).then(function(result){
		if(result.count !== 0){
			console.log("Ha executat la consulta de 'localitzarRegistreServei (material) !!!");
			console.log("result.rows[0].data: " + result.rows[0].data);
			console.log("typeof result.rows[0].data: " + typeof result.rows[0].data);

			result.rows[0].data = utils.convertirData(result.rows[0].data, null, "dd-mm-aaaa");
		}
		res.json({registres: result.rows, total: result.count});
	});		

}





exports.afegirnouControl = function(req, res){

	var oDadesControl = models.TblControl.build({
		data: 		utils.convertirData(req.body.data, "dd-mm-aaaa", "aaaa-mm-dd"), 
		servei:     req.body.servei, 
		torn: 		req.body.torn
	});

	//guarda en DB els camps nom, vehicle i matricula
	oDadesControl.validate().then(function(err){
		console.log("************ VALIDACIO  servei**************");		
		if(err){
			console.log("*****Error al validar camps abans d'insertar registre a taula serveis ******");
			// console.log("err.errors.length: " + err.errors.length);
			console.log("JSON.stringify(err.errors): " + JSON.stringify(err.errors));
			res.json({idNouRegistre: null, Error: err.errors});

		}else{
			console.log("oDadesControl: " + JSON.stringify(oDadesControl));
			oDadesControl.save({fields: ["data", "servei", "torn"]}).then(function(nouRegistre){

				console.log("***** registre taula control CREAT ********");
				console.log("nouRegistre: " + JSON.stringify(nouRegistre));
				console.log("*******************************************");
				
				nouRegistre.data = utils.convertirData(nouRegistre.data, "aaaa-mm-dd", "dd-mm-aaaa"); 
				res.json({nouReg: nouRegistre, Error: null});

			});
		}
	});

}




exports.guardarPersonal = function(req, res){

	var persAux2 = req.body.persAux;
	var persEst2  = req.body.persEst;
	var idControl2 = req.body.idControl;
	console.log("persAux: " + persAux2 + "\npersEst: " + persEst2 + "\nidControl2: " + idControl2);

/*
	var oDadesServei = models.TblServeis.build({
		auxiliar2: req.body.auxiliar,
		idServei2: req.body.idServei
	});
*/
	//guarda en DB el camp auxiliar
	models.TblControl.findById(idControl2)
	  .then(function (registreAModificar) {
	    console.log("Taula 20CONTROL: registre a modificar TROBAT !!!");
	    console.log("Taula 20CONTROL - registreAModificar: " + JSON.stringify(registreAModificar));

	    // Check if record exists in db
		if (registreAModificar !== null) {
			//registreAModificar.auxliliar = auxiliar2;
			//console.log("registreAModificar.auxliliar: " + registreAModificar.auxliliar);
			//registreAModificar.save().then(function () {
			registreAModificar.update({ PersAux: persAux2, PersEsteri: persEst2 }).then(function(){
				console.log("Taula 20CONTROL - registre a modificar MODIFICAT !!!");
				res.json({Error: null});
			});
				// .error(function(err){
				// 	console.log("ERROR DE GUARDAT AL registre a modificar !!!");
				// 	res.json({Error: err.errors});
				// })
		}
	});

}






exports.localitzarRegistresMaterial = function(req, res){
	console.log("******  localitzarRegistresMaterial *****")
	
	var clWhere = {	codiControl: req.query.codi };

	models.TblControlDetall.findAndCountAll(
		{
			//attributes: ['codiParte', 'hab', 'parte'],
			//include: models.TblPartes, 
			where: {"idControl": clWhere.codiControl}, 
			//order: "ordre ASC"
		}
	).then(function(result){
		console.log("Ha executat la consulta de 'localitzarRegistresMaterial !!!");
		res.json({registres: result.rows, total: result.count});
	});		

}





exports.guardarRegistreMaterial = function(req, res){

	var reg = req.body;


	//guarda en DB el camp auxiliar
	models.TblControlDetall.findById(reg.codiRegistre)
	  .then(function (registreAModificar) {
	    
	    console.log("Taula 21CONTROLDETALL registreAModificar: " + JSON.stringify(registreAModificar) +"\n");

	    // Check if record exists in db
		if (registreAModificar !== null) {
			console.log("Taula 21CONTROLDETALL registre a modificar TROBAT !!!");
			//registreAModificar.auxliliar = auxiliar2;
			//console.log("registreAModificar.auxliliar: " + registreAModificar.auxliliar);
			//registreAModificar.save().then(function () {
			registreAModificar.update({ 
										stock			: reg.stock, 
										esteril			: reg.esteril,
										noEsteril		: reg.noEsteril,
										solicitat		: reg.solicitat,
										rebutEsteril	: reg.rebutEsteril,
										entregatEsteril : reg.entregatEsteril,
										observacions	: reg.observacions 
									}).then(function(){
											console.log("Taula 21CONTROLDETALL: registre MODIFICAT !!!\n");
											res.json({ Error: null});
			});
				// .error(function(err){
				// 	console.log("ERROR DE GUARDAT AL registre a modificar !!!");
				// 	res.json({Error: err.errors});
				// })
		} else {
				// El registre no existeix i s'ha de crear
				delete reg.codiRegistre;		// elimino la propietat codiRegistre pq al crear el registre assignara automaticament un codi
				console.log("reg sense prop 'codiRegistre': " + JSON.stringify(reg) + "\n");

				var nouRegistre	 = models.TblControlDetall.build(reg);
				nouRegistre.save({fields: ["idMaterial", "stock", "esteril", "noEsteril", "solicitat", "rebutEsteril", "entregatEsteril", "observacions", "idControl"]
				}).then(function(nouRegistre){

					console.log("------- registre taula controlDetall CREAT --------");
					console.log("nouRegistre: " + JSON.stringify(nouRegistre));
					console.log("**********************************************************************\n");
					res.json({Error: null, codiRegistre: nouRegistre.codiDetall });
				});
		}
	});





}





/*
exports.afegirnouParte = function(req, res){

	var oDadesParte = models.TblPartes.build({
		hab: 		req.body.post_hab, 
		parte: 		req.body.post_parte, 
		idServei: 	req.body.post_idServei
	});

	//guarda en DB els camps nom, vehicle i matricula
	oDadesParte.validate().then(function(err){
		console.log("************ VALIDACIO  servei**************");		
		if(err){
			console.log("*****Error al validar camps abans d'insertar registre a taula serveis ******");
			// console.log("err.errors.length: " + err.errors.length);
			console.log("JSON.stringify(err.errors): " + JSON.stringify(err.errors));
			res.json({idNouRegistre: null, Error: err.errors});

		}else{
			console.log("oDadesParte: " + JSON.stringify(oDadesParte));
			oDadesParte.save({fields: ["hab", "parte", "idServei"]}).then(function(nouRegistre){

				console.log("***** registre taula PARTES creat ********");
				console.log("nouRegistre: " + JSON.stringify(nouRegistre));
				console.log("*******************************************");
				
				nouRegistre.data = utils.convertirData(nouRegistre.data, null, "dd-mm-aaaa"); 
				res.json({nouReg: nouRegistre, Error: null});

			});
		}
	});

}
*/







/*
exports.eliminarParte = function(req, res){
	console.log("** estic a la funcio eliminarParte **");

	// objecte req.personal generada en el middleware AUTOLOAD
	var codi_Parte = req.params.codi;
	models.TblPartes.findById(codi_Parte).then(function(oParte){
		if (oParte){

			oParte.destroy().then(function(){
				res.send({missatge: "registre eliminat"});
			});

		}
	});
}
*/
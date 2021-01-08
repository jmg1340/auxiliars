var models 	  = require("../models/models.js");
var Sequelize = require("sequelize");
var utils 	  = require("./utils.js");



exports.localitzarRegistreServei = function(req, res){
	//console.log("******  llistarRegistresPartes *****")
	
	var clWhere = {
		data: 	req.query.data2,
		uh: 	req.query.uh,
		torn: 	req.query.torn
	};
	//console.log("data: " + clWhere.data + "\nuh: " + clWhere.uh + "\ntorn: " + clWhere.torn);
	var dataAAAAMMDD = utils.convertirData(clWhere.data, "dd-mm-aaaa", "aaaa-mm-dd");
	//console.log("data: " + clWhere.data + "\nuh: " + clWhere.uh + "\ntorn: " + clWhere.torn + "\dataAAAAMMDD: " + dataAAAAMMDD);

	models.TblServeis.findAndCountAll(
		{
			attributes: ['codiServei', 'data', 'servei', 'torn', 'auxiliar'],
			//include: models.TblPartes, 
			where: {"data": dataAAAAMMDD, "servei": {$like: clWhere.uh}, "torn": {$like: clWhere.torn} }
		}
	).then(function(result){
		if(result.count !== 0){
			console.log("Ha executat la consulta de 'localitzarRegistreServei !!!");
			console.log("result.rows[0].data: " + result.rows[0].data);
			console.log("typeof result.rows[0].data: " + typeof result.rows[0].data);

			result.rows[0].data = utils.convertirData(result.rows[0].data, null, "dd-mm-aaaa");
		}
		res.json({registres: result.rows, total: result.count});
	});		

}





exports.afegirnouServei = function(req, res){

	var oDadesServei = models.TblServeis.build({
		data: 		utils.convertirData(req.body.data, "dd-mm-aaaa", "aaaa-mm-dd"), 
		servei:     req.body.servei, 
		torn: 		req.body.torn
	});

	//guarda en DB els camps nom, vehicle i matricula
	oDadesServei.validate().then(function(err){
		console.log("************ VALIDACIO  servei**************");		
		if(err){
			console.log("*****Error al validar camps abans d'insertar registre a taula serveis ******");
			// console.log("err.errors.length: " + err.errors.length);
			console.log("JSON.stringify(err.errors): " + JSON.stringify(err.errors));
			res.json({idNouRegistre: null, Error: err.errors});

		}else{
			console.log("oDadesServei: " + JSON.stringify(oDadesServei));
			oDadesServei.save({fields: ["data", "servei", "torn"]}).then(function(nouRegistre){

				console.log("***** registre taula serveis CREAT ********");
				console.log("nouRegistre: " + JSON.stringify(nouRegistre));
				console.log("*******************************************");
				
				nouRegistre.data = utils.convertirData(nouRegistre.data, null, "dd-mm-aaaa"); 
				res.json({nouReg: nouRegistre, Error: null});

			});
		}
	});

}




exports.guardarAuxiliar = function(req, res){

	var auxiliar2 = req.body.auxiliar;
	var idServei2 = req.body.idServei;
	console.log("auxiliar2: " + auxiliar2 + "\nidServei2: " + idServei2);

/*
	var oDadesServei = models.TblServeis.build({
		auxiliar2: req.body.auxiliar,
		idServei2: req.body.idServei
	});
*/
	//guarda en DB el camp auxiliar
	models.TblServeis.findById(idServei2)
	  .then(function (registreAModificar) {
	    console.log("registre a modificar TROBAT !!!");
	    console.log("registreAModificar: " + JSON.stringify(registreAModificar));

	    // Check if record exists in db
		if (registreAModificar !== null) {
			//registreAModificar.auxliliar = auxiliar2;
			//console.log("registreAModificar.auxliliar: " + registreAModificar.auxliliar);
			//registreAModificar.save().then(function () {
			registreAModificar.update({ auxiliar: auxiliar2 }).then(function(){
				console.log("registre a modificar MODIFICAT !!!");
				res.json({Error: null});
			});
				// .error(function(err){
				// 	console.log("ERROR DE GUARDAT AL registre a modificar !!!");
				// 	res.json({Error: err.errors});
				// })
		}
	});

}










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









exports.localitzarRegistresPartes = function(req, res){
	//console.log("******  llistarRegistresPartes *****")
	
	var clWhere = {	codiDelServei: req.query.codi };

	models.TblPartes.findAndCountAll(
		{
			attributes: ['codiParte', 'hab', 'parte'],
			//include: models.TblPartes, 
			where: {"idServei": clWhere.codiDelServei}, order: "hab ASC"
		}
	).then(function(result){
		console.log("Ha executat la consulta de 'localitzarRegistresPartes !!!");
		res.json({registres: result.rows, total: result.count});
	});		

}










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

var models 	  = require("../models/models.js");
var Sequelize = require("sequelize");
var utils 	  = require("./utils.js");







exports.llistarRegistresActivitatsSegonsData = function(req, res){
	console.log("******  llistarRegistresSegonsData *****")
	
	// 'data' recollida del parametre '?data=dataSeleccionada' (datepicker)
	var clWhere = {
		data: 		req.query.data2 || null,
	};
	
	//console.log ("*** req.query: " + JSON.stringify(req.query));
	//console.log ("*** clWhere: " + JSON.stringify(clWhere));
	if(clWhere.data === null){
		// data pren el valor de la data actual
		var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
		var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());

		var dataAAAAMMDD = new Date().getFullYear() + "-" + mes  + "-" + dia;
		//var dataDDMMAAAA = dia + "/" + mes  + "/" + new Date().getFullYear();
		//console.log("data = null --------> dataAAAAMMDD: " + dataAAAAMMDD);
		//console.log("data = null --------> dataDDMMAAAA: " + dataDDMMAAAA);

		
	}else{
		// data pren el valor de la data seleccionada (datapicker)
		var dataAAAAMMDD = utils.convertirData(clWhere.data, "dd-mm-aaaa", "aaaa-mm-dd"); 
		//var dataDDMMAAAA = data;
		//console.log("data = NO null -------> dataAAAAMMDD: " + dataAAAAMMDD);
		//console.log("data = NO null -------> dataDDMMAAAA: " + dataDDMMAAAA);

	}
	//console.log("moment abans d'executar consulta sequelize");
	console.log("dataAAAAMMDD: " + dataAAAAMMDD);
	models.TblActivitats.findAll(
		{
			attributes: 
			[
				'codiActivitat', [Sequelize.fn('date_format', Sequelize.col('data'), '%d-%m-%Y'), 'data'], "servei", "torn", "auxiliar", "carros", "banyeres", "office", "magatzemFarmacia", "zonaTecnica", "observacions"
  			],
			where: {"data": dataAAAAMMDD}, 
			//order: "registre DESC"
		}
	).then(function(result){
	  	console.log("======================\n" + "Objecte result:\n\n" + JSON.stringify(result) + "\n========================");
	  	res.json({registres: result});
	});		


}







exports.eliminarActivitat = function(req, res){
	console.log("** estic a la funcio eliminarActivitat **");

	// objecte req.personal generada en el middleware AUTOLOAD
	var codi_Act = req.params.codi;
	console.log("codi_Act: " + codi_Act);
	
	models.TblActivitats.findById(codi_Act).then(function(oActivitat){
		if (oActivitat){

			oActivitat.destroy().then(function(){
				res.send({missatge: "registre eliminat"});
			});

		}
	});
}
















exports.afegirnovaActivitat = function(req, res){

	dadesFormulari = {
		data: 			utils.convertirData(req.body.post_data, "dd-mm-aaaa", "aaaa-mm-dd"), 
		servei:			req.body.post_uh,
		torn: 			req.body.post_torn, 
		auxiliar: 		req.body.post_auxiliar, 
		carros: 		req.body.post_carros, 
		banyeres: 		req.body.post_banyeres, 
		office: 		req.body.post_office, 
		magatzemFarmacia: 	req.body.post_mfarmacia, 
		zonaTecnica: 		req.body.post_ztecnica, 
		observacions: 	req.body.post_observacions
	};

	//console.log("dades formulari: " + JSON.stringify(dadesFormulari));

	var oDadesActivitat = models.TblActivitats.build(dadesFormulari);

	//guarda en DB els camps nom, vehicle i matricula

	oDadesActivitat.save({fields: ["data", "servei", "torn", "auxiliar", "carro", "banyeres", "office", "magatzemFarmacia", "zonaTecnica", "observacions"]}).then(function(nouRegistre){

		console.log("***** registre taula ACTIVITATS creat ********");
		console.log("nouRegistre: " + JSON.stringify(nouRegistre));
		console.log("*******************************************");
		
		console.log("nouRegistre.data (abans): " + nouRegistre.data);
		nouRegistre.data = utils.convertirData(nouRegistre.data, "aaaa-mm-dd", "dd-mm-aaaa"); 
		console.log("nouRegistre.data (despres): " + nouRegistre.data);		
		
		res.json({nouReg: nouRegistre, Error: null});

	});


}
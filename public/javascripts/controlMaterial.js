$(document).ready(function() {




    // Canviar color pestanya de la pagina actual a blau
    $("ul > li").removeClass();   // s'eliminen totes les clases dels elements del selector jquery
    $("ul > li").addClass("inactiu");   //afegeix la classe "inactiu" a tots els elements del selector jquery
    $("#menuMaterial").removeClass("inactiu");
    $("#menuMaterial").addClass("actiu");








	// inicialitzar selector dia
	dataActual = function(){
		var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
		var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());

		return dia + "-" + mes  + "-" + new Date().getFullYear() ;

	}

	$( "#seleccioData" ).val(dataActual());





    $( "#seleccioData" ).datepicker({
            //defaultDate: new Date(),
            constrainInput: true,
            changeMonth: false,
            changeYear: false,
            dateFormat: 'dd-mm-yy',
            firstDay: 1,    //Sunday is 0, Monday is 1, etc.
            dayNames: [ "Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte" ],
            dayNamesMin: [ "Dg", "Dll", "Dm", "Dcr", "Dj", "Dv", "Ds" ],
            monthNames: [ "Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre" ],
            monthNamesShort: ['Gen','Feb','Mar','Abr','Mai','Jun','Jul','Ago','Set','Oct','Nov','Des'],
        	onSelect: function(dataSeleccionada){
 				//actualitzarTaulaActivitats();
        	}
    });



    $("#botoGuardarAuxiliar").hide();
    $("#estatGuardarAuxiliar").hide();

	
    $("#DataServeiTorn").hide();


	$("#botoCanviDataUHTorn").bind("click", function(event){
		$("#DataServeiTorn").hide();
		$("#taulaBuscar").show();
	});





    $("#botoBuscarServei").bind("click", function(event){
    	event.preventDefault();   // si no poso aixo ajax retorna un error de OUT OF MEMORY

    	$('#taula_material tbody').empty();


    	$("#infoData").css("color", "white");
    	$("#infoServei").css("color", "white");
    	$("#infoTorn").css("color", "white");


    	
    	var data = $("#seleccioData").val() || null;
    	var torn = $("#torn").val() 		|| null;
    	var uh   = $("#uh").val() 			|| null;

    	if ((data == null) || (torn == null) || (uh == null)) {
    		alert ("falta Data | UH | torn !!! ");
    	} else {
	    	var query = "?data2=" + data + "&" + "uh=" + uh + "&" + "torn=" + torn;
	    	//alert("query:" + query);

		    $.ajax({
		        url: "/material/BuscarRgistreServei" + query,
		        type: "GET",
		        dataType: "json",
		        contentType: "application/json; charset=utf-8",
		        cache: false,
	/*			data: JSON.stringify({
		        	data2: 		$( "#seleccioData" ).val(),
		        	modalitat: 	$( "#modalitatSeleccionada" ).val()
		        }),
	*/	        success: function (dades) {
		        	//alert("success ajax: " + JSON.stringify(dades));
		        	console.log("dades.total:" + dades.total);
		        	if (dades.total == 0){
		        		   //if(confirm("No existeix cap registre a la taula Serveis! \n Vols crear-ne un de nou?")) {
				           		// $("#infoData").html(data);
				          		// $("#infoServei").html(uh);
				          		// $("#infoTorn").html(torn);
				        		// $("#persAuxiliar").val("")
				        		// $("#persEsteri").val("")

		        		   		crearNouRegistreTaulaControl (data, uh, torn);
		        		   //}

		        	}else{

		        		localStorage.IdControl = dades.registres[0].codi;
		        		//alert("data:" + dades.registres[0].data);
		            	$("#infoData").html(dades.registres[0].data).css("color", "blue");
		            	$("#infoServei").html(dades.registres[0].servei).css("color", "blue");
		            	$("#infoTorn").html(dades.registres[0].torn).css("color", "blue");
		        		$("#persAuxiliar").val(dades.registres[0].PersAux)
		        		$("#persEsteri").val(dades.registres[0].PersEsteri)

			        	buscarMaterial(dades.registres[0].codi);


			        }

			        $("#taulaBuscar").hide();
			        $("#DataServeiTorn").show();
		        },
		        error: function(err){
		    		alert("error ajax: " + JSON.stringify(err));
				}
		    });

    	}
    });

	

	//$( "#formulariAfegirActivitat" ).submit(function( event ) {
	crearNouRegistreTaulaControl =  function(data, servei, torn) {
		//alert ("estic a la funcio crearNouRegistreTaulaServeis");

        $.ajax({
            url: "/material/nouControl",
            type: "POST",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
    		//data: JSON.stringify({ "objectData": formData}),
    		data: JSON.stringify({
            	data: 	$("#seleccioData").val(),
            	servei: $("#uh").val(),
            	torn: 	$("#torn").val()
           }),
            success: function (dades) {
		        
            	if (! dades.Error == null){

	            	var missatge ="";
	            	for (var i=0; i< dades.Error.length; i++){
	            		missatge += dades.Error[i].message + "\n";
	            	}
	            	alert(missatge);

	            } else{
	            	//alert ("registre taula Serveis CREAT!!. Nou ID Serveis: " + dades.nouReg.codiServei);
	            	localStorage.IdControl = dades.nouReg.codi;

	            	$("#infoData").html(dades.nouReg.data).css("color", "green");
	            	$("#infoServei").html(dades.nouReg.servei).css("color", "green");
	            	$("#infoTorn").html(dades.nouReg.torn).css("color", "green");
	            	$("#persAuxiliar").val("");
	            	$("#persEsteri").val("");

	            	material = JSON.parse( JSON.stringify( plantillaMaterial ) );
	            	omplirRegistresTaula(material);
	            }
            },
            error: function(Error){
        		alert("error: " + Error.description);
    		}
        });		

		//event.preventDefault(); // cancela el submit dels inputs del formulari. No es processen.
	}



	/**
	* al canviar el valor del auxiliar, mostrar el boto per guardar la dada
	*/
	//$(document).on("change","#auxiliar", function(){
	$("#persAuxiliar").on('change keyup paste', function() {
		$("#botoGuardarAuxiliar").show();
	});

	$("#persEsteri").on('change keyup paste', function() {
		$("#botoGuardarAuxiliar").show();
	});




/*

	$("#botoGuardarAuxiliar").bind("click", function(event){
		event.preventDefault();

	    $.ajax({
	        //url: "/partes/BuscarRgistreServei" + query,
	        url: "/material/guardarPersonal",
	        type: "POST",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        cache: false,
			data: JSON.stringify({
	        	persAux: $("#persAuxiliar").val(),
	        	persEst: $("#persEsteri").val(),	        	
	        	idControl: localStorage.IdControl,
	        }),
        	success: function (dades) {
	        	//alert("success ajax: " + JSON.stringify(dades));

            	if (dades.Error !== null){

	            	var missatge ="";
	            	for (var i=0; i< dades.Error.length; i++){
	            		missatge += dades.Error[i].message + "\n";
	            	}
	            	alert(missatge);

	            } else{
	            	//alert ("dades auxiliar guardades");
	            	$("#botoGuardarAuxiliar").hide();
	            	$("#estatGuardarAuxiliar").show();
	            	$("#estatGuardarAuxiliar").fadeOut(2500);

	            }
	        },
	        error: function(err){
	    		alert("error ajax: " + JSON.stringify(err));
			}
	    });


	});

*/



	buscarMaterial = function(codiControl){

		    var query = "?codi=" + codiControl;
		    $.ajax({
		        
		        url: "/material/registresMaterial" + query,
		        type: "GET",
		        dataType: "json",
		        contentType: "application/json; charset=utf-8",
		        cache: false,

		        success: function (dades) {
		        	//alert("success ajax: " + JSON.stringify(dades));

		        	
		        	
		        	//material = plantillaMaterial;
		        	material = JSON.parse( JSON.stringify( plantillaMaterial ) );

		        	//per cada registre, substituim les dades predeterminades de l'objecte Material per les del registre
		        	for (var reg=0 ; reg<dades.registres.length; reg++){
		        		for (var i=0 ; i<material.length; i++){

		        			if(dades.registres[reg].idMaterial == material[i].id){
		        				material[i].codiRegistre 	= dades.registres[reg].codiDetall;
		        				//material[i].id				= dades.registres[reg].idMaterial;
		        				material[i].stock 			= dades.registres[reg].stock;
								material[i].esteril			= dades.registres[reg].esteril;
								material[i].noEsteril		= dades.registres[reg].noEsteril;
								material[i].solicitat		= dades.registres[reg].solicitat;
								material[i].rebutEsteril	= dades.registres[reg].rebutEsteril;
								material[i].entregatEsteril	= dades.registres[reg].entregatEsteril;
								material[i].observacions	= dades.registres[reg].observacions;
		        			}

		        		}
		        	}




		        	omplirRegistresTaula(material);
			        
		        },
		        error: function(err){
		    		alert("error ajax: " + JSON.stringify(err));
				}
		    });
	}




	omplirRegistresTaula = function(rows){

	    for (var i=0 ; i<material.length; i++){
    		$('#taula_material > tbody').append(
		      	'<tr id=' + material[i].codiRegistre + '>' +
			        '<td>' + material[i].ordre + '</td>' +
			        '<td class="idMat"><input type="hidden" value="' + material[i].id  + '"/>' + material[i].nom + '</td>' +
			        '<td class="stock">' + ((material[i].stockEditable == true) ? '<input type="number" min="0" value="' + material[i].stock + '"/>' : material[i].stock) + '</td>' +
			        '<td class="esteril"><input type="number" min="0" value="' + material[i].esteril  + '"/></td>' +
			        '<td class="noEsteril"><input type="number" min="0" value="' + material[i].noEsteril  + '"/></td>' +
			        '<td class="solicitat"><input type="number" min="0" value="' + material[i].solicitat  + '"/></td>' +
			        '<td class="rebutEsteril"><input type="number" min="0" value="' + material[i].rebutEsteril  + '"/></td>' +
			        '<td class="entregatEsteril"><input type="number" min="0" value="' + material[i].entregatEsteril  + '"/></td>' +
			        '<td class="observacions"><input type="text" value="' + material[i].observacions  + '"/></td>' +
		      	'</tr>'
    		);
    	}
 
	}






	$("#botoGuardar").bind("click", function(){


		//********* GUARDA NOMS DEL PERSONAL *******Ç

	    $.ajax({
	        //url: "/partes/BuscarRgistreServei" + query,
	        url: "/material/guardarPersonal",
	        type: "POST",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        cache: false,
			data: JSON.stringify({
	        	persAux: $("#persAuxiliar").val(),
	        	persEst: $("#persEsteri").val(),	        	
	        	idControl: localStorage.IdControl,
	        }),
        	success: function (dades) {
	        	//alert("success ajax: " + JSON.stringify(dades));

            	if (dades.Error !== null){

	            	var missatge ="";
	            	for (var i=0; i< dades.Error.length; i++){
	            		missatge += dades.Error[i].message + "\n";
	            	}
	            	alert(missatge);

	            }



				//******** GUARDA LES DADES DE LA TAULA **********
				//var matrRegBdd = [];

				$("#taula_material tbody tr").each(function (index){
					
					var tr = $(this); 	// utilitzo la variable tr a la linea 399


					// Per cada linea de la taula es crea un objecte amb les dades de cada camp
					var registre = {
									codiRegistre	: $(this).attr("id"),		// sera 0 quan no existeix registre a la bdd 
									idMaterial:		$(this).find(".idMat > input").val(),
									stock: 			($(this).find(".stock > input").val() == undefined) ? $(this).find(".stock").html() : $(this).find(".stock > input").val(),
									esteril: 		($(this).find(".esteril > input").val().length == 0) ? 0 : $(this).find(".esteril > input").val(),
									noEsteril: 		($(this).find(".noEsteril > input").val().length == 0) ? 0 : $(this).find(".noEsteril > input").val(),
									solicitat: 		($(this).find(".solicitat > input").val().length == 0) ? 0 : $(this).find(".solicitat > input").val(),
									rebutEsteril: 	($(this).find(".rebutEsteril > input").val().length == 0) ? 0 : $(this).find(".rebutEsteril > input").val(),
									entregatEsteril:($(this).find(".entregatEsteril > input").val().length == 0) ? 0 : $(this).find(".entregatEsteril > input").val(),
									observacions: 	$(this).find(".observacions > input").val()
									};
					registre.idControl = localStorage.IdControl;

					if(
						(registre.esteril != "0") || 
						(registre.noEsteril != "0") || 
						(registre.solicitat != "0") || 
						(registre.rebutEsteril != "0") || 
						(registre.entregatEsteril != "0") || 
						(registre.observacions.length != 0)
						) {

							console.log(registre);
							//matrRegBdd.push(registre);

							// -----------------------


						    $.ajax({
						        //url: "/partes/BuscarRgistreServei" + query,
						        url: "/material/guardarRegistreMaterial",
						        type: "POST",
						        async: true,
						        dataType: "json",
						        contentType: "application/json; charset=utf-8",
						        cache: false,
								data: JSON.stringify(registre),
					        	success: function (dadesMat) {
						        	//alert("success ajax: " + JSON.stringify(dadesMat));

					            	if (dadesMat.Error !== null){

						            	var missatge ="";
						            	for (var i=0; i< dadesMat.Error.length; i++){
						            		missatge += dadesMat.Error[i].message + "\n";
						            	}
						            	alert(missatge);

						            } else{
						            	tr.attr("id", dadesMat.codiRegistre);

						            	//alert ("dades auxiliar guardades");
						            	// $("#botoGuardarAuxiliar").hide();

						            }
						        },
						        error: function(err){
						    		alert("error ajax: " + JSON.stringify(err));
								}
						    });


							// -----------------------



					}


				});					


				$("#estatGuardarDades").show();
				$("#estatGuardarDades").fadeOut(2500);








	        },
	        error: function(err){
	    		alert("error ajax: " + JSON.stringify(err));
			}
	    });






	})





/*

    $( "#novaBusqueda" ).button().on( "click", function() {
      dialogTaulaBuscar.dialog( "open" );
      llegirTecnics();
    });

*/



});
$(document).ready(function() {


	// Canviar color pestanya de la pagina actual a blau
	$("ul > li").removeClass();   // s'eliminen totes les clases dels elements del selector jquery
	$("ul > li").addClass("inactiu"); 	//afegeix la classe "inactiu" a tots els elements del selector jquery
	$("#menuPartes").removeClass("inactiu");
	$("#menuPartes").addClass("actiu");









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

    	
    	var data = $("#seleccioData").val() || null;
    	var torn = $("#torn").val() 		|| null;
    	var uh   = $("#uh").val() 			|| null;

    	if ((data == null) || (torn == null) || (uh == null)) {
    		alert ("falta Data | UH | torn !!! ");
    	} else {
	    	var query = "?data2=" + data + "&" + "uh=" + uh + "&" + "torn=" + torn;
	    	//alert("query:" + query);

		    $.ajax({
		        url: "/partes/BuscarRgistreServei" + query,
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
				            	$("#infoData").html(data);
				            	$("#infoServei").html(uh);
				            	$("#infoTorn").html(torn);
				        		$("#auxiliar").val("")


		        		   		$('#taula_registresPartes tbody').empty();
		        		   		$('#registres').html(0);
		        		   		crearNouRegistreTaulaServeis (data, uh, torn);
		        		   //}

		        	}else{

		        		localStorage.IdServeis = dades.registres[0].codiServei;
		        		//alert("data:" + dades.registres[0].data);
		            	$("#infoData").html(dades.registres[0].data).css("color", "blue");
		            	$("#infoServei").html(dades.registres[0].servei).css("color", "blue");
		            	$("#infoTorn").html(dades.registres[0].torn).css("color", "blue");
		        		$("#auxiliar").val(dades.registres[0].auxiliar)

			        	buscarPartes(dades.registres[0].codiServei);


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
	crearNouRegistreTaulaServeis =  function(data, servei, torn) {
		//alert ("estic a la funcio crearNouRegistreTaulaServeis");

        $.ajax({
            url: "/partes/nouServei",
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
	            	localStorage.IdServeis = dades.nouReg.codiServei;

	            	$("#infoData").html(dades.nouReg.data).css("color", "green");
	            	$("#infoServei").html(dades.nouReg.servei).css("color", "green");
	            	$("#infoTorn").html(dades.nouReg.torn).css("color", "green");
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
	$("#auxiliar").on('change keyup paste', function() {
		$("#botoGuardarAuxiliar").show();
	});







	$("#botoGuardarAuxiliar").bind("click", function(event){
		event.preventDefault();

	    $.ajax({
	        //url: "/partes/BuscarRgistreServei" + query,
	        url: "/partes/guardarAuxiliar",
	        type: "POST",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        cache: false,
			data: JSON.stringify({
	        	auxiliar: $("#auxiliar").val(),
	        	idServei: localStorage.IdServeis,
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









    $("#botoAfegirNovaLinea").bind("click", function(event){
    	event.preventDefault();   // si no poso aixo ajax retorna un error de OUT OF MEMORY

    	var hab   = $("#hab").val()		|| null;
    	var parte = $("#parte").val() 	|| null;
    	var idServei  = localStorage.IdServeis	|| null;

    	if ((hab == null) || (parte == null)) {
    		alert ("falta Hab | Parte  !!! ");
    	} else {
	    	//var query = "?data2=" + data + "&" + "uh=" + uh + "&" + "torn=" + torn;
	    	//alert("query:" + query);

		    $.ajax({
		        //url: "/partes/BuscarRgistreServei" + query,
		        url: "/partes/nouParte",
		        type: "POST",
		        dataType: "json",
		        contentType: "application/json; charset=utf-8",
		        cache: false,
				data: JSON.stringify({
		        	post_hab: 	hab,
		        	post_parte: parte,
		        	post_idServei: idServei 
		        }),
	        	success: function (dades) {
		        	//alert("success ajax: " + JSON.stringify(dades));

	            	if (! dades.Error == null){

		            	var missatge ="";
		            	for (var i=0; i< dades.Error.length; i++){
		            		missatge += dades.Error[i].message + "\n";
		            	}
		            	alert(missatge);

		            } else{
		            	//alert ("registre taula Serveis CREAT!!. Nou ID Serveis: " + dades.nouReg.codiServei);

						$('#taula_registresPartes > tbody').append(
					      	'<tr id=' + dades.nouReg.codiParte + '>' +
						        '<td>' + dades.nouReg.hab + '</td>' +
						        '<td>' + dades.nouReg.parte + '</td>' +
						        '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarParte(' + dades.nouReg.codiParte + ')" title="Eliminar registre">'  +
						        		'<span class="ui-icon ui-icon-circle-close red"></span>' +
						            '</button>' +
						        '</td>' +
					      	'</tr>'
						);
						
						$('#registres').html(parseInt($('#registres').html()) + 1);

		            	var colorFonsNouRegistre = $('#' + dades.nouReg.codiParte +' td:first-child').css("background-color");
		            	$('#taula_registresPartes tbody > #' + dades.nouReg.codiParte +' td').fadeIn().css("background-color", "#00ff00");  // color verd
		            	$('#taula_registresPartes tbody > #' + dades.nouReg.codiParte +' td').animate({"background-color": colorFonsNouRegistre}, 2000);  


		            	// posem els INPUTS a zero
						$("#hab").val("");
		    			$("#parte").val("");
		            }
		        },
		        error: function(err){
		    		alert("error ajax: " + JSON.stringify(err));
				}
		    });

    	}
    });














	buscarPartes = function(codiServei){

		    var query = "?codi=" + codiServei;
		    $.ajax({
		        
		        url: "/partes/registresPartes" + query,
		        type: "GET",
		        dataType: "json",
		        contentType: "application/json; charset=utf-8",
		        cache: false,

		        success: function (dades) {
		        	//alert("success ajax: " + JSON.stringify(dades));

		        	$('#taula_registresPartes tbody').empty();
		        	omplirRegistresTaula(dades.registres, dades.total);
			        
		        },
		        error: function(err){
		    		alert("error ajax: " + JSON.stringify(err));
				}
		    });
	}


	eliminarParte = function( codi){

	    $.ajax({
	        url: "/partes/" + codi + "/eliminar",   //?_method=DELETE
	        type: "GET",
	        dataType: "json",
	        contentType: "application/json; charset=utf-8",
	        success: function (missatge) {
	        	//alert("success del AJAX de CANVI DE DIA");
	        	
	        	$('#' + codi).remove();
	        	$('#registres').html(parseInt($('#registres').html()) - 1);
	        },
	        error: function(err){
	    		alert("error: " + err.message);
			}
	    });		

	}



	omplirRegistresTaula = function(rows, total2){

	    for (var i=0 ; i<rows.length; i++){
    		$('#taula_registresPartes > tbody').append(
		      	'<tr id=' + rows[i].codiParte + '>' +
			        '<td>' + rows[i].hab + '</td>' +
			        '<td>' + rows[i].parte + '</td>' +
			        '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarParte(' + rows[i].codiParte + ')" title="Eliminar registre">'  +
			        		'<span class="ui-icon ui-icon-circle-close red"></span>' +
			            '</button>' +
			        '</td>' +
		      	'</tr>'
    		);
    	}
    	$('#registres').html(total2);
	}



/*
    dialogTaulaBuscar = $( "#taulaBuscar" ).dialog({
      autoOpen: false,
      height: 0.1 * screen.height,
      //width: 300,
      modal: true,
      close: function() {
        //actualitzarComboTaulaBuscar();
        //form[ 0 ].reset();
      }
    });
*/
	// dialogTaulaBuscar.dialog( "open" );







    $( "#novaBusqueda" ).button().on( "click", function() {
      dialogTaulaBuscar.dialog( "open" );
      llegirTecnics();
    });





});
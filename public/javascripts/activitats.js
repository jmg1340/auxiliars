$(document).ready(function() {





    // Canviar color pestanya de la pagina actual a blau
    $("ul > li").removeClass();   // s'eliminen totes les clases dels elements del selector jquery
    $("ul > li").addClass("inactiu");   //afegeix la classe "inactiu" a tots els elements del selector jquery
    $("#menuActivitats").removeClass("inactiu");
    $("#menuActivitats").addClass("actiu");









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
 				actualitzarTaulaActivitats();
        	}
    });


    actualitzarTaulaActivitats = function(){
        var query = "?data2=" + $("#seleccioData").val()
        //alert("query:" + query);

        $.ajax({
            url: "/activitats/registresSegonsData" + query,
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            cache: false,
/*          data: JSON.stringify({
                data2:      $( "#seleccioData" ).val(),
                modalitat:  $( "#modalitatSeleccionada" ).val()
            }),
*/          success: function (dades) {
                //alert("success ajax: " + JSON.stringify(dades));
                
                $('#taula_llistaActivitats tbody').empty();
                omplirRegistresTaula(dades.registres);

            },
            error: function(err){
                alert("error ajax: " + JSON.stringify(err));
            }
        });
    }

    actualitzarTaulaActivitats();









    omplirRegistresTaula = function(rows){
        //alert("rows: " + JSON.stringify(rows));

        for (var i=0 ; i<rows.length; i++){
            $('#taula_llistaActivitats > tbody').append(
                '<tr id=' + rows[i].codiActivitat + '>' +
                                '<td>' + rows[i].data + '</td>' +
                                '<td>' + rows[i].servei + '</td>' +
                                '<td>' + rows[i].torn + '</td>' +
                                '<td>' + rows[i].auxiliar + '</td>' +
                                '<td>' + (rows[i].carros ? "Sí" : "No") + '</td>' +
                                '<td>' + (rows[i].banyeres ? "Sí" : "No") + '</td>' +
                                '<td>' + (rows[i].office ? "Sí" : "No") + '</td>' +
                                '<td>' + (rows[i].magatzemFarmacia ? "Sí" : "No") + '</td>' +
                                '<td>' + (rows[i].zonaTecnica ? "Sí" : "No") + '</td>' +
                                '<td>' + rows[i].observacions + '</td>' +
                    '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarActivitat(' + rows[i].codiActivitat + ')" title="Eliminar registre">'  +
                            '<span class="ui-icon ui-icon-circle-close red"></span>' +
                        '</button>' +
                        '</td>' +
    /*
                    '<td>' + 
                      '<form action="/activitat/' + dades.registres[i].codiAct + '/eliminar?_method=DELETE" method="POST">' +
                         '<button class="botoEliminar" onClick="return confirm(\'Confirmar eliminació de:\n\nPACIENT:\t\t<' + dades.registres[i].pacient +'>\');">Eliminar</button>' +
                      '</form>' + 
                    '<td>' +
    */                
                '</tr>'
            );
        }

    }




    $("#botoAfegirNovaActivitat").bind("click", function(event){
        event.preventDefault();   // si no poso aixo ajax retorna un error de OUT OF MEMORY

        var data        = $("#seleccioData").val() || null;
        var uh          = $("#uh").val() || null;
        var torn        = $("#torn").val() || null;
        var auxiliar    = $("#auxiliar").val() || null;
        var carros      = $("#carros").prop('checked') ? true : false ;
        var banyeres    = $("#banyeres").prop('checked') ? true : false ;
        var office      = $("#office").prop('checked') ? true : false ;
        var mfarmacia   = $("#mfarmacia").prop('checked') ? true : false ;
        var ztecnica    = $("#ztecnica").prop('checked') ? true : false ;
        var observacions = $("#observacions").val() || "";


        if ((data == null) || (uh == null) || (torn == null) || (auxiliar == null)) {
            alert ("falta [Data | Parte | torn | auxiliar] !!! ");
        } else {
            //var query = "?data2=" + data + "&" + "uh=" + uh + "&" + "torn=" + torn;
            //alert("query:" + query);

            $.ajax({
                //url: "/partes/BuscarRgistreServei" + query,
                url: "/activitats/novaActivitat",
                type: "POST",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                cache: false,
                data: JSON.stringify({
                    post_data:          data,
                    post_uh:            uh,
                    post_torn:          torn,
                    post_auxiliar:      auxiliar,
                    post_carros:        carros,
                    post_banyeres:      banyeres,
                    post_office:        office,
                    post_mfarmacia:     mfarmacia,
                    post_ztecnica:      ztecnica,
                    post_observacions:  observacions
                    //post_idServei: idServei 
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
                        //alert ("registre taula Activitats CREAT!!. );

                        $('#taula_llistaActivitats > tbody').append(
                            '<tr id=' + dades.nouReg.codiActivitat + '>' +
                                '<td>' + dades.nouReg.data + '</td>' +
                                '<td>' + dades.nouReg.servei + '</td>' +
                                '<td>' + dades.nouReg.torn + '</td>' +
                                '<td>' + dades.nouReg.auxiliar + '</td>' +
                                '<td>' + (dades.nouReg.carros ? "Sí" : "No") + '</td>' +
                                '<td>' + (dades.nouReg.banyeres ? "Sí" : "No") + '</td>' +
                                '<td>' + (dades.nouReg.office ? "Sí" : "No") + '</td>' +
                                '<td>' + (dades.nouReg.magatzemFarmacia ? "Sí" : "No") + '</td>' +
                                '<td>' + (dades.nouReg.zonaTecnica ? "Sí" : "No") + '</td>' +
                                '<td>' + dades.nouReg.observacions + '</td>' +
                                '<td><button class="ui-button ui-corner-all ui-widget" onClick="return eliminarActivitat(' + dades.nouReg.codiActivitat + ')" title="Eliminar registre">'  +
                                        '<span class="ui-icon ui-icon-circle-close red"></span>' +
                                    '</button>' +
                                '</td>' +
                            '</tr>'
                        );
                        
                        var colorFonsNouRegistre = $('#' + dades.nouReg.codiActivitat +' td:first-child').css("background-color");
                        $('#taula_llistaActivitats tbody > #' + dades.nouReg.codiActivitat +' td').fadeIn().css("background-color", "#00ff00");  // color verd
                        $('#taula_llistaActivitats tbody > #' + dades.nouReg.codiActivitat +' td').animate({"background-color": colorFonsNouRegistre}, 2000);  


                        // posem els INPUTS a zero
                        $("#uh").val("");
                        $("#torn").val("");
                        $("#auxiliar").val("");
                        $("#carros").prop('checked', false);
                        $("#banyeres").prop('checked', false);
                        $("#office").prop('checked', false);
                        $("#mfarmacia").prop('checked', false);
                        $("#ztecnica").prop('checked', false);
                        $("#observacions").val("");
                    }
                },
                error: function(err){
                    alert("error ajax: " + JSON.stringify(err));
                }
            });

        }
    });






    eliminarActivitat = function( codi){

        $.ajax({
            url: "/activitats/" + codi + "/eliminar",   //?_method=DELETE
            type: "GET",
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (missatge) {
                //alert("success del AJAX de CANVI DE DIA");
                
                $('#' + codi).remove();
            },
            error: function(err){
                alert("error: " + err.message);
            }
        });     

    }


















});
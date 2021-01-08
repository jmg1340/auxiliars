$(document).ready(function() {
   
    $("#pwd").bind("click", function(){
        $("#MissatgeError").html("");
    });

    // $("#botoLogin").bind("click", function(){
    //     //alert("pwd: " + $("#pwd").val());
    //     // obtencio resultats segons any i proves de l'any               
    //     $.ajax({
    //         url: "/login",
    //         type: "POST",
    //         dataType: "json",
    //         contentType: "application/json; charset=utf-8",
    //         data: JSON.stringify({ "pass": $("#pwd").val() }),
    //         data: JSON.stringify({
    //             data: dataSeleccionada
    //         }),
    //         success: function (errorLogin) {
                
    //             // la carrega de la pagina del llibre es fa des del servidor
    //             // en cas contrari hi ha un error ee sessio
    //             if (errorLogin){
    //            	    alert("Error login: " + errorLogin.error);
    //             }
                
    //         }
    //     });     
    // });



});
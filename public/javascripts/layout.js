$(document).ready(function() {
   

/*

	$("#menuPartes").bind("click", function(){
		$("ul > li").removeClass();  // totes les classes s'eliminen
		$("ul > li").addClass("inactiu"); 	//afegeix la classe "inactiu" a tots els elements
		$(this).removeClass("inactiu");
		$(this).addClass("actiu");
	});

	$("#menuActivitats").bind("click", function(){
		$("ul > li").removeClass();  // totes les classes s'eliminen
		$("ul > li").addClass("inactiu"); 	//afegeix la classe "inactiu" a tots els elements
		$(this).removeClass("inactiu");
		$(this).addClass("actiu");
	});

	$("#menuMaterial").bind("click", function(){
		$("ul > li").removeClass();  // totes les classes s'eliminen
		$("ul > li").addClass("inactiu"); 	//afegeix la classe "inactiu" a tots els elements
		$(this).removeClass("inactiu");
		$(this).addClass("actiu");
	});

	$("#menuLogout").bind("click", function(){
		$("ul > li").removeClass();  // totes les classes s'eliminen
		$("ul > li").addClass("inactiu"); 	//afegeix la classe "inactiu" a tots els elements
		$(this).removeClass("inactiu");
		$(this).addClass("actiu");
	});


*/









   (function abreSinNavegacion(){
    open('index1.htm', 'principal', 'location=no,menubar=no,status=no,toolbar=no');
    cerrar();
   })();

   function cerrar() {
    var ventana = window.self;
    ventana.opener = window.self;
    ventana.close();
   }


});
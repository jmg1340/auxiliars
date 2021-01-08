
/**
*	Converteix data en diferents formats
*	format INPUTS	format OUTPUTS
*	"dd/mm/aaaa"	"aaaa-mm-dd"
*	"aaaa-mm-dd"	"dd/mm/aaaa"
*/
exports.convertirData = function(data, formatInput, formatOutput){
	console.log("*** estic a utils.convertirData !!  ******");
	console.log("typeof data: " + typeof data);

	if(typeof data === "string"){
		if (formatInput == "dd-mm-aaaa"){
			if (formatOutput === "aaaa-mm-dd"){
				return data.replace( /(\d{2})-(\d{2})-(\d{4})/, "$3-$2-$1");
			}
		}else if (formatInput === "aaaa-mm-dd"){
			if (formatOutput === "dd-mm-aaaa"){
				return data.replace( /(\d{4})-(\d{2})-(\d{2})/, "$3/$2/$1");
			}
		}
	}

	if(typeof data === "object"){
		if (formatOutput == "dd-mm-aaaa"){
			function pad(s) { return (s < 10) ? '0' + s : s; }
			var d = new Date(data);
			console.log("d: " + d);
			return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('-');			
		}
	}
}
	
	



// var mes = (new Date().getMonth()+1 < 10) ? "0" + (new Date().getMonth()+1) : (new Date().getMonth()+1) ;
// var dia =  (new Date().getDate() < 10) ? "0" + (new Date().getDate()) : (new Date().getDate());
// var dataAAAAMMDD = new Date().getFullYear() + "-" + mes  + "-" + dia;

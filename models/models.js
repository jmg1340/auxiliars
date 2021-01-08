
var path = require("path");

// Cargar modelo ORM (Object Relational Mapping)
var Sequelize = require("sequelize");

var sequelize = new Sequelize('AUXILIARS', 'aux', 'asepeyo', {
  host: 'localhost',
  dialect: 'mysql',
  
  options:{
    port: 5432,
    //timezone: '+02:00'
  },

  pool: {
    maxConnections: 20,
    minConnections: 0,
    maxIdleTime: 10000
  }
}); 










//Importar la definicio de la taula 01Serveis de tblServeis.js
var TblServeis = sequelize.import(path.join(__dirname, "tblServeis"));

//Importar la definicio de la taula 02PARTES de tblPartes.js
var TblPartes = sequelize.import(path.join(__dirname, "tblPartes"));



/*
* Relacions entre taules Serveis i partes
*/
TblServeis.hasMany(TblPartes, {foreignKey: 'idServei', onDelete: "CASCADE", constraints: true} );  // es crearà camp partesId a la taula Serveis
TblPartes.belongsTo(TblServeis, {foreignKey: 'idServei', onDelete: "CASCADE", constraints: true}); // Adds idServei to TblPartes


exports.TblPartes = TblPartes; // exporta la definicio de la taula tblPartes
exports.TblServeis = TblServeis; // exporta la definicio de la taula tblServeis


//---------------





//Importar la definicio de la taula 10Activitats de tblActivitats.js
var TblActivitats = sequelize.import(path.join(__dirname, "tblActivitats"));
exports.TblActivitats = TblActivitats;


//---------------





//Importar la definicio de la taula 20Control de tblControl.js
var TblControl = sequelize.import(path.join(__dirname, "tblControl"));

//Importar la definicio de la taula 21ControlDetall de tblControlDetall.js
var TblControlDetall = sequelize.import(path.join(__dirname, "tblControlDetall"));



/*
* Relacions entre taules Control i ControlDetall
*/
TblControl.hasMany(TblControlDetall, {foreignKey: 'idControl', onDelete: "CASCADE", constraints: true} );  // es crearà camp ControlDetallId a la taula Control
TblControlDetall.belongsTo(TblControl, {foreignKey: 'idControl', onDelete: "CASCADE", constraints: true}); // Adds idControl to TblControlDetall


exports.TblControlDetall = TblControlDetall; // exporta la definicio de la taula tblControlDetall
exports.TblControl = TblControl; // exporta la definicio de la taula tblControl











//will, based on your model definitions, create any missing tables.

sequelize.sync().then(function(){
  console.log("conexio a bdd 'PartesAuxiliars' (Mysql) establerta !!");
  
  TblServeis.count().then(function(countRegTblServeis){
    console.log("registres de TblServeis: " + countRegTblServeis);
  });

  TblPartes.count().then(function(countRegTblPartes){
    console.log("registres de TblPartes: " + countRegTblPartes);
  });
  

})

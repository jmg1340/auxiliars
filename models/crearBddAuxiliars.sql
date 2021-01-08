
drop database AUXILIARS;
select 'bdd Auxiliars eliminada' AS '';

create database AUXILIARS;

/*	La definicio de taules i camps les fa el sequelize amb en la creació del model.


use AUXILIARS;
create table 01serveis (
	codiServei 	int primary key auto_increment,
	data 		date,
	servei		varchar(5),
	torn	 	varchar(10),
	auxiliar	varchar(30),
	-- idParte 	int,	No posem aquest camp pq Sequelize el posa automaticament a l'establir la relacio amb taula Partes. Quan passi aixó es creara un camp "partesId"
	registre	timestamp
);
select 'taula 01SERVEIS creada' AS '';
describe 01serveis;

create table 02partes (
	codiParte	int primary key auto_increment,
	hab 		varchar(10),
	parte 		text
);
select 'taula 02PARTES creada' AS '';
describe 02partes;

*/




-- show tables;
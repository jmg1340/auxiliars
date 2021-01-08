
var opcions = 
{
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: false,

  // don't delete database entries but set the newly added attribute deletedAt
  // to the current date (when deletion was done). paranoid will only work if
  // timestamps are enabled
  paranoid: false,

  // don't use camelcase for automatically added attributes but underscore style
  // so updatedAt will be updated_at
  underscored: true,

  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true,

  // define the table's name
  //tableName: 'my_very_custom_table_name'	
}





module.exports = function(sequelize,DataTypes){
	return sequelize.define(
		'21ControlDetall',
		{

			codiDetall:
			{
				type: 	DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta codi Detall"
					}
				}
			},
			
			idMaterial:
			{
				type: 	DataTypes.INTEGER,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta material"
					}
				}
			},
			
			stock:
			{
				type: 	DataTypes.INTEGER,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta quantitat stock"
					}
				}
			},
			
			esteril:
			{
				type: 	DataTypes.INTEGER,
/*				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta quantitat esterilitzada"
					}
				}
*/			},
			
			noEsteril:
			{
				type: 	DataTypes.INTEGER,
/*				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta quantitat no esterilitzat"
					}
				}
*/			},
			
			solicitat:
			{
				type: 	DataTypes.INTEGER,
/*				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta quantitat solicitada"
					}
				}
*/			},
			
			rebutEsteril:
			{
				type: 	DataTypes.INTEGER,
/*				validate:
				{
					notEmpty: 
					{
						msg: "-> Esterilitzacio: falta quantitat rebuda"
					}
				}
*/			},
			
			entregatEsteril:
			{
				type: 	DataTypes.INTEGER,
/*				validate:
				{
					notEmpty: 
					{
						msg: "-> Esterilitzacio: Falta quantitat entregada"
					}
				}
*/			},
			
			observacions:
			{
				type: 	DataTypes.STRING,
/*				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta observacions"
					}
				}
*/			},
			
		},
		opcions
	);
}
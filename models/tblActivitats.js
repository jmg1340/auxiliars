
var opcions = 
{
  // don't add the timestamp attributes (updatedAt, createdAt)
  timestamps: true,

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
		'10activitats',
		{
			codiActivitat:
			{
				type: 	DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta codiServei"
					}
				}
			},
			
			data:
			{
				type: 	DataTypes.DATEONLY,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta data"
					}
				}
			},
			

			servei:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta servei"
					}
				}
			},
			
			
			torn:
			{
				type: 	DataTypes.STRING,
				validate:
				{
					notEmpty: 
					{
						msg: "-> Falta torn"
					}
				}
			},
			
			
			auxiliar:
			{
				type: 	DataTypes.STRING,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			},


			carros:
			{
				type: 	DataTypes.BOOLEAN,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			},


			banyeres:
			{
				type: 	DataTypes.BOOLEAN,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			},


			office:
			{
				type: 	DataTypes.BOOLEAN,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			},


			magatzemFarmacia:
			{
				type: 	DataTypes.BOOLEAN,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			},


			zonaTecnica:
			{
				type: 	DataTypes.BOOLEAN,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			},


			observacions:
			{
				type: 	DataTypes.STRING,
				// validate:
				// {
				// 	notEmpty: 
				// 	{
				// 		msg: "-> Falta auxiliar"
				// 	}
				// }
			}


			// El camp "registre" el creo en el mateix MySQL (a traves del script) ja que pel que he vist
			// per internet sembla que no existeix DataTypes.TIMESTAMP

		},
		opcions
	);
}
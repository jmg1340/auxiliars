
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
		'20Control',
		{
			codi:
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
			
			
			PersAux:
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
			
			
			PersEsteri:
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
const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('genre', {
    id:{
        primaryKey:true,
        type: DataTypes.INTEGER,
        autoIncrement:true,
        allowNull: false,
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,        
    }
  },{
      timestamps:false,
  });
};
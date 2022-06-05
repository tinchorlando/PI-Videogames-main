const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id:{
      type:DataTypes.UUID,
      defaultValue:DataTypes.UUIDV4,
      primaryKey:true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true,
      
    },
    image:{
      type: DataTypes.STRING,
    },
    description:{
      type: DataTypes.TEXT,
      allowNull:false,
    },
    released:{
      type: DataTypes.DATEONLY,    
    },
    rating:{
      type: DataTypes.FLOAT,
    },
    platforms:{
      
      type: DataTypes.ARRAY(DataTypes.TEXT),
      allowNull:false,      
    }
  },{
    timestamps:false,
  });
};

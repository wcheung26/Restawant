module.exports = function(sequelize, DataTypes) {
  var Promotion = sequelize.define("promotion", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    offer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    expiration: { 
      type: DataTypes.DATEONLY, 
      allowNull: false, 
      validate: { 
        isDate: true     
      }
    },
    reward: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        isFloat: true
      }
    }
 
  });

    Promotion.associate = function(models) {

      Promotion.belongsTo(models.restaurant, {
        foreignKey: {
          name: "restaurantId",
          allowNull: false
        }
      }); 

      Promotion.hasMany(models.discount, {
        onDelete: "CASCADE"
      });
      
    };

  return Promotion;
};
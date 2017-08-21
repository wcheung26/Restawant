module.exports = function(sequelize, DataTypes) {
  var Discounts = sequelize.define("Discounts", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    discount: {
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
    }
 
  });

    Discounts.associate = function(models) {
      Discounts.belongsTo(models.Restaurants, {
        foreignKey: {
          allowNull: false
        }
      }); 
    }

    Discounts.associate = function(models) {
      Discounts.belongsTo(models.Influencers, {
        foreignKey: {
          allowNull: false
        }
      }); 
    }

  return Discounts;
};
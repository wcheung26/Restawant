module.exports = function(sequelize, DataTypes) {
  var Discount = sequelize.define("discount", {
    clicks: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0
    }, 

    url: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      validate: { 
        isUrl: true     
      }
    }
 
  });

    Discount.associate = function(models) {
      Discount.belongsTo(models.promotion, {
        foreignKey: {
          allowNull: false
        }
      }); 
    }

    Discount.associate = function(models) {
      Discount.belongsTo(models.influencer, {
        foreignKey: {
          allowNull: false
        }
      }); 
    }

  return Discount;
};
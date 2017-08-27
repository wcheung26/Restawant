module.exports = function(sequelize, DataTypes) {
  var Discount = sequelize.define("discount", {
    clicks: {
      type: DataTypes.INTEGER, 
      allowNull: false, 
      defaultValue: 0
    }, 

    url: { 
      type: DataTypes.STRING,
      unique: true, 
      allowNull: false, 
      validate: { 
        isUrl: true     
      }
    }
  });

    Discount.associate = function(models) {
      
      Discount.belongsTo(models.promotion, {
        foreignKey: {
          name: "promotionId",
          allowNull: false
        }
      }); 

      Discount.belongsTo(models.influencer, {
        foreignKey: {
          name: "influencerId",
          allowNull: false
        }
      }); 

    }

  return Discount;
};
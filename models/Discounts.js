module.exports = function(sequelize, DataTypes) {

  var Discount = sequelize.define("discount", {
    offer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discountUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true
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

  Discount.associate = function(models) {
    Discount.belongsTo(models.restaurant, {
      foreignKey: {
        name: "restaurantId",
        allowNull: false
      }
    });
    
    Discount.belongsTo(models.influencer, {
      foreignKey: {
        name: "influencerId",
        allowNull: false
      }
    });
  };

  return Discount;
};
module.exports = function(sequelize, DataTypes) {
  var Promotion = sequelize.define("promotion", {
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

    Promotion.associate = function(models) {
      Promotion.belongsTo(models.restaurant, {
        foreignKey: {
          allowNull: false
        }
      }); 
    };

    Promotion.associate = function(models) {
      Promotion.hasMany(models.discount, {
        onDelete: "cascade"
      })
    }; 

  return Promotion;
};
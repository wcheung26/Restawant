module.exports = function(sequelize, DataTypes) {
  var Influencers = sequelize.define("Influencers", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6]
      }
    }
 
  });

  Influencers.associate = function(models) {
    Influencers.hasMany(models.Discounts, {
      onDelete: "cascade"
    })
  }; 

  return Influencers;
};
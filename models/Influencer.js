module.exports = function(sequelize, DataTypes) {
  
  var Influencer = sequelize.define("influencer", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isRestaurant: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    getterMethods: {
      isRestaurant: function() {
        return this.getDataValue('isRestaurant');
      }
    }
  });
  
  Influencer.associate = function(models) {
    Influencer.hasMany(models.discount, {
      onDelete: "CASCADE"
    })
  }; 

  return Influencer;
};
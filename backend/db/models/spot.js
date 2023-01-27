'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Spot extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Spot.hasMany(models.SpotImage, { foreignKey: 'spotId', onDelete: 'CASCADE', hooks: true });

      Spot.belongsTo(models.User, { as: 'Owner', foreignKey: 'ownerId' });

      Spot.belongsToMany(models.User, {
        through: models.Booking,
        foreignKey: 'spotId',
        otherKey: 'userId'
      })

      Spot.belongsToMany(models.User, {
        through: models.Review,
        foreignKey: 'spotId',
        otherKey: 'userId'
      })

      Spot.hasMany(models.Review, { foreignKey: "spotId" })
    }
  }
  Spot.init({
    ownerId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    lat: DataTypes.DECIMAL,
    lng: DataTypes.DECIMAL,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.DECIMAL
  }, {
    sequelize,
    modelName: 'Spot',
    scopes: {
      currentSpot: {
        attributes: { exclude: ["createdAt", "updatedAt"] }
      },
      currentSpotnoDesc: {
        attributes: { exclude: ["description", "createdAt", "updatedAt"] }
      }
    }
  });
  return Spot;
};

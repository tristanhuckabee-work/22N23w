'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    static associate(models) {
      // Step 2 - define polymorphic association
      UserProfile.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'UserProfile'
        }
      });
    }
  };
  UserProfile.init({
    displayName: DataTypes.STRING,
    birthMonth: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};
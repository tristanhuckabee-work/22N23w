'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    getImageable(options) {
      if (!this.imageableType) return Promise.resolve(null);

      let method = `get${this.imageableType}`;
      return this[method](options);
    }

    static associate(models) {
      // define association here
      Image.belongsTo(models.BlogPost, {
        foreignKey: 'imageableId',
        constraints: false
      });
      Image.belongsTo(models.UserProfile, {
        foreignKey: 'imageableId',
        constraints: false
      });
    }
  };
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageableType: DataTypes.ENUM('UserProfile', 'BlogPost'),
    imageableId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Image',
  });
  // Performs this callback after each find method (findOne, findAll, findByPk, etc.)
  Image.addHook('afterFind', findResult => {
    // If the result of the find isn't an array, make it an array
    if (!Array.isArray(findResult)) findResult = [findResult];
    // Iterate over the results
    for (let i = 0; i < findResult.length; i++) {
      let instance = findResult[i];
      let type = instance.imageableType;
      // Check if it's a BlogPost or UserProfile
      if (type === 'BlogPost') {
        // Assign imageable to the BlogPost
        instance.imageable = instance.BlogPost;
        
        // Delete the BlogPost in the object and in the nexted dataValues
        delete instance.BlogPost;
        delete instance.dataValues.BlogPost;
      } else if (type === 'UserProfile') {
        instance.imageable = instance.UserProfile;
        delete instance.UserProfile;
        delete instance.dataValues.UserProfile;
      } else {
        // If not a BlogPost or UserProfile, return null
        instance.imageable = null;
      }
    }
  })
  return Image;
};
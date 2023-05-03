'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      // Step 2 - define polymorphic association
      BlogPost.hasMany(models.Image, {
        foreignKey: 'imageableId',
        constraints: false,
        scope: {
          imageableType: 'BlogPost'
        }
      });
    }
  };
  BlogPost.init({
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'BlogPost',
  });
  return BlogPost;
};
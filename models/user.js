'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      user.hasOne(models.order, {
        foreignKey: "user_id"
      })
    }

    static async getById(id) {
      try {
        let usr = await user.findOne({
          where: {
            id,
          }
        });
        if(!usr) throw new Error("User not found!");
  
        let result = usr.dataValues;
  
        return result
        
      } catch (err) {
        console.error(err);
      }
    }
  }
  user.init({
    full_name: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return user;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      order.hasMany(models.user, {
        foreignKey: "id"
      })
    }
    static async getById(id) {
      try {
        let ord = await order.findOne({
          where: {
            id,
          }
        });
        if (!ord) throw new Error("Order not found");
        let result = ord.dataValues;
        return result;
      } catch (err) {
        console.error(err);
      }
    }
  }
  order.init({
    user_id: DataTypes.INTEGER,
    item_id: DataTypes.INTEGER,
    quantity_order: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'order',
  });
  return order;
};
'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      item.hasOne(models.order, {
        foreignKey: "item_id"
      })
    }

    static async getById(id) {
      try {
        let barang = await item.findOne({
          where: {
            id,
          }
        });
        if (!barang) throw new Error("Item not found");
        let result = barang.dataValues;
        return result;
      } catch (err) {
        console.error(err);
      }
    }
  }
  item.init({
    item_name: DataTypes.STRING,
    item_price: DataTypes.FLOAT,
    item_stock: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'item',
  });
  return item;
};
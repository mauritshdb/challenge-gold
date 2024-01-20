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
    }

    static async getById(id) {
      let barang = await item.findOne({
        where: {
          id,
        }
      });

      if (!barang) throw new Error(`Item by ${id} not found`);

      let result = barang.dataValues;

      return result;
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
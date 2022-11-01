import { DataTypes, Model, ModelDefined, Sequelize } from "sequelize"
import { ItemAttributes, ItemCreationAtrributes } from "./items"

export interface ItemInstance
  extends Model<ItemAttributes, ItemCreationAtrributes>,
    ItemAttributes {}

type ItemModelDefined = ModelDefined<ItemAttributes, ItemCreationAtrributes>

function ItemModel(sequelize: Sequelize): ItemModelDefined {
  return sequelize.define("Items", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 100],
          msg: "name should be greater than 5 and less than or equal to 100",
        },
        notNull: {
          msg: "name should be present",
        },
      },
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [5, 2000],
          msg: "description should be greater than 5 and less than or equal to 2000",
        },
        notNull: {
          msg: "description should be present",
        },
      },
    },
  })
}

export default ItemModel

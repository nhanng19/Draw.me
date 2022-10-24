const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Drawing extends Model {}

Drawing.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    link: {
      type: DataTypes.TEXT("long"), // Necessary to store base 64 encoded data URL; otherwise payload would be too big
      allowNull: false,
    },
    date_created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "drawing",
  }
);

module.exports = Drawing;

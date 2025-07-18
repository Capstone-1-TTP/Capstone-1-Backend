const { DataTypes } = require("sequelize");
const db = require("./db");

const Poll = db.define("poll", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 20],
    },
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 300],
    },
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  closingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Poll;

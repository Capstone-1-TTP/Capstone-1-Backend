const { DataTypes } = require("sequelize");
const db = require("./db");

const Poll = db.define("poll", {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100],
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
    defaultValue: "draft",
    validate: {
      isIn: [["draft", "published", "closed"]],
    }
  },
  closingDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  authRequired: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  link: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "user",
      key: "id",
    },
  },
});

module.exports = Poll;

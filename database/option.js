const { DataTypes } = require("sequelize");
const db = require("./db");

const Option = db.define("option", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    details: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        },
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "poll",
            key: "id",
        },
    },
});

module.exports = Option;

const { DataTypes } = require("sequelize");
const db = require("./db");

const Ballot = db.define("ballot", {
    optionsRanking: {
        type: DataTypes.ARRAY,
        allowNull: false,
    },
    isSubmitted: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: "user",
            key: "id",
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

module.exports = Ballot;

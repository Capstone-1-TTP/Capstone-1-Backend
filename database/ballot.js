const { DataTypes } = require("sequelize");
const db = require("./db");

const Ballot = db.define("ballot", {
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    optionsRanking: {
        type: DataTypes.JSONB,
        allowNull: false,
    },
    isSubmitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

module.exports = Ballot;
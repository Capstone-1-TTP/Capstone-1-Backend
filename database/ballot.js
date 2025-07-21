const { DataTypes } = require("sequelize");
const db = require("./db");

const Ballot = db.define("ballot", {
    ballotId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    pollId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    optionsRanking: {
        type: DataTypes.ARRAY,
        allowNull: false,
    },
    isSubmitted: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
    }
});

module.exports = Ballot;
const { DataTypes } = require("sequelize");
const db = require("./db");
// const Poll = require("./poll");

const Option = db.define("option", {
    details: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [1, 100],
        },
    },
});

// Option.belongsTo(Poll);
// Poll.hasMany(Option);

module.exports = Option;

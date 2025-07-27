const { DataTypes } = require("sequelize");
const db = require("./db");
const Option = require("./option");

const Ballot = db.define("ballot", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    optionsRanking: {
        type: DataTypes.ARRAY(DataTypes.INTEGER),
        allowNull: false,
        validate: {
            async validateOptionIds(value) {
                if (!value || value.length === 0) return;
                
                // Get all valid option IDs for this poll
                const validOptions = await Option.findAll({
                    where: { pollId: this.pollId },
                    attributes: ['id'],
                });
                
                const validOptionIds = validOptions.map(opt => opt.id);
                const invalidIds = value.filter(id => !validOptionIds.includes(id));
                
                if (invalidIds.length > 0) {
                    throw new Error(`Invalid option IDs for this poll: ${invalidIds.join(', ')}`);
                }
            },
            checkForDuplicates(value) {
                if (!value) return;

                const uniqueValues = [...new Set(value)];
                
                if (uniqueValues.length !== value.length) {
                    throw new Error("Ranking cannot contain duplicate option IDs");
                }
            }
        },
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

const db = require("./db");
const User = require("./user");
const Poll = require("./poll");
const Ballot = require("./ballot");
const Option = require("./option");

// userPoll reference
Poll.belongsTo(User);
User.hasMany(Poll);

// userBallot reference
Ballot.belongsTo(User);
User.hasMany(Ballot);

// pollBallot reference
Ballot.belongsTo(Poll);
Poll.hasMany(Ballot);

// pollOption reference
Option.belongsTo(Poll);
Poll.hasMany(Option);

module.exports = {
  db,
  User,
  Poll,
  Ballot,
  Option,
};

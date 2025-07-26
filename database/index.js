const db = require("./db");
const User = require("./user");
const Poll = require("./poll");
const Ballot = require("./ballot");
const Option = require("./option");

// userPoll reference - connects User and Poll tables
Poll.belongsTo(User);
User.hasMany(Poll);

// userBallot reference - connects User and Ballot tables
Ballot.belongsTo(User);
User.hasMany(Ballot);

// pollBallot reference - connects Poll and Ballot tables
Ballot.belongsTo(Poll);
Poll.hasMany(Ballot);

// pollOption reference - connects Poll and Option tables
Option.belongsTo(Poll);
Poll.hasMany(Option);

module.exports = {
  db,
  User,
  Poll,
  Ballot,
  Option,
};

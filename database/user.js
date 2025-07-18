const { DataTypes } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");

// User Model
const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 30]
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: true,
    validate: {
      len: [2, 30]
    },
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [3, 20],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,  // <-- Consider changing to "false" if we're collecting email during sign up in the future
    unique: true,     
    validate: {
      isEmail: true, 
    },
  },
  auth0Id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  profilePic: {
    type: DataTypes.STRING,
    defaultValue: "", 
  }, 
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

// Instance method to check password
User.prototype.checkPassword = function (password) {
  if (!this.passwordHash) {
    return false; // Auth0 users don't have passwords
  }
  return bcrypt.compareSync(password, this.passwordHash);
};

// Class method to hash password
User.hashPassword = function (password) {
  return bcrypt.hashSync(password, 10);
};

module.exports = User;

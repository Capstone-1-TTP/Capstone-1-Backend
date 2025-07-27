const { DataTypes } = require("sequelize");
const db = require("./db");
const bcrypt = require("bcrypt");

// User model for database
const User = db.define("user", {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 30],
    },
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 30],
    },
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true, 
    },
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  auth0Id: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  profilePic: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  isAdmin: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
  isDisabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
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

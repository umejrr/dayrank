const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const validator = require("validator");

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
});

UserSchema.statics.signup = async function (username, email, password) {
  const errors = {};

  const userExist = await this.findOne({ username });
  const emailExist = await this.findOne({ email });

  if (!username) errors.username = "username must be filled bro";
  else if (userExist) errors.username = "username taken lol";

  if (!email) errors.email = "email must be filled bro";
  else if (!validator.isEmail(email)) errors.email = "email invalid bru";
  else if (emailExist) errors.email = "email taken lol";

  if (!password) errors.password = "password must be filled bro";
  else if (!validator.isStrongPassword(password))
    errors.password = "password 2 weak";

  if (Object.keys(errors).length > 0) {
    throw errors;
  }

  let salt = await bcrypt.genSalt(10);
  let hash = await bcrypt.hash(password, salt);

  const user = await this.create({ username, email, password: hash });

  return user;
};

UserSchema.statics.login = async function (email, password) {
  const errors = {};
  const user = await this.findOne({ email });

  if (!email) errors.email = "email must be filled bro";
  if (!password) errors.password = "pw must be filled bro";

  if (Object.keys(errors).length > 0) {
    throw errors;
  }

  if (!user) {
    errors.email = "incorrect email";
    throw errors;
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    errors.password = "incorrect pw";
    throw errors;
  }

  return user;
};

const User = mongoose.model("User", UserSchema);

module.exports = User;

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const registerUser = async (username, password) => {
  try {
    const hashPass = await bcrypt.hash(password, 10);
    return await User.create({ username, password: hashPass });
  } catch (error) {
    console.log("Error in register user", error);
    return 1;
  }
};

const loginUser = async (username, password) => {
  try {
    const user = await User.findOne({ username });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      // invalid login creadentials
      return 1;
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET
    );
    return { token, role: user.role };
  } catch (error) {
    console.log("Error in login user", error);
    return 2;
  }
};

module.exports = { registerUser, loginUser };

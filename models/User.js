const { mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: { type: String, enum: ["admin", "user"], default: "user" },
});

const User = mongoose.model("User", userSchema);
module.exports = User;

(async () => {
  try {
    const adminExists = await User.findOne({ role: "admin" });
    if (!adminExists) {
      const hashPass = await bcrypt.hash(process.env.ADMIN_PASSWORD, 10);
      await User.create({
        username: "admin",
        password: hashPass,
        role: "admin",
      });
      console.log(
        "Created admin with username: admin and password: ",
        process.env.ADMIN_PASSWORD
      );
    }
  } catch (error) {
    console.error("Error creating admin user", error);
  }
})();

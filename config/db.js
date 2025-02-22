const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connection established");
  } catch (error) {
    console.error("Database connection error: ", error);
    process.exit(1);
  }
};
module.exports = connectDB;

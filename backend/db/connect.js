const mongoose = require("mongoose");
const dns = require("dns");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
    console.log("MongoDB Connected");
    }
    // mongoose.connection.on("connected", () => {
    //   console.log(
    //     `MongoDB Connected: ${mongoose.connection.host}`
    //   );
    // });

    mongoose.connection.on("error", (err) => {
      console.error("MongoDB Error:", err.message);
    });

    mongoose.connection.on("disconnected", () => {
      console.log("MongoDB Disconnected");
    });
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
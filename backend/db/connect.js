const mongoose = require("mongoose");
const dns = require("dns");

const Admin = require("../Models/admin.model");

dns.setServers(["8.8.8.8", "8.8.4.4"]);

const seedAdmins = async () => {
  try {
    const defaultAdmins = [
      {
        fullName: "Asha Menon",
        email: "asha.admin@agileinsure.in",
        phone: "9876543210",
        password: "Super@123",
        role: "Super Admin",
        permissions: ["all"],
      },
      {
        fullName: "Rohit Kapoor",
        email: "rohit.manager@agileinsure.in",
        phone: "9876543211",
        password: "Manager@123",
        role: "Insurance Manager",
        permissions: ["policies", "users", "requirements"],
      },
      {
        fullName: "Naina Shah",
        email: "naina.claims@agileinsure.in",
        phone: "9876543212",
        password: "Claims@123",
        role: "Claims Officer",
        permissions: ["claims", "documents"],
      },
      {
        fullName: "Imran Ali",
        email: "imran.support@agileinsure.in",
        phone: "9876543213",
        password: "Support@123",
        role: "Support Executive",
        permissions: ["support"],
      },
    ];

    for (const adminData of defaultAdmins) {
      const exists = await Admin.findOne({ email: adminData.email });
      if (!exists) {
        console.log(`Seeding default admin: ${adminData.fullName}`);
        await Admin.create(adminData);
      }
    }
    console.log("Default admins check/seeding completed.");
  } catch (error) {
    console.error("Failed to seed default admins:", error.message);
  }
};

const connectDB = async () => {
  try {
    console.log("Connecting to MongoDB...");

    const conn = await mongoose.connect(process.env.MONGO_URI);
    if (conn) {
      console.log("MongoDB Connected");
      await seedAdmins();
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
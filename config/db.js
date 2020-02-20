// mongodb connection done here

const mongoose = require("mongoose");

const config = require("config");

// getting string from config file

const db = config.get("mongoURI");

// connecting to mongo db
// this gives us a promise

const connectDB = async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    console.log("MongoDB Connected");
  } catch (err) {
    console.error(err.message);
    // Exit process with failure
    process.exit(1);
  }
};

module.exports = connectDB;

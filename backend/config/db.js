const mongoose = require("mongoose");
const trendingJob = require("../cron/trendingJob");

const connectDB = async () => {
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("DB Connected Successfully");
      trendingJob.start();
    })
    .catch((err) => console.log("DB Connection Error:", err));
};

module.exports = connectDB;

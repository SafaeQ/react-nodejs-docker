const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
  await mongoose.connect(process.env.DATABASE);
}
module.exports = connect;

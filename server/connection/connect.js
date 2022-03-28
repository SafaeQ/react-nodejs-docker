const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

async function connect() {
  await mongoose.connect('mongodb://127.0.0.1:27017/hotel-booking-2');
}
module.exports = connect;

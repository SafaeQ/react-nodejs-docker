const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      max: 255,
      min: 5,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max: 255,
      min: 6,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      max: 1024,
      min: 6,
    },
    avatar: {
      type: String,
      default:
        "https://media.istockphoto.com/vectors/default-profile-picture-avatar-photo-placeholder-vector-illustration-vector-id1223671392?k=20&m=1223671392&s=612x612&w=0&h=lGpj2vWAI3WUT1JeJWm1PRoHT3V15_1pdcTn2szdwQ0=",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Admin", adminSchema);

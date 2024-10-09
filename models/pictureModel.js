const mongoose = require("mongoose");

const pictureSchema = new mongoose.Schema({
  Photographer: {
    type: String,
    unique: true,
    required: true,
  },
  Title: {
    type: String,
    unique: false,
    required: true,
  },
  Borough: {
    type: String,
    unique: false,
    required: true,
  },
  Descripition: [
    {
      type: String,
    },
  ],
});

const Picture = mongoose.model("Picture", pictureSchema);

module.exports = Picture;
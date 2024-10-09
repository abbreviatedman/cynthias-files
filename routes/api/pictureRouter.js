const express = require("express");
const router = express.Router();

const {
  getAllPicture,
  getOnePicture,
  createOnePicture,
  deleteOnePicture,
  updateOnePicture,
} = require("../../controllers/api/pictureController");

router.get("/allPicture", getAllPicture);

router.get("/onePicture/:name", getOnePicture);


router.post("/createOnePicture", createOnePicture);


router.put("/updateOnePicture/:name", updateOnePicture);


router.delete("/deleteOnePicture/:name", deleteOnePicture);

module.exports = router;

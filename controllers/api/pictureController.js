
const Picture = require("../../models/pictureModel");


async function getAllPicture(req, res) {
  try {
    let result = await Picture.find({});

    res.json({
      message: "success",
      payload: result,
    });
  } catch (err) {
    console.log(`getAllPicture error: ${err}`);

    res.json({
      message: "failure",
      payload: err,
    });
  }
}
async function getOnePicture(req, res) {
  try {
    let result = await Picture.find({ Title: req.params.Title });

    res.json({
      message: "success",
      payload: result,
    });
  } catch (error) {
    console.log(`getOnePicture error: ${error}`);

    res.json({
      message: "failure",
      payload: error,
    });
  }
}
 async function createOnePicture(req, res) {
  try {
     let newPicture = {
      Photographer: req.body.Photographer,
      Title: req.body.Title,
      Borough: req.body.Borough,
      Description: req.body.Descriptio.split(", "),
      URL: req.body.URL,
    };
    await Picture.create(newPicture);

    res.redirect(`/onePic/${newPicture.Title}`);
  } catch (error) {
    console.log(`createOnePicture error: ${error}`);
    res.json({
      message: "failure",
      payload: `createOnePicture error: ${error}`,
    });
  }
}

async function deleteOnePicture(req, res) {
  try {
    let deleteTarget = req.params.Title;

    await Picture.deleteOne({ Title: deleteTarget });

    res.redirect("/allPic");
  } catch (error) {
    console.log(`deleteOnePicture error: ${error}`);

      res.json({
      message: "failure",
      payload: `deleteOnePicture error: ${error}`,
    });
  }
}

async function updateOnePicture(req, res) {
  try {
    let updatedPic = {
      Photographer: req.body.Photographer,
      Title: req.body.Title,
      Borough: req.body.Borough,
      Description: req.body.Description.split(", "),
    };

    await Picture.updateOne(
      { Photographer: req.params.Photographer },
      { $set: updatedPic },
      { upsert: true }
    );

    res.redirect(`/onePic/${updatedPic.Title}`);
  } catch (error) {
   console.log(`updateOnePicture: ${error}`);

    res.json({
      message: "failure",
      payload: `updateOnePicture: ${error}`,
    });
  }
}

module.exports = {
  getAllPicture,
  getOnePicture,
  createOnePicture,
  deleteOnePicture,
  updateOnePicture,
};

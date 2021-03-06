const { Router } = require("express");
const BikeController = require("./bike.controller");

const router = Router();

router.get("/", BikeController.getBikes);
router.post(
  "/",
  BikeController.validateData,
  BikeController.checkUniqueId,
  BikeController.createBike
);
router.patch("/", BikeController.updateBike);
router.delete("/", BikeController.deleteBike);

module.exports = router;

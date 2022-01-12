const express = require("express");
const verifyTken = require("../middlewares/auth");
const router = express.Router();

const { chemistryController } = require("../controllers");

router.get("/chemistries", verifyTken, chemistryController.getChemistry);
router.put(
  "/chemistries/:id_chemistry",
  verifyTken,
  chemistryController.editChemistry
);
router.post("/chemistries", verifyTken, chemistryController.createChemistry);

module.exports = router;

const express = require("express");
const verifyTken = require("../middlewares/auth");
const router = express.Router();

const { partnerController } = require("../controllers");

router.get("/partners", verifyTken, partnerController.getPartner);
router.put("/partners/:id_partner", verifyTken, partnerController.editPartner);
router.post("/partners", verifyTken, partnerController.createPartner);

module.exports = router;

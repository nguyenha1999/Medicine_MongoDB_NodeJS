const express = require("express");
const verifyTken = require("../middlewares/auth");
const router = express.Router();

const { recipeController } = require("../controllers");

router.get("/recipes", verifyTken, recipeController.getRecipes);
router.put("/recipes/:id_recipe", verifyTken, recipeController.editRecipes);
router.post("/recipes", verifyTken, recipeController.createRecipes);

module.exports = router;

const recipes = require("../models/recipe");
const chemistrys = require("../models/medicine");
const response = require("../helpers/response");

const getRecipes = async (req, res) => {
  try {
    const allRecipes = await recipes
      .find({})
      .populate("chemistry", ["name", "code", "recipe"]);
    return res.status(200).json(response(allRecipes, null));
  } catch (err) {
    return res.status(500).json(error);
  }
};

const createRecipes = async (req, res) => {
  try {
    const { chemistry, ratio } = req.body;
    if (!chemistry) {
      return res.status(400).json(response(null, "Chất là bắt buộc!"));
    }

    if (!ratio) {
      return res.status(400).json(response(null, "Tỉ lệ là bắt buộc!"));
    }

    const isChemistry = await chemistrys.findOne({ _id: chemistry });
    if (!isChemistry) {
      return res.status(401).json(response(null, "Chất không tồn tại!"));
    }

    const newRecipe = {
      chemistry: chemistry,
      ratio: ratio,
    };
    const result = await recipes.create(newRecipe);
    return res.status(200).json(response(result, "Tạo công thức thành công!"));
  } catch (err) {
    return res.status(500).json(error);
  }
};

const editRecipes = async (req, res) => {
  try {
    const editedRecipe = await recipes.findByIdAndUpdate(
      { _id: req.params.id_recipe },
      req.body
    );
    return res.status(200).json(response(editedRecipe, "Cập nhật thành công!"));
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getRecipes,
  createRecipes,
  editRecipes,
};

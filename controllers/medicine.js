const chemistry = require("../models/medicine");
const recipes = require("../models/recipe");
const response = require("../helpers/response");

const getChemistry = async (req, res) => {
  try {
    const allChemistry = await chemistry.find({}).populate("partner", ["name"]);
    return res.status(200).json(response(allChemistry, null));
  } catch (err) {
    return res.status(500).json(err);
  }
};

const createChemistry = async (req, res) => {
  try {
    const { name, code, recipe, use, partner, status, price } = req.body;
    if (!recipe) {
      return res.status(400).json(response(null, "Công thức là bắt buộc!"));
    }

    if (!name) {
      return res.status(400).json(response(null, "Tên chất là bắt buộc!"));
    }

    if (!code) {
      return res.status(400).json(response(null, "Mã chất là bắt buộc!"));
    }

    if (!partner) {
      return res.status(400).json(response(null, "Đối tác là bắt buộc!"));
    }

    const isCodeChemistry = await chemistry.findOne({ code });
    const isNameChemistry = await chemistry.findOne({ name });
    if (isCodeChemistry || isNameChemistry) {
      return res.status(401).json(response(null, "Chất đã tồn tại!"));
    }

    const newChemistry = {
      name: name,
      code: code,
      recipe: recipe,
      use: use,
      partner: partner,
      status: status || true,
      price: price,
    };
    const result = await chemistry.create(newChemistry);
    return res.status(200).json(response(result, "Tạo mới chất thành công!"));
  } catch (err) {
    return res.status(500).json(error);
  }
};

const editChemistry = async (req, res) => {
  try {
    const editedChemistry = await chemistry.findByIdAndUpdate(
      { _id: req.params.id_chemistry },
      req.body
    );
    return res
      .status(200)
      .json(response(editedChemistry, "Cập nhật thành công!"));
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getChemistry,
  createChemistry,
  editChemistry,
};

const partners = require("../models/partner");
const response = require("../helpers/response");
const { collection } = require("../models/partner");

const getPartner = async (req, res) => {
  try {
    const allPartner = await partners.find({}).populate("product", ["name"]);
    return res.status(200).json(response(allPartner, null));
  } catch (err) {
    return res.status(500).json(error);
  }
};

const createPartner = async (req, res) => {
  try {
    const { name, address, hotline, product } = req.body;
    if (!name) {
      return res.status(400).json(response(null, "Tên là bắt buộc!"));
    }

    if (!hotline) {
      return res.status(400).json(response(null, "Sô điện thoại là bắt buộc!"));
    }

    if (!product) {
      return res
        .status(400)
        .json(response(null, "Sản phẩm phân phối là bắt buộc!"));
    }

    const isName = await partners.findOne({ name });
    if (isName) {
      return res.status(401).json(response(null, "Nhà phân phối đã tồn tại!"));
    }

    const newPartner = {
      name: name,
      address: address,
      hotline: hotline,
      product: product,
    };
    const result = await partners.create(newPartner);
    return res
      .status(200)
      .json(response(result, "Thêm nhà phân phối thành công!"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(error);
  }
};

const editPartner = async (req, res) => {
  try {
    const editedPartner = await partners.findByIdAndUpdate(
      { _id: req.params.id_partner },
      req.body
    );
    return res
      .status(200)
      .json(response(editedPartner, "Cập nhật thành công!"));
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = {
  getPartner,
  createPartner,
  editPartner,
};

const users = require("../models/users");
const JWT = require("../helpers/jwt");
const response = require("../helpers/response");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { email, password, userName, isAdmin } = req.body;
    if (!email || !password || !isAdmin) {
      return res.status(400).json(response(null, "Thiếu dữ liệu!"));
    }

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const handlePass = bcrypt.hashSync(password, salt);

    const newChemistry = {
      email: email,
      password: handlePass,
      userName: userName || email.split("@")[0],
      isAdmin: isAdmin,
    };
    const result = await users.create(newChemistry);
    return res.status(200).json(response(result, "Thêm user thành công!"));
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json(response(null, "Email, Password không được để trống!"));
    }

    const checkEmail = await users.findOne({ email });
    if (!checkEmail) {
      return res.status(401).json(response(null, "Email không tồn tại!"));
    }

    const checkPassword = await checkEmail.comparePass(password);
    if (!checkPassword) {
      return res
        .status(401)
        .json(response(null, "Mật khẩu vừa nhập không đúng!"));
    }

    const token = await JWT.generateToken(checkEmail._id);
    const profile = {
      userName: checkEmail.userName,
      email: checkEmail.email,
      isAdmin: checkEmail.isAdmin,
      token: token,
    };
    return res.status(200).json(response(profile, "Đăng nhập thành công!"));
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = {
  login,
  register,
};

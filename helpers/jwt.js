const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateToken = (payload) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { data: payload },
      process.env.ACCESS_TOKEN_SECRET,
      {
        algorithm: "HS256",
        expiresIn: process.env.ACCESS_TOKEN_LIFE,
      },
      (error, token) => {
        if (error) {
          reject(error);
        }
        resolve(token);
      }
    );
  });
};

const verityToken = (token) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
      if (error) {
        reject(error);
      }
      resolve(decoded);
    });
  });
};

module.exports = {
  generateToken,
  verityToken,
};

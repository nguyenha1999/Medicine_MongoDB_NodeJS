const userRoute = require("./auth");
const chemistryRoute = require("./medicine");
const recipeRoute = require("./recipe");
const partnerRoute = require("./partner");

const route = (app) => {
  app.use("/api", userRoute);
  app.use("/api", chemistryRoute);
  app.use("/api", recipeRoute);
  app.use("/api", partnerRoute);
};

module.exports = route;

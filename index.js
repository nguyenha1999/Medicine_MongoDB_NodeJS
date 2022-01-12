const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const route = require("./routes/index");

const SERVER = {
  PORT: 8000,
  DB_KEY: "mongodb://localhost:27017/medicine_database",
};

const connectDatabase = async () => {
  try {
    await mongoose.connect(SERVER.DB_KEY, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("connect db successfully!");
  } catch (error) {
    console.log("connect db failue!");
  }
};

const app = express();

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

connectDatabase();
app.use(express.json());
app.use(cors(corsOptions));
route(app);

app.listen(SERVER.PORT, () => {
  console.log(`Server is running on port: ${SERVER.PORT}`);
});

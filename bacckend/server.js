require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize, DataTypes } = require("sequelize");

const app = express();
app.use(express.json());
app.use(cors());

/* =========================
   DATABASE CONNECTION (RDS)
========================= */

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "postgres",
    logging: false,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  }
);

/* =========================
   TEST DB CONNECTION
========================= */

sequelize
  .authenticate()
  .then(() => console.log("✅ DB Connected"))
  .catch((err) => console.error("❌ DB ERROR:", err));

/* =========================
   MODEL
========================= */

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.FLOAT,
  },
});

/* =========================
   SYNC DATABASE
========================= */

sequelize.sync()
  .then(() => console.log("✅ Table Created"))
  .catch(err => console.log(err));

/* =========================
   ROUTES
========================= */

// Health check
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// Get products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add product
app.post("/products", async (req, res) => {
  try {
    const { name, price } = req.body;

    const product = await Product.create({ name, price });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

/* =========================
   START SERVER
========================= */

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});

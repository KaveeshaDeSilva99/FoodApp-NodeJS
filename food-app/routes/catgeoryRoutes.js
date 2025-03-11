const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
} = require("../controllers/categoryController");

const router = express.Router();

//routes
// CREATE CATGEORY
router.post("/create", authMiddleware, createCatController);

//GET ALL CATGEORY
router.get("/getAll", getAllCatController);

// UPDATE CATGEORY
router.put("/update/:id", authMiddleware, updateCatController);

// DLEETE CATGEORY
router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;
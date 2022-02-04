const express = require("express");
const router = express.Router();
const RecipesController = require("../controllers/RecipesController");

// Create
router.post("/", RecipesController.create);

// Read All
router.get("/", RecipesController.getAll);

// Read One
router.get("/:id", RecipesController.getByID);

// Update One
router.put("/:id", RecipesController.update);

// Delete one
router.delete("/:id", RecipesController.destroy);

module.exports = router;

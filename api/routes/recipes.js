const express = require("express");
const recipeData = require("../db/data.json");
const router = express.Router();

router.route("/").get((req, res) => {
  const responseData = { recipeNames: [] };
  recipeData.recipes.forEach((recipe) =>
    responseData.recipeNames.push(recipe.name)
  );
  res.status(200).send(responseData);
});

module.exports = router;

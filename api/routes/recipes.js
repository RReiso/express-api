const express = require("express");
const router = express.Router();
const data = require("../db/data.json");

router.route("/").get((req, res) => {
  const responseData = { recipeNames: [] };
  for (recipe of data.recipes) {
    responseData.recipeNames.push(recipe.name);
  }
  res.status(200).send(responseData);
});

router.route("/details/:recipeName").get((req, res) => {
  const recipeName = req.params.recipeName;
  const responseData = {};

  for (recipe of data.recipes) {
    if (recipe.name === recipeName) {
      responseData.details = { ingredients: [...recipe.ingredients] };
      responseData.details.numsteps = recipe.instructions.length;
    }
  }
  res.status(200).send(responseData);
});

router.route("/").post((req, res) => {
  const newRecipe = req.body;
  console.log("newRecipe", newRecipe);
  for (recipe of data.recipes) {
    if (recipe.name === newRecipe.name) {
      return res.status(400).send({ error: "Recipe already exists" });
    }
  }
  data.recipes.push(newRecipe);
  res.status(201).send();
});

module.exports = router;

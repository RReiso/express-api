const data = require("../db/data.json");

const create = (req, res) => {
  const { name, ingredients, instructions } = req.body;
  if (!name || !ingredients || !instructions) {
    return res.status(400).send({
      message: "Valid name, ingredients and instructions expected",
    });
  }

  const recipeExists = data.recipes.find(
    (eachRecipe) => eachRecipe.name === name
  );
  if (recipeExists) {
    return res.status(400).send({
      message: "Recipe with the given name already exists",
    });
  }

  const id = Math.floor(Math.random() * 100);
  const newRecipe = { id, name, ingredients, instructions };
  data.recipes.push(newRecipe);
  console.log("data.recipes", data.recipes);
  res.status(200).send({ message: "Recipe created", recipe: newRecipe });
};

const getAll = (req, res) => {
  const recipeNames = data.recipes.map((eachRecipe) => eachRecipe.name);
  res.status(200).send({ message: "Recipe names", recipeNames });
};

const getByID = (req, res) => {
  const { id } = req.params;

  const recipe = data.recipes.find((eachRecipe) => eachRecipe.id === id);
  if (!recipe) {
    return res.status(404).send({ message: "Recipe not found" });
  }

  res.status(200).send({ message: `Recipe ${id}`, recipe });
};

const update = (req, res) => {
  const { name, ingredients, instructions } = req.body;
  if (!name || !ingredients || !instructions) {
    return res.status(400).send({
      message:
        "Recipe does not exist, valid name, ingredients and instructions expected",
    });
  }

  const { id } = req.params;
  const recipe = data.recipes.find((eachRecipe) => eachRecipe.id === id);
  if (!recipe) {
    return res.status(404).send({
      message: "Recipe does not exist",
    });
  }

  recipe.name = name;
  recipe.ingredients = ingredients;
  recipe.instructions = instructions;
  res.status(200).send({ message: "Recipe updated", recipe });
};

const destroy = (req, res) => {
  const { id } = req.params;
  const recipe = data.recipes.find((eachRecipe) => eachRecipe.id === id);
  if (!recipe) {
    return res.status(404).send({
      message: "Recipe does not exist",
    });
  }

  const newRecipes = data.recipes.filter((eachRecipe) => eachRecipe.id !== id);
  data.recipes = newRecipes;
  res.status(204).send();
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
  destroy,
};

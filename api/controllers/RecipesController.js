const RecipesModel = require("../models/RecipesModel");

const create = (req, res) => {
  const { name, ingredients, instructions } = req.body;
  if (!name || !ingredients || !instructions) {
    return res.status(400).send({
      message: "Valid name, ingredients and instructions expected",
    });
  }

  const recipeExists = RecipesModel.getByName(name);
  if (recipeExists) {
    return res.status(400).send({
      message: "Recipe with the given name already exists",
    });
  }

  const recipeObj = { name, ingredients, instructions };
  const createdRecipe = RecipesModel.create(recipeObj);
  res.status(200).send({ message: "Recipe created", recipe: createdRecipe });
};

const getAll = (req, res) => {
  const recipeNames = RecipesModel.getNames();

  res.status(200).send({ message: "Recipe names", recipeNames });
};

const getByID = (req, res) => {
  const { id } = req.params;

  const recipe = RecipesModel.getByID(id);
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
  const recipe = RecipesModel.getByID(id);
  if (!recipe) {
    return res.status(404).send({
      message: "Recipe does not exist",
    });
  }

  const payload = { name, ingredients, instructions };
  const updatedRecipe = RecipesModel.update(id, payload);
  res.status(200).send({ message: "Recipe updated", recipe: updatedRecipe });
};

const destroy = (req, res) => {
  const { id } = req.params;
  const recipe = RecipesModel.getByID(id);
  if (!recipe) {
    return res.status(404).send({
      message: "Recipe does not exist",
    });
  }

  RecipesModel.destroy(id);
  res.status(204).send();
};

module.exports = {
  create,
  getAll,
  getByID,
  update,
  destroy,
};

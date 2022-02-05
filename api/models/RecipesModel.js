const data = require("../db/data.json");

const getByName = (name) => {
  return data.recipes.find((eachRecipe) => eachRecipe.name === name);
};

const create = (recipeObj) => {
  const id = Math.floor(Math.random() * 100);
  const createdAt = new Date().toISOString();
  const newRecipe = { id, ...recipeObj, createdAt };
  data.recipes.push(newRecipe);
  return newRecipe;
};

const getNames = () => data.recipes.map((eachRecipe) => eachRecipe.name);

const getByID = (id) => data.recipes.find((eachRecipe) => eachRecipe.id === id);

const update = (id, recipeObj) => {
  const updatedRecipe = getByID(id);
  updatedRecipe.name = recipeObj.name;
  updatedRecipe.ingredients = recipeObj.ingredients;
  updatedRecipe.instructions = recipeObj.instructions;
  return updatedRecipe;
};

const destroy = (id) => {
  const newRecipes = data.recipes.filter((eachRecipe) => eachRecipe.id !== id);
  data.recipes = newRecipes;
};

module.exports = {
  getByName,
  create,
  getNames,
  getByID,
  update,
  destroy,
};

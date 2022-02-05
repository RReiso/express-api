const morgan = require("morgan");
const express = require("express");
const recipesRoutes = require("./routes/RecipesRouter");

const app = express();
app.use(morgan("dev"));
app.use(express.json());

app.use("/recipes", recipesRoutes);

module.exports = app;

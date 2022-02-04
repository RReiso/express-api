const morgan = require("morgan");
const express = require("express");
const app = express();
const PORT = 8079;

app.use(morgan("dev"));
app.use(express.json());

const recipeRoutes = require("./routes/recipes");
app.use("/recipes", recipeRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

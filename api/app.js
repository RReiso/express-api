const morgan = require("morgan");
const express = require("express");
const app = express();
const PORT = 8079;

app.use(morgan("dev"));
app.use(express.json());

const recipesRoutes = require("./routes/RecipesRouter");
app.use("/recipes", recipesRoutes);

app.listen(PORT, () => {
  console.log(`app is listening on port ${PORT}`);
});

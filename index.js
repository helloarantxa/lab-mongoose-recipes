const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then((x) => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    let recipe = {
      title: "cookies",
      cuisine: "basic",
    };
    console.log("recipe title: " + recipe.title);
    return Recipe.create(recipe);
  })

  .then(() => {
    return Recipe.insertMany(data);
  })

  .then(() => {
    Recipe.find().then((recipesFromDB) => {
      recipesFromDB.forEach((recipe) => {
        console.log(recipe.title);
      });
    });
  })

  .then(() => {
    const query = { title: "Rigatoni alla Genovese" };
    return Recipe.findOneAndUpdate(query, { duration: 100 });
  })
  .then(() => {
    console.log("successfully updated duration");
  })

  .then(() => {
    return Recipe.deleteOne({ title: "Carrot Cake" });
  })
  .then(() => {
    console.log("sucessfully deleted Carrot Cake");
    mongoose.connection.close();
  })

  .catch((error) => {
    console.error("Error connecting to the database", error);
  });

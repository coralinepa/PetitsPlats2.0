import RecipeView from "../views/RecipeView.js";
import RecipeController from "../controllers/RecipeController.js";
import RecipeModel from "../models/RecipeModel.js";
import DropdownView from "../views/DropdownView.js";
import TagsView from "../views/TagsView.js";

//  Récupération des données de recettes depuis un fichier JSON.
async function getRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    const { recipes } = await response.json();
    return recipes;
  } catch (error) {
    console.error(error);
  }
}

// Initialisation des modèles et vues, puis création du contrôleur pour coordonner le tout.
async function renderHome() {
  const RecipesData = await getRecipes();

  const recipeModel = new RecipeModel(RecipesData);
  const recipeView = new RecipeView();
  const dropdownIngredientsView = new DropdownView("dropdownSelectIngredients");
  const dropdownAppliancesView = new DropdownView("dropdownSelectAppliances");
  const dropdownUstensilsView = new DropdownView("dropdownSelectUstensils");
  const tagsView = new TagsView();
  new RecipeController(
    recipeModel,
    recipeView,
    dropdownIngredientsView,
    dropdownAppliancesView,
    dropdownUstensilsView,
    tagsView
  );
}

export default renderHome;

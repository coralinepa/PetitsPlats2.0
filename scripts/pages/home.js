import Recipe from "../models/recipe.js";
import RecipeView from "../views/RecipeView.js";
import RecipeController from "../controllers/RecipeController.js";
import RecipeModel from "../models/RecipeModel.js";
import DropdownIngredientsView from "../views/DropdownIngredientsView.js";
import DropdownAppliancesView from "../views/DropdownAppliancesView.js";
import DropdownUstensilsView from "../views/DropdownUstensilsView.js";
import TagsView from "../views/TagsView.js";

async function getRecipes() {
  try {
    const response = await fetch("data/recipes.json");
    const { recipes } = await response.json();
    return recipes;
  } catch (error) {
    console.error(error);
  }
}

async function renderHome() {
  const RecipesData = await getRecipes();
  //const recipes = RecipesData.map((recipe) => new Recipe(recipe));
  //const CardView = new RecipeCardView(recipes);
  //CardView.render();

  const recipeModel = new RecipeModel(RecipesData);
  const recipeView = new RecipeView();
  const dropdownIngredientsView = new DropdownIngredientsView();
  const dropdownAppliancesView = new DropdownAppliancesView();
  const dropdownUstensilsView = new DropdownUstensilsView();
  const tagsView = new TagsView();
  new RecipeController(
    recipeModel,
    recipeView,
    dropdownIngredientsView,
    dropdownAppliancesView,
    dropdownUstensilsView,
    tagsView
  );

  function extractIngredients(data) {
    const ingredients = [];
    data.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        if (!ingredients.includes(ingredient.ingredient)) {
          ingredients.push(ingredient.ingredient);
        }
      });
    });
    return ingredients;
  }

  // Fonction pour initialiser les trois dropdowns
  function initializeDropdowns(data) {
    console.log(data);
    const ingredientsDropdown = new DropdownView(
      "dropdownIngredients",
      extractIngredients(data)
    );
    const appliancesDropdown = new DropdownView("dropdownAppliances", [
      data[0].appliance,
    ]);
    const utensilsDropdown = new DropdownView(
      "dropdownUtensils",
      data[0].ustensils
    );
  }

  // Fonction pour récupérer les recettes et initialiser les dropdowns
  async function setupDropdowns() {
    try {
      const recipes = await getRecipes();
      initializeDropdowns(recipes);
    } catch (error) {
      console.error("Erreur lors de la configuration des dropdowns:", error);
    }
  }

  // Appel de la fonction pour configurer les dropdowns une fois que le DOM est chargé
  document.addEventListener("DOMContentLoaded", () => {
    setupDropdowns();
  });
}

export default renderHome;

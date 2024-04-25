import Ingredients from "./ingredients.js";

class Recipe {
  constructor(data) {
    this.id = data.id;
    this.image = data.image;
    this.src = `assets/${data.image}`;
    this.name = data.name;
    this.servings = data.servings;
    this.ingredients = data.ingredients;
    this.time = data.time;
    this.description = data.description;
    this.appliance = data.appliance;
    this.ustensils = data.ustensils;
    this.ingredients = data.ingredients.map(
      (ingredient) => new Ingredients(ingredient)
    );
  }
}

export default Recipe;

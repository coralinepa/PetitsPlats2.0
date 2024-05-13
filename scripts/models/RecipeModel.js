class RecipeModel {
  constructor(data) {
    this.data = data; // Stocker les données de la recette
    this.filteredRecipes = [];
  }

  // Méthode pour rechercher des recettes en fonction d'un critère de recherche
  searchRecipes(query) {
    const normalizedQuery = query.toLowerCase();
    this.filteredRecipes = this.data.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(normalizedQuery) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(normalizedQuery)
        ) ||
        recipe.description.toLowerCase().includes(normalizedQuery)
      );
    });

    return this.filteredRecipes;
  }

  searchRecipesByTags(tags) {
    this.filteredRecipes = this.data.filter((recipe) => {
      const recipesTags = [
        ...recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        ),
        ...recipe.ustensils.map((ustensil) => ustensil.toLowerCase()),
        recipe.appliance.toLowerCase(),
      ];

      return tags.every((tag) => recipesTags.includes(tag));
    });

    return this.filteredRecipes;
  }
}

export default RecipeModel;

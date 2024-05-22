class RecipeModel {
  constructor(data) {
    this.data = data; // Stocker les données de la recette
    this.filteredRecipes = [];
  }

  // Méthode pour rechercher des recettes en fonction d'un critère de recherche
  searchRecipes(query) {
    //La requête query est convertie en minuscules pour permettre une recherche insensible à la casse.
    const normalizedQuery = query.toLowerCase();
    //Utilisation de la méthode filter pour créer un nouveau tableau filteredRecipes contenant uniquement les recettes qui correspondent à la requête. La méthode filter parcourt chaque élément de this.data et applique une fonction de filtrage.
    this.filteredRecipes = this.data.filter((recipe) => {
      //Pour chaque recipe, la fonction de filtrage vérifie trois conditions : nom de la recette, les ingrédients et la description
      return (
        //Si le nom de la recette contient la requête normalisée, cette condition est true.
        recipe.name.toLowerCase().includes(normalizedQuery) ||
        //Utilisation de la méthode some pour vérifier si au moins un des ingrédients contient la requête. Si un ingrédient correspond, cette condition est true.
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(normalizedQuery)
        ) ||
        //Si la description de la recette contient la requête normalisée, cette condition est true.
        recipe.description.toLowerCase().includes(normalizedQuery)
        //Si au moins une de ces conditions est remplie, la fonction de filtrage retourne true, ce qui inclut la recette dans le tableau filtré.
      );
    });
    //retourne le tableau des recettes filtrées
    return this.filteredRecipes;
  }

  //La fonction searchRecipesByTags filtre les recettes en fonction d'une liste de tags. Elle convertit les ingrédients, ustensiles et appareils des recettes en minuscules, puis vérifie si tous les tags fournis sont présents dans ces éléments. Si une recette contient tous les tags, elle est incluse dans le résultat filtré.
  //La fonction searchRecipesByTags prend un paramètre tags, qui est supposé être un tableau de chaînes de caractères représentant les tags à rechercher.
  searchRecipesByTags(tags) {
    //La fonction filtre les recettes contenues dans this.data. this.data est supposé être un tableau d'objets recette. La méthode filter crée un nouveau tableau avec les éléments qui passent le test fourni par la fonction fléchée (recipe) => { ... }.
    this.filteredRecipes = this.data.filter((recipe) => {
      //on créé un tableau qui contient tous les tags d'une recette.
      const recipesTags = [
        // On extrait les ingrédients de la recette, les convertit en minuscules et les ajoute au tableau.
        ...recipe.ingredients.map((ingredient) =>
          ingredient.ingredient.toLowerCase()
        ),
        //On fait de même pour les ustensiles.
        ...recipe.ustensils.map((ustensil) => ustensil.toLowerCase()),
        //On ajoute également l'appareil utilisé dans la recette, en minuscule.
        recipe.appliance.toLowerCase(),
      ];
      //vérifie que chaque tag fourni dans le paramètre tags est présent dans le tableau recipesTags. La méthode every renvoie true si tous les éléments du tableau tags satisfont la condition donnée, sinon elle renvoie false.
      // Si tous les tags sont trouvés dans recipesTags, la recette passe le test du filtre et est incluse dans this.filteredRecipes.
      return tags.every((tag) => recipesTags.includes(tag));
    });

    return this.filteredRecipes;
    //Si tous les tags sont trouvés dans recipesTags, la recette passe le test du filtre et est incluse dans this.filteredRecipes.
  }
}

export default RecipeModel;

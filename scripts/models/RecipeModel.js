function normalizeString(str) {
  return str
    .toLowerCase() // Convertir en minuscules
    .normalize("NFD") // Décomposer les caractères accentués
    .replace(/[\u0300-\u036f]/g, "") // Supprimer les accents
    .replace(/\s+/g, " ") // Remplacer les espaces multiples par un seul espace
    .trim(); // Supprimer les espaces au début et à la fin
}

class RecipeModel {
  constructor(data) {
    this.data = data; // Stocker les données de la recette
    this.filteredRecipes = [];
  }

  // Méthode pour rechercher des recettes en fonction d'un critère de recherche
  /* searchRecipes(query) {
    //La requête query est convertie en minuscules pour permettre une recherche insensible à la casse.
    const normalizedQuery = normalizeString(query);
    //Utilisation de la méthode filter pour créer un nouveau tableau filteredRecipes contenant uniquement les recettes qui correspondent à la requête. La méthode filter parcourt chaque élément de this.data et applique une fonction de filtrage.
    this.filteredRecipes = this.data.filter((recipe) => {
      //Pour chaque recipe, la fonction de filtrage vérifie trois conditions : nom de la recette, les ingrédients et la description
      return (
        //Si le nom de la recette contient la requête normalisée, cette condition est true.
        normalizeString(recipe.name).includes(normalizedQuery) ||
        //Utilisation de la méthode some pour vérifier si au moins un des ingrédients contient la requête. Si un ingrédient correspond, cette condition est true.
        recipe.ingredients.some((ingredient) =>
          normalizeString(ingredient.ingredient).includes(normalizedQuery)
        ) ||
        //Si la description de la recette contient la requête normalisée, cette condition est true.
        normalizeString(recipe.description).includes(normalizedQuery)
        //Si au moins une de ces conditions est remplie, la fonction de filtrage retourne true, ce qui inclut la recette dans le tableau filtré.
      );
    });
    //retourne le tableau des recettes filtrées
    return this.filteredRecipes;
  } */

  // La fonction searchRecipes permet de filtrer des recettes en fonction d'une requête utilisateur en vérifiant si cette requête est présente dans le nom de la recette, ses ingrédients ou sa description. La recherche est insensible à la casse et s'arrête dès qu'un critère est rempli pour une recette donnée.
  searchRecipes(query) {
    //convertit la requête en minuscule
    const normalizedQuery = normalizeString(query);
    // un tableau est initialisé pour stocker les recettes qui correspondent à la requête
    let filteredRecipes = [];

    //la boucle for parcourt toutes les recettes dans this.data. Pour chaque recette, une variable isMatch est initialisée à false pour indiquer si la recette correspond à la requête.
    for (let i = 0; i < this.data.length; i++) {
      const recipe = this.data[i];
      let isMatch = false;

      // Vérifier si le nom de la recette contient la requête, isMatch passe à true
      if (normalizeString(recipe.name).includes(normalizedQuery)) {
        isMatch = true;
      }

      // Si isMatch est toujours false, la recherche continue sur les ingrédients de la recette. Une boucle for interne parcourt les ingrédients. Si un ingrédient contient la requête, isMatch est mis à true et la boucle est interrompue avec break.
      if (!isMatch) {
        for (let j = 0; j < recipe.ingredients.length; j++) {
          const ingredient = recipe.ingredients[j];
          if (
            normalizeString(ingredient.ingredient).includes(normalizedQuery)
          ) {
            isMatch = true;
            break; // Arrêter la boucle dès qu'on trouve un ingrédient correspondant
          }
        }
      }

      // Si isMatch est encore false, la description de la recette est vérifiée. Si elle contient la requête, isMatch est mis à true.
      if (
        !isMatch &&
        normalizeString(recipe.description).includes(normalizedQuery)
      ) {
        isMatch = true;
      }

      // Si isMatch est true après toutes les vérifications, la recette est ajoutée au tableau filteredRecipes.
      if (isMatch) {
        filteredRecipes.push(recipe);
      }
    }

    //La propriété filteredRecipes de l'objet est mise à jour avec les recettes correspondant à la requête, et cette liste est retournée.
    this.filteredRecipes = filteredRecipes;
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

import validateForm from "../utils/form.js";

//fonction pour filtrer les ustensibles, les ingrédients et les appareils
//Utilise reduce pour accumuler tous les ustensiles des recettes.
//Convertit chaque ustensile en minuscule.
//Ajoute les ustensiles non encore présents dans l'accumulateur acc.
function getUstensils(recipes) {
  return recipes.reduce((acc, { ustensils }) => {
    return [
      ...acc,
      ...ustensils
        .map((ustensil) => ustensil.toLowerCase())
        .filter((ustensil) => !acc.includes(ustensil)),
    ];
  }, []);
}

function getIngredients(recipes) {
  return recipes.reduce((acc, { ingredients }) => {
    const ingredientsNames = ingredients.map(({ ingredient }) =>
      ingredient.toLowerCase()
    );
    return [
      ...acc,
      ...ingredientsNames.filter((ingredient) => !acc.includes(ingredient)),
    ];
  }, []);
}

function getAppliances(recipes) {
  return recipes.reduce((acc, { appliance }) => {
    return acc.includes(appliance.toLowerCase())
      ? acc
      : [...acc, appliance.toLowerCase()];
  }, []);
}

//Filtre les options pour ne conserver que celles qui contiennent query.
//Convertit les deux (query et option) en minuscules pour une comparaison insensible à la casse.
function getFilteredOptions(query, options) {
  const normalizedQuery = query.toLowerCase();
  return options.filter((option) => {
    return option.toLowerCase().includes(normalizedQuery);
  });
}
//cette classe contrôle la logique de l'application et lie les vues aux actions de l'utilisateur.
//Initialise les propriétés de la classe avec les vues et le modèle.
//Lie les gestionnaires d'événements pour la recherche des recettes, ingrédients, appareils, et ustensiles.
//Initialise les filtres de recettes.
class RecipeController {
  constructor(
    model,
    view,
    dropdownIngredientsView,
    dropdownAppliancesView,
    dropdownUstensilsView,
    tagsView
  ) {
    this.model = model;
    this.view = view;
    this.ingredients = [];
    this.appliances = [];
    this.ustensils = [];
    this.selectedIngredients = [];
    this.selectedTags = [];

    this.dropdownUstensilsView = dropdownUstensilsView;
    this.dropdownIngredientsView = dropdownIngredientsView;
    this.dropdownAppliancesView = dropdownAppliancesView;

    this.tagsView = tagsView;

    // Lier la méthode search à la vue
    this.view.bindSearchHandler(this.handleSearch.bind(this));
    this.dropdownIngredientsView.bindSearchHandler(
      this.handleSearchIngredients.bind(this)
    );

    this.dropdownAppliancesView.bindSearchHandler(
      this.handleSearchAppliances.bind(this)
    );

    this.dropdownUstensilsView.bindSearchHandler(
      this.handleSearchUstensils.bind(this)
    );

    const recipes = this.model.data;

    this.view.updateCount(recipes.length);

    this.initializeRecipeFilters(recipes);
  }

  //Ajoute un tag à la vue des tags et lie le gestionnaire de suppression.
  //Met à jour la liste des tags sélectionnés et filtre les recettes en conséquence.
  //Met à jour le nombre de recettes et les filtres de recettes.
  handleSelect(tag) {
    this.tagsView.addToTags(tag);
    this.tagsView.bindRemoveHandler(this.handleRemoveHandler.bind(this));
    this.selectedTags = [...this.selectedTags, tag];
    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.initializeRecipeFilters(recipes);
  }

  //Filtre et affiche les options d'ingrédients en fonction de la recherche de l'utilisateur.
  handleSearchIngredients(event) {
    this.dropdownIngredientsView.displayOptions(
      getFilteredOptions(event.target.value, this.ingredients)
    );
  }

  //Filtre et affiche les options d'appareils en fonction de la recherche de l'utilisateur.
  handleSearchAppliances(event) {
    this.dropdownUstensilsView.displayOptions(
      getFilteredOptions(event.target.value, this.appliances)
    );
  }

  //Filtre et affiche les options d'ustensiles en fonction de la recherche de l'utilisateur.
  handleSearchUstensils(event) {
    this.dropdownUstensilsView.displayOptions(
      getFilteredOptions(event.target.value, this.ustensils)
    );
  }

  //Supprime un tag de la vue des tags et met à jour la liste des tags sélectionnés.
  //Filtre les recettes en conséquence et met à jour le nombre de recettes et les filtres.
  handleRemoveHandler(event) {
    const tag = event.target.dataset.value;
    this.tagsView.removeFromTags(tag);
    this.selectedTags = this.selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );

    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.initializeRecipeFilters(recipes);
  }

  //Gère la soumission du formulaire de recherche.
  //Si le formulaire est valide, recherche les recettes et met à jour les filtres.
  handleSearch(event) {
    event.preventDefault();
    const data = new FormData(event.srcElement);

    if (validateForm(form)) {
      const query = data.get("search");
      const recipes = this.model.searchRecipes(query);
      this.view.updateCount(recipes.length);

      this.initializeRecipeFilters(recipes);
    }
  }
  //Met à jour les vues avec les recettes et initialise les filtres pour les ingrédients, appareils et ustensiles.
  //Lie les gestionnaires de sélection pour les vues dropdown.
  initializeRecipeFilters(recipes) {
    this.view.displayRecipes(recipes);
    this.ustensils = getUstensils(recipes);
    this.ingredients = getIngredients(recipes);
    this.appliances = getAppliances(recipes);

    this.dropdownIngredientsView.displayOptions(
      this.ingredients,
      this.selectedTags
    );
    this.dropdownIngredientsView.bindSelectHandler(
      this.handleSelect.bind(this)
    );
    this.dropdownAppliancesView.displayOptions(
      this.appliances,
      this.selectedTags
    );
    this.dropdownAppliancesView.bindSelectHandler(this.handleSelect.bind(this));
    this.dropdownUstensilsView.displayOptions(
      this.ustensils,
      this.selectedTags
    );
    this.dropdownUstensilsView.bindSelectHandler(this.handleSelect.bind(this));
  }
}

//Le code crée un contrôleur de recettes (RecipeController) qui gère la logique de l'application de recettes.
//Il utilise des fonctions utilitaires pour extraire et filtrer les ingrédients, ustensiles et appareils des recettes.
//Le contrôleur gère également les interactions de l'utilisateur, telles que la sélection et la suppression de tags, ainsi que la recherche d'ingrédients, appareils et ustensiles.
// Les vues sont mises à jour en conséquence pour refléter les changements et les résultats de recherche.

export default RecipeController;

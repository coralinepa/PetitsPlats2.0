import validateForm from "../utils/form.js";

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

    this.dropdownIngredientsView.bindSelectHandler(
      this.handleSelectIngredients.bind(this)
    );
    this.dropdownAppliancesView.bindSearchHandler(
      this.handleSearchAppliances.bind(this)
    );
    this.dropdownAppliancesView.bindSelectHandler(
      this.handleSelectAppliances.bind(this)
    );

    this.dropdownUstensilsView.bindSearchHandler(
      this.handleSearchUstensils.bind(this)
    );
    this.dropdownUstensilsView.bindSelectHandler(
      this.handleSelectUstensils.bind(this)
    );

    const recipes = this.model.data;
    this.appliances = getAppliances(recipes);
    this.ustensils = getUstensils(recipes);
    this.ingredients = getIngredients(recipes);
    this.view.updateCount(recipes.length);

    this.view.displayRecipes(recipes);
    this.dropdownIngredientsView.displayIngredients(this.ingredients);
    this.dropdownAppliancesView.displayAppliances(this.appliances);
    this.dropdownUstensilsView.displayUstensils(this.ustensils);
  }

  searchIngredients(query) {
    const normalizedQuery = query.toLowerCase();
    this.ingredients = this.ingredients.filter((ingredient) => {
      return ingredient.toLowerCase().includes(normalizedQuery);
    });

    this.dropdownIngredientsView.displayIngredients(this.ingredients);
  }

  handleSelectIngredients(event) {
    console.log(event.target.dataset.value);
    const tag = event.target.dataset.value;
    this.tagsView.addToTags(tag);
    this.tagsView.bindRemoveHandler(this.handleRemoveHandler.bind(this));
    this.selectedTags = [...this.selectedTags, tag];
    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.view.displayRecipes(recipes);
    this.ustensils = getUstensils(recipes);
    this.ingredients = getIngredients(recipes);
    this.appliances = getAppliances(recipes);

    this.dropdownIngredientsView.displayIngredients(this.ingredients);
    this.dropdownAppliancesView.displayAppliances(this.appliances);
    this.dropdownUstensilsView.displayUstensils(this.ustensils);
  }

  handleSelectUstensils(event) {
    console.log(event.target.dataset.value);
    const tag = event.target.dataset.value;
    this.tagsView.addToTags(tag);
    this.tagsView.bindRemoveHandler(this.handleRemoveHandler.bind(this));
    this.selectedTags = [...this.selectedTags, tag];
    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.view.displayRecipes(recipes);
    this.ustensils = getUstensils(recipes);
    this.ingredients = getIngredients(recipes);
    this.appliances = getAppliances(recipes);

    this.dropdownIngredientsView.displayIngredients(this.ingredients);
    this.dropdownAppliancesView.displayAppliances(this.appliances);
    this.dropdownUstensilsView.displayUstensils(this.ustensils);
  }

  handleSelectAppliances(event) {
    console.log(event.target.dataset.value);
    const tag = event.target.dataset.value;
    this.tagsView.addToTags(tag);
    this.tagsView.bindRemoveHandler(this.handleRemoveHandler.bind(this));
    this.selectedTags = [...this.selectedTags, tag];
    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.view.displayRecipes(recipes);
    this.ustensils = getUstensils(recipes);
    this.ingredients = getIngredients(recipes);
    this.appliances = getAppliances(recipes);

    this.dropdownIngredientsView.displayIngredients(this.ingredients);
    this.dropdownAppliancesView.displayAppliances(this.appliances);
    this.dropdownUstensilsView.displayUstensils(this.ustensils);
  }

  searchAppliances(query) {
    const normalizedQuery = query.toLowerCase();
    this.appliances = this.appliances.filter((appliance) => {
      return appliance.toLowerCase().includes(normalizedQuery);
    });

    this.dropdownAppliancesView.displayAppliances(this.appliances);
  }

  searchUstensils(query) {
    const normalizedQuery = query.toLowerCase();
    this.ustensils = this.ustensils.filter((ustensil) => {
      return ustensil.toLowerCase().includes(normalizedQuery);
    });

    this.dropdownUstensilsView.displayUstensils(this.ustensils);
  }

  handleSearchIngredients(event) {
    console.log(event.target.value);
    this.searchIngredients(event.target.value);
  }

  handleSearchAppliances(event) {
    console.log(event.target.value);
    this.searchAppliances(event.target.value);
  }

  handleSearchUstensils(event) {
    console.log(event.target.value);
    this.searchUstensils(event.target.value);
  }

  handleRemoveHandler(event) {
    const tag = event.target.dataset.value;
    this.tagsView.removeFromTags(tag);
    this.selectedTags = this.selectedTags.filter(
      (selectedTag) => selectedTag !== tag
    );

    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.view.displayRecipes(recipes);
    this.ustensils = getUstensils(recipes);
    this.ingredients = getIngredients(recipes);
    this.appliances = getAppliances(recipes);

    this.dropdownIngredientsView.displayIngredients(this.ingredients);
    this.dropdownAppliancesView.displayAppliances(this.appliances);
    this.dropdownUstensilsView.displayUstensils(this.ustensils);
  }

  handleSearch(event) {
    event.preventDefault();
    const data = new FormData(event.srcElement);

    if (validateForm(form)) {
      const query = data.get("search");
      const recipes = this.model.searchRecipes(query);
      this.view.updateCount(recipes.length);

      this.view.displayRecipes(recipes);
      this.ustensils = getUstensils(recipes);
      this.ingredients = getIngredients(recipes);
      this.appliances = getAppliances(recipes);

      this.dropdownIngredientsView.displayIngredients(this.ingredients);
      this.dropdownAppliancesView.displayAppliances(this.appliances);
      this.dropdownUstensilsView.displayUstensils(this.ustensils);
    }
  }
}

export default RecipeController;

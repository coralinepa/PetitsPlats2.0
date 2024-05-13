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

function getFilteredOptions(query, options) {
  const normalizedQuery = query.toLowerCase();
  return options.filter((option) => {
    return option.toLowerCase().includes(normalizedQuery);
  });
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

  handleSelect(tag) {
    this.tagsView.addToTags(tag);
    this.tagsView.bindRemoveHandler(this.handleRemoveHandler.bind(this));
    this.selectedTags = [...this.selectedTags, tag];
    const recipes = this.model.searchRecipesByTags(this.selectedTags);
    this.view.updateCount(recipes.length);

    this.initializeRecipeFilters(recipes);
  }

  handleSearchIngredients(event) {
    this.dropdownIngredientsView.displayOptions(
      getFilteredOptions(event.target.value, this.ingredients)
    );
  }

  handleSearchAppliances(event) {
    this.dropdownUstensilsView.displayOptions(
      getFilteredOptions(event.target.value, this.appliances)
    );
  }

  handleSearchUstensils(event) {
    this.dropdownUstensilsView.displayOptions(
      getFilteredOptions(event.target.value, this.ustensils)
    );
  }

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

export default RecipeController;

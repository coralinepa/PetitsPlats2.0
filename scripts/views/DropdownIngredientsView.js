class DropdownIngredientsView {
  constructor() {
    this.dropdownIngredients = document.getElementById(
      "dropdownSelectIngredients"
    );
    this.searchIngredient = document.getElementById("searchInputIngredient");
    this.dropdownListIngredientElement =
      document.getElementById("listboxIngredient");
    this.dropdownHeader =
      this.dropdownIngredients.querySelector(".dropdown_header");
    this.dropdownContent =
      this.dropdownIngredients.querySelector(".dropdown_content");

    this.dropdownHeader.addEventListener("click", (event) => {
      event.stopPropagation();
      const isOpen = this.dropdownContent.classList.contains("dropdown_open");

      // Si le menu est ouvert, fermez-le; sinon, ouvrez-le
      if (isOpen) {
        this.closeDropdown();
      } else {
        this.openDropdown();
      }
    });
  }

  displayIngredients(ingredients) {
    const html = `
                            ${ingredients
                              .map(
                                (ingredient) =>
                                  `<li class="dropdown_option" data-value="${ingredient}" role="option" aria-selected="true"
                                tabindex="0" aria-hidden="true">
                                    ${ingredient}
                            </li>`
                              )
                              .join("")}
                        `;

    this.dropdownListIngredientElement.innerHTML = html;
  }

  bindSearchHandler(handler) {
    this.searchIngredient.addEventListener("input", handler);
  }

  bindSelectHandler(handler) {
    this.dropdownListIngredientElement.addEventListener("click", handler);
  }

  openDropdown() {
    this.dropdownContent.classList.add("dropdown_open");

    // Ajoutez un écouteur d'événements de clic au document pour détecter les clics en dehors du menu
    //document.addEventListener("click", this.closeDropdownOutside);
  }

  // Fonction pour fermer le menu
  closeDropdown() {
    // Supprimez la classe qui rend le menu visible
    this.dropdownContent.classList.remove("dropdown_open");

    // Supprimez l'écouteur d'événements de clic du document
    //.removeEventListener("click", this.closeDropdownOutside);
  }
}

export default DropdownIngredientsView;

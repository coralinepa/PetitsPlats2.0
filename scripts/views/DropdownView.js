//Cette classe gère l'affichage et les interactions des menus déroulants (dropdown) pour les ingrédients, les ustensiles, et les appareils. Cette classe gère l'affichage et les interactions des menus déroulants (dropdown) pour les ingrédients, les ustensiles, et les appareils.

class DropdownView {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.dropdownHeader = this.container.querySelector(".dropdown_header");
    this.dropdownContent = this.container.querySelector(".dropdown_content");
    this.dropdownList = this.container.querySelector(".dropdown_listbox");

    this.dropdownListIngredientElement =
      document.getElementById("listboxIngredient");

    this.dropdownHeader.addEventListener("click", (event) => {
      event.stopPropagation();
      this.toggleDropdown();
    });
  }

  // displayOptions affiche les options dans le dropdown
  // options : tableau d'options à afficher.
  // selectedValues : tableau de valeurs sélectionnées, utilisé pour indiquer quelles options sont déjà sélectionnées.
  displayOptions(options, selectedValues) {
    const html = options
      .map(
        (option) =>
          `<li class="dropdown_option" data-value="${option}" role="option" tabindex="0" aria-selected="${selectedValues?.includes(
            option
          )}">${option}</li>`
      )
      .join("");
    this.dropdownList.innerHTML = html;
  }

  /* associe un gestionnaire d'événements pour la recherche.
  searchInput : référence à l'élément de saisie de recherche dans le dropdown.
Si searchInput existe, ajoute un écouteur d'événements input pour déclencher le handler à chaque modification de l'entrée de recherche.*/

  bindSearchHandler(handler) {
    const searchInput = this.container.querySelector(".dropdown_input");
    if (searchInput) {
      searchInput.addEventListener("input", handler);
    }
  }

  /* bindSelectHandler(handler) : associe un gestionnaire d'événements pour la sélection d'une option.
Ajoute un écouteur d'événements click à this.dropdownContent.
Si la cible du clic a la classe dropdown_option, appelle le handler avec la valeur de l'option sélectionnée.*/
  bindSelectHandler(handler) {
    this.dropdownContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("dropdown_option")) {
        handler(event.target.dataset.value);
      }
    });
  }

  /*toggleDropdown() : ouvre ou ferme le dropdown.
Utilise classList.toggle("dropdown_open") pour ajouter ou supprimer la classe dropdown_open, qui contrôle la visibilité du contenu du dropdown.*/
  toggleDropdown() {
    this.dropdownContent.classList.toggle("dropdown_open");
  }
}

/*gère les menus déroulants (dropdown) pour les ingrédients, les ustensiles et les appareils :
displayOptions : Affiche les options dans le dropdown.
bindSearchHandler : Associe un gestionnaire d'événements pour la recherche dans le dropdown.
bindSelectHandler : Associe un gestionnaire d'événements pour la sélection d'une option dans le dropdown.
toggleDropdown : Ouvre ou ferme le dropdown.*/
export default DropdownView;

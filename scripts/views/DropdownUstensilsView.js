class DropdownUstensilsView {
  constructor() {
    this.dropdownUstensils = document.getElementById("dropdownSelectUstensils");
    this.searchUstensil = document.getElementById("searchInputUstensil");
    this.dropdownListUstensilElement =
      document.getElementById("listboxUstensil");
    this.dropdownHeader =
      this.dropdownUstensils.querySelector(".dropdown_header");
    this.dropdownContent =
      this.dropdownUstensils.querySelector(".dropdown_content");

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

  displayUstensils(ustensils) {
    const html = `
                              ${ustensils
                                .map(
                                  (ustensil) =>
                                    `<li class="dropdown_option" data-value="${ustensil}"role="option" aria-selected="true"
                                  tabindex="0" aria-hidden="true">
                                      ${ustensil}
                              </li>`
                                )
                                .join("")}
                          `;

    this.dropdownListUstensilElement.innerHTML = html;
  }

  bindSearchHandler(handler) {
    this.searchUstensil.addEventListener("input", handler);
  }
  bindSelectHandler(handler) {
    this.dropdownListUstensilElement.addEventListener("click", handler);
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

export default DropdownUstensilsView;

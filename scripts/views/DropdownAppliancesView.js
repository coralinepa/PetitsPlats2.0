class DropdownAppliancesView {
  constructor() {
    this.dropdownAppliances = document.getElementById(
      "dropdownSelectAppliances"
    );
    this.searchAppliance = document.getElementById("searchInputAppliance");
    this.dropdownListApplianceElement =
      document.getElementById("listboxAppliance");
    this.dropdownHeader =
      this.dropdownAppliances.querySelector(".dropdown_header");
    this.dropdownContent =
      this.dropdownAppliances.querySelector(".dropdown_content");

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

  displayAppliances(appliances) {
    const html = `
                            ${appliances
                              .map(
                                (appliance) =>
                                  `<li class="dropdown_option" data-value="${appliance}"role="option" aria-selected="true"
                                tabindex="0" aria-hidden="true">
                                    ${appliance}
                            </li>`
                              )
                              .join("")}
                        `;

    this.dropdownListApplianceElement.innerHTML = html;
  }
  bindSearchHandler(handler) {
    this.searchAppliance.addEventListener("input", handler);
  }
  bindSelectHandler(handler) {
    this.dropdownListApplianceElement.addEventListener("click", handler);
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

export default DropdownAppliancesView;

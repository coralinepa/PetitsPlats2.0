class Filter {
  constructor(
    dropdownIngredientsView,
    dropdownAppliancesView,
    dropdownUstensilsView
  ) {
    this.dropdownUstensilsView = dropdownUstensilsView;
    this.dropdownIngredientsView = dropdownIngredientsView;
    this.dropdownAppliancesView = dropdownAppliancesView;

    this.dropdownSelectElement = document.getElementById("dropdownSelect");
    this.sortButtonElement = document.getElementById("sortButton");
    this.sortOptionsElement = document.querySelectorAll(".dropdown_listbox");
    this.optionsElements =
      this.sortOptionsElement.querySelectorAll('[role="option"]');

    this.init();
  }

  toggleDropdown() {
    const isExpanded = this.sortButtonElement.getAttribute("aria-expanded");
    this.sortButtonElement.setAttribute("aria-expanded", !isExpanded);
    this.sortOptionsElement.setAttribute("aria-hidden", isExpanded);
    this.dropdownSelectElement.classList.toggle("open");
  }

  init() {
    this.sortButtonElement.addEventListener("click", () => {
      this.toggleDropdown();
    });

    this.optionsElements.forEach((optionElement) => {
      optionElement.addEventListener("click", (event) => {
        this.selectOption(event);
      });
    });
  }
}
export default Filter;

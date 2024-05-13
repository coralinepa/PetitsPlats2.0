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

  bindSearchHandler(handler) {
    const searchInput = this.container.querySelector(".dropdown_input");
    if (searchInput) {
      searchInput.addEventListener("input", handler);
    }
  }

  bindSelectHandler(handler) {
    this.dropdownContent.addEventListener("click", (event) => {
      if (event.target.classList.contains("dropdown_option")) {
        handler(event.target.dataset.value);
      }
    });
  }

  toggleDropdown() {
    this.dropdownContent.classList.toggle("dropdown_open");
  }
}

export default DropdownView;

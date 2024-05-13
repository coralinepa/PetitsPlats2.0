class TagsView {
  constructor() {
    this.tagContainer = document.getElementById("sectionTag");
  }

  addToTags(tag) {
    const html = `
      <div class="tag">
          ${tag}
          <button class="tag_button" data-value="${tag}">
          &times;
          </button>
      </div>
    `;

    this.tagContainer.insertAdjacentHTML("beforeend", html);
  }

  removeFromTags(tag) {
    const tagElement = document.querySelector(
      `#sectionTag div button[data-value="${tag}"]`
    );

    if (tagElement) {
      const parentElement = tagElement.parentNode;
      // Utilisez removeChild pour supprimer l'élément de son parent
      this.tagContainer.removeChild(parentElement);
    } else {
      console.log("L'élément à supprimer n'existe pas.");
    }
  }

  bindRemoveHandler(handler) {
    const tagsElements = document.querySelectorAll(".tag_button");
    tagsElements.forEach((tag) => tag.addEventListener("click", handler));
  }
}

export default TagsView;

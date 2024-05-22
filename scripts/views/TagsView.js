//cette classe gère l'affichage des tags sélectionnés par l'utilisateur et permet de les ajouter ou de les supprimer de l'interface utilisateur.
class TagsView {
  //Le constructeur initialise une instance de TagsView.
  //this.tagContainer est un élément DOM qui contient les tags. Il est récupéré par son identifiant (sectionTag).
  constructor() {
    this.tagContainer = document.getElementById("sectionTag");
  }

  // ajoute un nouveau tag à "this.tagContainer"
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

  // supprime un nouveau tag à "this.tagContainer"
  removeFromTags(tag) {
    const tagElement = document.querySelector(
      `#sectionTag div button[data-value="${tag}"]`
    );

    if (tagElement) {
      const parentElement = tagElement.parentNode;
      // Utilisez removeChild pour supprimer l'élément de son parent
      this.tagContainer.removeChild(parentElement);
    } else {
      //ajoute un nouveau tag à "this.tagContainer"
      console.log("L'élément à supprimer n'existe pas.");
    }
  }

  // cette méthode associe un gestionnaire d'event "handler" à tous les boutons de suppression de tag
  bindRemoveHandler(handler) {
    const tagsElements = document.querySelectorAll(".tag_button");
    //forEach parcourt chaque bouton et ajoute un écouteur d'événement click qui déclenche le handler.

    tagsElements.forEach((tag) => tag.addEventListener("click", handler));
  }
}

// La classe TagsView gère l'ajout et la suppression des tags dans l'interface utilisateur

export default TagsView;

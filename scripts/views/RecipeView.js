// gère l'affichage des recettes et les interactions avec le formulaire de recherche
class RecipeView {
  constructor() {
    //this.recipesContainer est l'élément DOM qui contiendra les cartes des recettes, identifié par sectionCard.
    this.recipesContainer = document.getElementById("sectionCard");
    //this.form est le formulaire de recherche, identifié par form.
    this.form = document.getElementById("form");
    //this.recipeCountBadge est l'élément DOM qui affiche le nombre de recettes, identifié par recipeCountBadge.
    this.recipeCountBadge = document.getElementById("recipeCountBadge");
  }

  //Met à jour le texte de this.recipeCountBadge pour afficher le nombre de recettes.
  updateCount(count) {
    this.recipeCountBadge.textContent = `${count} recettes`;
  }
  //cette méthode affiche les recettes dans "this.recipeContainer"
  //si le tableau recipes contient des éléments, elle génère html pour chaque recette
  //Si le tableau recipes est vide, un message "pas de résultat" est affiché.
  displayRecipes(recipes) {
    if (recipes.length > 0) {
      const html = recipes
        .map((recipe) => {
          const { id, name, image, description, ingredients, time } = recipe;
          return `
    <article class="card" data-id=${id}>
    
    ${
      time > 0
        ? ` <p class="card_time">
                ${
                  time > 60
                    ? `${Math.floor(time / 60)} h ${time % 60}`
                    : `${time} min`
                }
                </p>`
        : ""
    }
                <div class="card_img" >
                        <img src="${`assets/${image}`}" alt="${name}">
                </div>
                <div class="card_content">
                <header class="card_title">
                    <h2>${name}</h2>
                </header>
             <div class="card_instructions">
                        <h3>Recette</h3>
                            <p>${description}</p>
                 
                         </div>
                <div>
                <h4>Ingrédients</h4>
                <ul class="card_txt">
                            ${ingredients
                              .map((ingredient) => {
                                return `
                                        <li>
                                            <span>${
                                              ingredient.ingredient
                                            }</span>
                                            <span>${
                                              ingredient?.quantity ?? ""
                                            } ${ingredient?.unit ?? ""}</span>
                                        </li>
                                            `;
                              })
                              .join("")} 
                        </ul>
                    </div>
                </div>
                </div>
            </article>
          `;
        })
        .join("");
      this.recipesContainer.innerHTML = html;
    } else {
      this.recipesContainer.innerHTML = `pas de résultat`;
    }
  }

  //Cette méthode lie un gestionnaire d'événements handler à l'événement submit du formulaire de recherche.
  // Quand le formulaire est soumis, le gestionnaire d'événements spécifié est appelé.
  bindSearchHandler(handler) {
    this.form.addEventListener("submit", handler);
  }
}

export default RecipeView;

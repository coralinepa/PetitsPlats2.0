class RecipeView {
  constructor() {
    this.recipesContainer = document.getElementById("sectionCard");
    this.form = document.getElementById("form");
    this.recipeCountBadge = document.getElementById("recipeCountBadge");
  }

  updateCount(count) {
    this.recipeCountBadge.textContent = `${count} recettes`;
  }

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

  bindSearchHandler(handler) {
    this.form.addEventListener("submit", handler);
  }
}

export default RecipeView;

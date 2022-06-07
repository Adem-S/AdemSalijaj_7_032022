function recipesFactory(data) {
  const { id, name, ingredients, time, description, appliance, ustensils } =
    data;
  //Creer l'élement dom de la recette avec un data-id qui est l'ID de chaque recette
  function getRecipeCardDOM() {
    const div = `
            <div class="card" data-id="${id}">
              <div class="card__container">
                <div class="card__header">
                  <h3>${name}</h3>
                  <div>
                    <img src="../img/clock.svg" alt="clock" />
                    <p>${time} min</p>
                  </div>
                </div>
                <div class="card__text">
                  <div>
                  ${ingredients
                    .map((ingredient) => {
                      return `<p> <strong>${ingredient.ingredient}</strong> ${
                        ingredient.quantity ? ": " + ingredient.quantity : ""
                      } ${ingredient.unit ? ingredient.unit : ""}<p>`;
                    })
                    .join("")}
                  </div>
                  <p class="card__description">${description}</p>
                </div>
              </div>
            </div>
            `;
    return div;
  }
  //Creer un object pour la recette utile pour les manipulations js (objet qu'on utilise lors su filtre par recherche ou par tag)
  function getRecipeObject() {
    let arrayIngredients = [];
    let arrayUstensils = [];
    ingredients.forEach((ingredient) => {
      arrayIngredients.push(ingredient.ingredient);
    });

    ustensils.forEach((ustensil) => {
      arrayUstensils.push(ustensil);
    });

    return {
      id,
      name,
      description,
      ingredients: arrayIngredients,
      ustensils: arrayUstensils,
      appliance: [appliance],
    };
  }
  return { getRecipeCardDOM, getRecipeObject };
}

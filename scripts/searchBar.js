//Détecte les changements dans l'input de la recherche principale
document
  .querySelector(".search-container input")
  .addEventListener("input", (e) => {
    let value = e.target.value;

    if (value.length >= 3) {
      filterRecipes(value);
    } else if (e.inputType == "deleteContentBackward") {
      filterRecipes("");
    }
  });

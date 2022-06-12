let RECIPES = []; //Toutes les recettes
let RECIPES_TO_SHOW = []; //Toutes les recettes filtrées à afficher dans le DOM
let TAGS = []; // Les tags qui sont appliqués

//Obtenir toutes les recettes
async function getData() {
  // Récupère les données json dans le fichier photographers.json
  const response = await fetch("data/recipes.json");
  if (!response.ok) {
    return "error";
  } else {
    const data = await response.json();
    return data.recipes;
  }
}

//Mise en place des recettes dans le DOM
async function displayData(recipes) {
  const recipesSection = document.querySelector(".recipes-section");
  recipes.forEach((recipe) => {
    const recipeModel = recipesFactory(recipe);
    const recipeCardDOM = recipeModel.getRecipeCardDOM();
    const recipeObject = recipeModel.getRecipeObject();
    RECIPES.push(recipeObject);
    RECIPES_TO_SHOW.push(recipeObject);
    recipesSection.innerHTML += recipeCardDOM;
  });

  setSelectChoices(RECIPES_TO_SHOW);
}

//Filtre les recettes et les choix des selects selon le tag ajouté et la recherche
function filterRecipes(input, tag = "") {
  //Verifie la présence de la valeur de la recherche en paramètre
  let inputValue =
    input != undefined
      ? input
      : document.querySelector(".search-container input").value;

  //Verifie la présence de tags en paramètre
  let listTag = tag ? tag : TAGS;

  let arrayAfterFilterByTag = listTag.length > 0 ? [] : RECIPES;

  //Verifie si il y a des tags
  if (listTag.length > 0) {
    //Verifie si les recettes correspondent aux tags ajoutés et modifie la variable arrayAfterFilterByTag
    for (let i = 0; i < RECIPES.length; i++) {
      if (listTag == []) continue;
      let listTagCount = 0;
      listTagLoop: for (let k = 0; k < listTag.length; k++) {
        for (let x = 0; x < RECIPES[i].appliance.length; x++) {
          if (RECIPES[i].appliance[x] == listTag[k]) {
            listTagCount++;
            continue listTagLoop;
          }
        }
        for (let y = 0; y < RECIPES[i].ingredients.length; y++) {
          if (RECIPES[i].ingredients[y] == listTag[k]) {
            listTagCount++;
            continue listTagLoop;
          }
        }
        for (let z = 0; z < RECIPES[i].ustensils.length; z++) {
          if (RECIPES[i].ustensils[z] == listTag[k]) {
            listTagCount++;
            continue listTagLoop;
          }
        }
      }
      if (listTagCount == listTag.length) {
        arrayAfterFilterByTag.push(RECIPES[i]);
      }
    }
  }

  //Verifie si les recettes correspondent à la recherche, modifie la variable finalArray et assigne la variable finalArray à RECIPES_TO_SHOW
  let finalArray = inputValue.length >= 3 ? [] : arrayAfterFilterByTag;
  if (inputValue.length >= 3) {
    for (let l = 0; l < arrayAfterFilterByTag.length; l++) {
      if (
        arrayAfterFilterByTag[l].name
          .toUpperCase()
          .indexOf(inputValue.toUpperCase()) > -1 ||
        arrayAfterFilterByTag[l].ingredients.indexOf(inputValue.toUpperCase()) >
          -1 ||
        arrayAfterFilterByTag[l].description
          .toUpperCase()
          .indexOf(inputValue.toUpperCase()) > -1
      ) {
        finalArray.push(arrayAfterFilterByTag[l]);
      }
    }
  }

  RECIPES_TO_SHOW = finalArray;

  displayRecipesToShow(RECIPES_TO_SHOW);
  displaySelectChoicesToShow(RECIPES_TO_SHOW);
}

//Affiche uniquement les recettes filtrées dans le DOM
function displayRecipesToShow(filteredRecipe) {
  const emptyRecipesText = document.querySelector(".recipes-section__empty"); //Text affiché si il n'y a pas de recette
  filteredRecipe.length > 0
    ? emptyRecipesText.classList.add("hidden")
    : emptyRecipesText.classList.remove("hidden");

  //Depuis l'object de chaque recette (recipesFactory) on verifie si l'id correspond au date-id de l'élement DOM et on filtre
  let recipesCard = document.querySelectorAll(".card");
  recipesCard.forEach((card) => {
    if (filteredRecipe.some((recipe) => recipe.id == card.dataset.id)) {
      card.style.display = "flex";
    } else {
      card.style.display = "none";
    }
  });
}

//Fonction initiale
async function init() {
  const recipes = await getData();
  displayData(recipes);
}

init();

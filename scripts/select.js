const selects = document.querySelectorAll(".select"); //Tous les selects (Ingredients, ...)
const inputs = document.querySelectorAll(".select__input input"); // Tous les inputs dans les selects

//Mise en place des differents choix possibles dans les selects
function setSelectChoices(recipes) {
  const listIngredientsSection = document.querySelector(
    ".select--ingredients .select__item"
  );
  const listApplianceSection = document.querySelector(
    ".select--appliance .select__item"
  );
  const listUstensilsSection = document.querySelector(
    ".select--ustensils .select__item"
  );

  let arrayIngredients = [];
  let arrayAppliances = [];
  let arrayUstensils = [];

  recipes.forEach((recipe) => {
    const { ingredients, appliance, ustensils } = recipe;

    //Verifie si le choix est pas déjà présent sinon on l'ajoute dans le select

    if (!arrayAppliances.includes(appliance[0].toUpperCase())) {
      arrayAppliances.push(appliance[0].toUpperCase());
      listApplianceSection.innerHTML += `<p onclick="addTag('${appliance[0]}', 'appliance')">${appliance[0]}</p>`;
    }

    ingredients.forEach((ingredient) => {
      if (!arrayIngredients.includes(ingredient.toUpperCase())) {
        arrayIngredients.push(ingredient.toUpperCase());
        listIngredientsSection.innerHTML += `<p onclick="addTag('${ingredient}', 'ingredients')">${ingredient}</p>`;
      }
    });

    ustensils.forEach((ustensil) => {
      if (!arrayUstensils.includes(ustensil.toUpperCase())) {
        arrayUstensils.push(ustensil.toUpperCase());
        listUstensilsSection.innerHTML += `<p onclick="addTag('${ustensil}', 'ustensils')">${ustensil}</p>`;
      }
    });
  });
}

//Filtre les choix du select qui doivent être affichés par rapport à la selection de tag ou de la recherche pricipale
function displaySelectChoicesToShow(filteredRecipe) {
  const listIngredients = document.querySelectorAll(
    ".select--ingredients .select__item > p"
  );
  const listAppliance = document.querySelectorAll(
    ".select--appliance .select__item > p"
  );
  const listUstensils = document.querySelectorAll(
    ".select--ustensils .select__item > p"
  );

  //Pour chaque selects ajoute une class hidden aux choix qui doivent être masqués

  listIngredients.forEach((ingredient) => {
    if (
      filteredRecipe.some((recipe) =>
        recipe.ingredients.includes(ingredient.innerHTML)
      )
    ) {
      ingredient.classList.remove("hidden");
    } else {
      ingredient.classList.add("hidden");
    }
  });

  listAppliance.forEach((appliance) => {
    if (
      filteredRecipe.some((recipe) =>
        recipe.appliance.includes(appliance.innerHTML)
      )
    ) {
      appliance.classList.remove("hidden");
    } else {
      appliance.classList.add("hidden");
    }
  });

  listUstensils.forEach((ustensil) => {
    if (
      filteredRecipe.some((recipe) =>
        recipe.ustensils.includes(ustensil.innerHTML)
      )
    ) {
      ustensil.classList.remove("hidden");
    } else {
      ustensil.classList.add("hidden");
    }
  });
}

//Affichage et intercation du select (Lors du click sur le select pour que ca se transforme en input et que les choix s'affichent)
selects.forEach((select, index, array) => {
  select.addEventListener("click", (e) => {
    let element = e.target;
    let otherElement;
    //Verifie si un autre select est ouvert et le ferme
    [...array].forEach((otherSelect, indexElement) => {
      if (indexElement != index) {
        otherSelect.firstElementChild.classList.remove("hidden");
        otherSelect.firstElementChild.nextElementSibling.classList.add(
          "hidden"
        );
      }
    });
    //Chaque condition vérfie sur quel element on click dans le select
    if (
      element.classList.contains("select__header") ||
      element.parentNode.classList.contains("select__header")
    ) {
      element = select.firstElementChild;
      otherElement = select.firstElementChild.nextElementSibling;
    } else if (
      element.classList.contains("cross-select") ||
      element.parentNode.classList.contains("select__item")
    ) {
      element = select.firstElementChild.nextElementSibling;
      otherElement = select.firstElementChild;
      resetInputsValue(select);
    } else {
      return;
    }
    //Ajoute une class hidden à la div qui affiche si le select est ouvert ou pas
    element.classList.toggle("hidden");
    otherElement.classList.toggle("hidden");
  });
});

//Reset de l'input dans le select pour qu'il soit vide
resetInputsValue = (select) => {
  let element = select.querySelector("input");
  element.value = "";
  filterSelectChoices(element, element.dataset.type);
};

//Filtre les choix dans chaque select par rapport à la recherche qu'on fait sur l'input des selects
function filterSelectChoices(element, type) {
  let inputValue = element.value.toUpperCase();
  let elements = document.querySelectorAll(`.select--${type} .select__item p`);

  elements.forEach((element) => {
    elementText = element.textContent || element.innerText;
    if (elementText.toUpperCase().indexOf(inputValue) > -1) {
      element.style.display = "";
    } else {
      element.style.display = "none";
    }
  });
}

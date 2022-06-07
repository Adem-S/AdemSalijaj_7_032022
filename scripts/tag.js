const tagContainer = document.querySelector(".tag-container");

//Ajoute un tag
function addTag(tag, type) {
  if (TAGS.includes(tag)) {
    return;
  }
  TAGS.push(tag);

  tagContainer.innerHTML += `<li class="tag tag--${type}" data-nameTag="${tag}">
            <p>${tag}</p>
            <img src="img/cross.svg" alt="cross" onclick="removeTag('${tag}')" />
          </li>`;

  filterRecipes(undefined, TAGS);
}

//Supprime un tag ajouté
function removeTag(tagName) {
  let element = document.querySelector(`[data-nameTag="${tagName}"]`);
  tagContainer.removeChild(element);
  TAGS = TAGS.filter((tag) => tag !== tagName);
  filterRecipes(undefined, TAGS);
}

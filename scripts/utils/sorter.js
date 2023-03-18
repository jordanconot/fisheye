/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const dropDown = document.querySelector('.dropdown');
const headerDropDown = document.querySelector('.header_dropdown');
const arrow = document.querySelector('.arrow');
let focusablesItem = [];
focusablesItem = Array.from(dropDown.querySelectorAll('li'));

// ouverture du menu
function openDropDown() {
  dropDown.style.display = 'block';
  arrow.setAttribute('class', 'fas fa-chevron-up arrow');
  headerDropDown.setAttribute('aria-expanded', 'true');
}

// Fermeture du menu
function closeDropDown() {
  dropDown.style.display = 'none';
  arrow.setAttribute('class', 'fas fa-chevron-down arrow');
  headerDropDown.setAttribute('aria-expanded', 'false');
}

headerDropDown.addEventListener('click', openDropDown);
dropDown.addEventListener('click', closeDropDown);

// Fermer menu au click en dehors du menu
document.addEventListener('click', (e) => {
  if (!document.querySelector('.dropdown_container').contains(e.target)) {
    closeDropDown();
  }
});
// Fermeture menu avec touche échap du clavier
document.querySelector('.select').addEventListener('keydown', (e) => {
  if (e.key === 'Escape' || e.key === 'esc') {
    closeDropDown();
  }
});

// Boucler la naviguation clavier 'Tab'
function focusTab(e, focusables) {
  e.preventDefault();
  let index = focusables.findIndex((searchFocus) => searchFocus === document.querySelector(':focus'));
  // Décrémentation de l'index à la touche shift
  if (e.shiftKey) {
    // eslint-disable-next-line no-plusplus
    index--;
  } else {
    // eslint-disable-next-line no-plusplus
    index++; // incrémentation
  }
  // Si index supérieur à la longueur du tableau, on revient au début
  if (index >= focusables.length) {
    index = 0;
  }
  // Si l'index est négatif, on va à la fin du tableau
  if (index < 0) {
    index = focusables.length - 1;
  }
  focusables[index].focus();
}

// Tabuler uniquement dans le menu
dropDown.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    focusTab(e, focusablesItem);
  }
  // Fermeture menu si choix effectuer avec la touche 'Enter'
  if (e.key === 'Enter') {
    closeDropDown();
  }
});

// Trie des medias
function sort(media) {
  const headerDropdown = document.querySelector('.header_dropdown');
  let valueSort = 'popularity';

  // Tri avec la valeur du type de tri récupérée
  function typeSort(value) {
    const photographerMediaArticle = media.filter((findMedia) => findMedia.photographerId == nphotographerId);

    if (value === 'popularity') {
      photographerMediaArticle.sort((a, b) => (a.likes > b.likes ? -1 : 1));
    }
    if (value === 'date') {
      photographerMediaArticle.sort((a, b) => (a.date > b.date ? -1 : 1));
    }
    if (value === 'title') {
      photographerMediaArticle.sort((a, b) => (a.title > b.title ? 1 : -1));
    }
    // Effacement de la galerie avant le nouvel affichage
    const removeMedias = Array.from(document.querySelector('.photographer_media').children);
    removeMedias.forEach((item) => {
      item.remove();
    });
    // Affichage de la galerie suivant le type de tri sélectioné
    const photographersMediaContainer = document.querySelector('.photographer_media');

    photographerMediaArticle.forEach((e) => {
      const photographerMediasContainerModel = mediaFactory(e);

      const PhotographerMediaContainerUser = photographerMediasContainerModel.getMediaFactory(value);

      photographersMediaContainer.appendChild(PhotographerMediaContainerUser);
    });
    const photographerImg = document.getElementsByClassName('photographer_media_img');
    Array.from(photographerImg).forEach((item) => {
      item.addEventListener('click', (e) => {
        const clickedIndex = Array.from(photographerImg).indexOf(e.target);
        displayLightBox(photographerMediaArticle, clickedIndex);
      });
    });
    const photographerImgKey = document.getElementsByClassName('photographer_media_img');
    Array.from(photographerImgKey).forEach((item) => {
      item.addEventListener('keydown', (e) => {
        const code = e.which || e.keyCode;
        if (code === 13) {
          const clickedIndex = Array.from(photographerImg).indexOf(e.target);
          displayLightBox(photographerMediaArticle, clickedIndex);
        }
      });
    });
    incrementLikes();
  }
  typeSort(valueSort);
  // Récupération de la valeur du type de tri
  function recoveryValue(e) {
    if (e.target.className.includes('popularity')) {
      headerDropdown.innerHTML = 'Popularité';
      valueSort = 'popularity';
    }
    if (e.target.className.includes('date')) {
      headerDropdown.innerHTML = 'Date';
      valueSort = 'date';
    }
    if (e.target.className.includes('title')) {
      headerDropdown.innerHTML = 'Titre';
      valueSort = 'title';
    }
    typeSort(valueSort); // Lancement de la fonction de tri avec la valeur du type de tri
  }
  // Au click Récupération de la valeur du type de tri
  dropDown.addEventListener('click', (e) => {
    recoveryValue(e);
  });
  // Récupération de la valeur du type de tri avec la touche 'Enter'
  dropDown.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      recoveryValue(e);
    }
  });
}

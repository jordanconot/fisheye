/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
function displayLightBox(data, clickedIndex) {
  let index = clickedIndex;
  const lightBox = document.querySelector('.lightbox');
  const mainOpacity = document.getElementById('main_photographer');
  const {
    photographerId, title, image, video,
  } = data[index];
  let lightBoxElement = ` 
    <div class='lightbox_container'>
        <button class='lightbox_btn_close' onclick="closeLightBox()" aria-label="Bouton pour fermer la vue rapprochée" tabindex="-1">
            <i class='fa-solid fa-xmark fa-3x' class="lightbox_close"></i>
        </button>
            <button class='lightbox_left_arrow' aria-label='Bouton pour passer à la photo précédente' tabindex='0'>
                <i class='fa-solid fa-chevron-left fa-3x'></i>
            </button>
                <button class='lightbox_right_arrow' aria-label='Bouton pour passer à la photo suivante'>
                    <i class='fa-solid fa-chevron-right fa-3x'></i>
                 </button>
                    <div class='lightbox_img' role='dialog' aria-label="Image ouverte en vue rapprochée">
                        <div class='lightbox_img_container'>`;
  if (video !== undefined) {
    lightBoxElement += `
            <img style='display : none;' class='lightbox_img_container_img' tabindex='0' src="./assets/images/${photographerId}/${image}" alt='photogaphie nommée ${title}'/>
            <video controls class='photographer_media_video'><source src="./assets/images/${photographerId}/${video}" type="video/mp4"></video>`;
  } else {
    lightBoxElement += `
                <img class='lightbox_img_container_img' tabindex='0' src="./assets/images/${photographerId}/${image}" alt='photogaphie nommée ${title}'/>
                <video style='display : none;'controls class='photographer_media_video'><source src="./assets/images/${photographerId}/${video}" type="video/mp4"></video>`;
  }
  lightBoxElement += `
            </div>
                <p class='lightbox_description'>${title}</p>
                    </div>
            </div>                  
            `;
  lightBox.showModal();
  lightBox.innerHTML = lightBoxElement;
  mainOpacity.setAttribute('aria-hidden', true);
  lightBox.setAttribute('aria-hidden', false);
  lightBox.setAttribute('aria-modal', true);

  // Je veux incrémenter de +1 l'index lors du click sur la flèche pour afficher l'image suivante
  // et controler si c'est une image ou une vidéo pour gérer l'affiche
  function nextImage() {
    index++;
    if (index >= data.length) {
      index = 0;
    }
    if (data[index].video !== undefined) {
      const videoInLigthbox = document.querySelector('.photographer_media_video');
      const img = document.querySelector('.lightbox_img_container_img');
      videoInLigthbox.setAttribute('src', `./assets/images/${photographerId}/${data[index].video}`);
      img.style.display = 'none';
      videoInLigthbox.style.display = 'block';
    } else {
      const videoInLigthbox = document.querySelector('.photographer_media_video');
      const img = document.querySelector('.lightbox_img_container_img');
      img.setAttribute('src', `./assets/images/${photographerId}/${data[index].image}`);
      img.setAttribute('alt', `${data[index].title}`);
      videoInLigthbox.style.display = 'none';
      img.style.display = 'block';
    }
    const titleImg = document.querySelector('.lightbox_description');
    titleImg.innerHTML = `${data[index].title}`;
  }

  // Je veux décrémenter de -1 l'index lors du click sur la flèche pour afficher l'image précédente
  // et controler si c'est une image ou une vidéo pour gérer l'affiche
  function previousImage() {
    index--;
    if (index < 0) {
      index = data.length - 1;
    }
    if (data[index].video !== undefined) {
      const videoInLigthbox = document.querySelector('.photographer_media_video');
      const img = document.querySelector('.lightbox_img_container_img');
      videoInLigthbox.setAttribute('src', `./assets/images/${photographerId}/${data[index].video}`);
      img.style.display = 'none';
      videoInLigthbox.style.display = 'block';
    } else {
      const videoInLigthbox = document.querySelector('.photographer_media_video');
      const img = document.querySelector('.lightbox_img_container_img');
      img.setAttribute('src', `./assets/images/${photographerId}/${data[index].image}`);
      img.setAttribute('alt', `${data[index].title}`);
      videoInLigthbox.style.display = 'none';
      img.style.display = 'block';
    }
    const titleImg = document.querySelector('.lightbox_description');
    titleImg.innerHTML = `${data[index].title}`;
  }

  // Je souhaite connecter un event listener sur la flèche de droite
  const rightArrow = document.querySelector('.lightbox_right_arrow');
  rightArrow.addEventListener('click', nextImage);

  // Je souhaite connecter un event listener sur la flèche de gauche
  const leftArrow = document.querySelector('.lightbox_left_arrow');
  leftArrow.addEventListener('click', previousImage);

  if (
    rightArrow.addEventListener('keydown', (e) => {
      if (e.key === 'rigthArrow') {
        nextImage();
      }
    })
  ) {
    if (
      leftArrow.addEventListener('keydown', (e) => {
        if (e.key === 'leftArrow') {
          previousImage();
        }
      })
    ) lightBox.showModal();
  }
}
// Je souhaite fermer la lightbox au click sur la croix et enlever l'opacité
function closeLightBox() {
  const mainOpacity = document.getElementById('main_photographer');
  const lightBox = document.querySelector('.lightbox');
  lightBox.close();
  mainOpacity.classList.remove('main_photographer');
  mainOpacity.setAttribute('aria-hidden', false);
}
// Fermer la lightbox avec échap et gérer l'opacity
const mainOpacity = document.getElementById('main_photographer');
const lightBox = document.querySelector('.lightbox');
lightBox.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    lightBox.close();
    mainOpacity.classList.remove('main_photographer');
  }
});

/* eslint-disable no-undef */
/* eslint-disable eqeqeq */
/* eslint-disable no-console */
const url = window.location.search;
const nphotographerId = url.slice(1);

async function getPhotographer() {
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  const photographerAPI = await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((res) => {
      const { photographers } = res;
      const { media } = res;
      // et bien retourner le tableau photographers seulement une fois récupéré
      return { photographers, media };
    })
    .catch((err) => console.log('error:', err));
  return photographerAPI;
}

async function displayPhotographer(medias, photographers) {
  // Header photographer
  const photographerHeader = document.querySelector('.photograph_header');

  const photographerId = photographers.find((findIdPhotographer) => findIdPhotographer.id == nphotographerId);

  const photographerModelHeader = photographerFactory(photographerId);

  const photographerPortrait = photographerModelHeader.getPhotographerHeader();
  photographerHeader.appendChild(photographerPortrait);

  // ----------------------------Open modal onclick and control fields-----------------------------------

  const btnContact = document.querySelector('.btn');

  btnContact.addEventListener('click', () => {
    displayModal(photographerId);
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const email = document.getElementById('email');
    const message = document.getElementById('message');

    // Check the first name field with a regex and add an error
    function isValideFirstName() {
      const firstRegex = /^[a-zA-Z -]{2,20}$/;
      const errorFirstName = document.getElementById('errorFirstName');
      if (firstRegex.test(firstName.value) === false) {
        errorFirstName.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du prénom';
        errorFirstName.style.color = '#ffe7e1';
        firstName.setAttribute('aria-invalid', 'true');
        return false;
      }
      errorFirstName.textContent = '';
      firstName.setAttribute('aria-invalid', 'false');
      return true;
    }
    // Check the last name field with a regex and add an error
    function isValideLastName() {
      const lastRegex = /^[a-zA-Z -]{2,20}$/;
      const errorLastName = document.getElementById('errorLastName');
      if (lastRegex.test(lastName.value) === false) {
        errorLastName.textContent = 'Veuillez entrer 2 caractères ou plus pour le champ du nom';
        errorLastName.style.color = '#ffe7e1';
        lastName.setAttribute('aria-invalid', 'true');
        return false;
      }
      errorLastName.textContent = '';
      lastName.setAttribute('aria-invalid', 'false');
      return true;
    }
    // Check the email field with a regex and add an error
    function isValideEmail() {
      const errorEmail = document.getElementById('errorEmail');
      const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,20}$/;
      if (emailRegex.test(email.value) === false) {
        errorEmail.textContent = 'Format incorrect';
        errorEmail.style.color = '#ffe7e1';
        email.setAttribute('aria-invalid', 'true');
        return false;
      }
      errorEmail.textContent = '';
      email.setAttribute('aria-invalid', 'false');
      return true;
    }

    firstName.addEventListener('change', () => {
      isValideFirstName();
    });

    lastName.addEventListener('change', () => {
      isValideLastName();
    });

    email.addEventListener('change', () => {
      isValideEmail();
    });
    function submitForm() {
      if (isValideFirstName() && isValideLastName() && isValideEmail()) {
        console.log('firstName: ', firstName.value);
        console.log('lastName: ', lastName.value);
        console.log('email: ', email.value);
        console.log('message :', message.value);

        // Pour la soumission du formulaire sur la touche Enter
        const btnSubmiteKeyEnter = document.querySelector('.btn_modal');
        const main = document.getElementById('main_photographer');
        const modal = document.getElementById('modal');
        btnSubmiteKeyEnter.addEventListener('keydown', (e) => {
          if (e.code == 'Enter') {
            e.preventDefault();
            modal.close();
            main.classList.remove('main_photographer');
            modal.setAttribute('aria-hidden', true);
            main.setAttribute('aria-hidden', false);
            modal.setAttribute('aria-modal', false);
          }
        });

        modal.close();
        main.classList.remove('main_photographer');
        main.setAttribute('aria-hidden', false);
      }
    }
    const btnSubmit = document.querySelector('.btn_modal');
    btnSubmit.addEventListener('click', (e) => {
      e.preventDefault();
      submitForm();
    });
    const btnSubmitKey = document.querySelector('.btn_modal');
    btnSubmitKey.addEventListener('keydown', (e) => {
      const code = e.which || e.keyCode;
      if (code === 13) {
        e.preventDefault();
        submitForm();
      }
    });
  });
  // -------------------------------------------END MODAL------------------------------------------------------------

  // Photos photographer
  const photographerMediaArticle = medias.filter((findMedia) => findMedia.photographerId == nphotographerId);

  const photographersMediaContainer = document.querySelector('.photographer_media');

  photographerMediaArticle.forEach((e) => {
    const photographerMediasContainerModel = mediaFactory(e);

    const PhotographerMediaContainerUser = photographerMediasContainerModel.getMediaFactory();

    photographersMediaContainer.appendChild(PhotographerMediaContainerUser);
  });

  // -------------------------------------------LIKES--------------------------------------------------------------------

  const photographerLikeAndPrice = document.querySelector('.photographer_nav_container');
  let like = 0;

  photographerMediaArticle.forEach((media) => {
    like += media.likes;
  });

  const photographerLikeAndPriceModel = likeAndPriceFactory({
    price: photographerId.price,
    likes: like,
  });
  const photographerLikeAndPriceDisplay = photographerLikeAndPriceModel.getLikeAndPriceFactory();
  photographerLikeAndPrice.appendChild(photographerLikeAndPriceDisplay);
}

async function init() {
  // Récupère les datas des photographes
  const { photographers, media } = await getPhotographer();
  displayPhotographer(media, photographers);
  incrementLikes();
  sort(media);
}
init();

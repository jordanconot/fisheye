/* eslint-disable no-unused-vars */
const main = document.getElementById('main_photographer');
const modal = document.getElementById('modal');

function displayModal(photographerId) {
  const { name } = photographerId;
  const modalElement = `
        <header class="modal_header">
            <div class="modal_function">
                <h1 id="modal">Contactez-moi</h1>
                <p class="modal_name" tabindex=0 >${name}</p>
            </div>
            <img src="assets/icons/close.svg" onclick="closeModal()" class="modal_close"  role="button" aria-label="fermer la modal"/>
        </header>

        <form class="modal_form">
            <label for="firstName" id="firstname" aria-input-field-name="Prénom">Prénom</label>
                <input class="input" id="firstName" type="text" name="firstname" tabindex='0' aria-errormessage='errorFirstName' aria-invalid='false' required/>
                    <span id="errorFirstName" class="firstNameError" aria-live='polite' role='alert'></span>
            <label for="lastName" aria-input-field-name="Nom">Nom</label>
                <input class="input" type="text" name="lastName" id="lastName" tabindex='0' aria-errormessage='errorLastName' aria-invalid='false' required>
                    <span class="errorLastName" id="errorLastName" aria-live='polite' role='alert'></span>
            <label for="email" aria-input-field-name="Email">Email</label>
                <input  class="input" type="email" name="email" id="email" tabindex='0' aria-errormessage='errorEmail' aria-invalid='false'>
                    <span class="errorEmail" id="errorEmail" aria-live='polite' role='alert'></span>
                        <div class="modal_comment">
            <label for="message" aria-input-field-name="Message">Votre message</label>
                <textarea type="text" name="message" id="message" class="modal_message input" tabindex='0'></textarea>
            </div>
            
        <button class="btn_modal modal_submit" type="submit">Envoyer</button>
     </form>
    `;
    // Affichage de la modal avec la méthode showModal de dialog et mise en place d'une opacity pour ce qui n'est pas dans la modal
  modal.innerHTML = modalElement;
  modal.showModal();
  main.classList.add('main_photographer');
  main.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-hidden', false);
  modal.setAttribute('aria-modal', true);
}
// Fermeture de la modal avec la méthode close de dialog et remove de l'opacity
function closeModal() {
  modal.close();
  main.classList.remove('main_photographer');
  modal.setAttribute('aria-hidden', true);
  modal.setAttribute('aria-modal', false);
  main.setAttribute('aria-hidden', false);
}
// Pour la touche échap du clavier
modal.addEventListener('keydown', (e) => {
  if (e.code === 'Escape') {
    e.preventDefault();
    modal.close();
    main.classList.remove('main_photographer');
    modal.setAttribute('aria-hidden', true);
    main.setAttribute('aria-hidden', false);
    modal.setAttribute('aria-modal', false);
  }
});

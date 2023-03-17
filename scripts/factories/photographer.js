// Factory for Home page
function photographerFactory(data) {
    const { name, portrait, city, country, tagline, price, id } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');

        // integration of the hover link on the image and the h2 for the page photographer.html + id
        const link = document.createElement('a');
        link.setAttribute('href', `photographer.html?${id}`);
        link.classList.add('photographer_section_link');

        // integration of the image and its attributes for accessibility
        const img = document.createElement('img');
        img.setAttribute('src', picture);
        img.setAttribute('alt', `photographie de ${name}`);
        img.setAttribute('role', 'button');
        img.setAttribute('aria-label', `ouvrir la page pour ${name}`);

        // locality integration
        const locality = document.createElement('p');
        locality.innerHTML = `${city}, ${country}`;
        locality.classList.add('photographer_section_locality');

        // tagline integration
        const tag = document.createElement('p');
        tag.innerHTML = tagline;
        tag.classList.add('photographer_section_tag');

        // price integration
        const thePrice = document.createElement('span');
        thePrice.innerHTML = `${price}€/jour`;
        thePrice.classList.add('photographer_section_price');

        // h2 integration
        const h2 = document.createElement('h2');
        h2.innerHTML = name;

        // creation of a div to group the locality, tagline and price
        const label = document.createElement('div');
        label.classList.add('photographer_section_label');

        link.appendChild(img);
        link.appendChild(h2);
        label.appendChild(locality);
        label.appendChild(tag);
        label.appendChild(thePrice);
        article.appendChild(link);
        article.appendChild(label);

        return article;
    }

    // Factory for Header page photographer.html
    function getPhotographerHeader() {
        const photographerHeaderContainer = document.createElement('div');
        photographerHeaderContainer.classList.add('photograph_header_container');

        photographerHeaderContainer.innerHTML = `
            <div class='photographer_header_id'>
                <h1 tabindex='0'>${name}</h1>
                <p>${city}, ${country}</p>
                <span>${tagline}</span>
            </div>
                <div class='photographer_header_btn'>
                     <button class='btn' type='button' tabindex="0" aria-label='ouvrir le formulaire pour contacter ${name}'>
                        Contactez-moi
                    </button>
                </div>
                    <div class='photographer_header_img'>
                        <img src='assets/photographers/${portrait}' alt='photographie de ${name}'/>
                    </div>
                `;

        return photographerHeaderContainer;
    }
    return { name, id, city, country, tagline, price, portrait, picture, getUserCardDOM, getPhotographerHeader };
}

// Factory to manage media
function mediaFactory(data) {
    const { photographerId, title, image, likes, video } = data;

    const Image = `<img class='photographer_media_img' src="./assets/images/${photographerId}/${image}" alt='photogaphie représentant ${title}' tabindex='0' aria-label="Ouverture en vue raprochée de l'image"/>`;
    const Video = `<video controls class='photographer_media_img'  aria-label="Ouverture en vue raprochée de la vidéo"><source src="./assets/images/${photographerId}/${video}" type="video/mp4"></video>`;

    let mediaStyle;
    if (!image) {
        mediaStyle = Video;
    } else {
        mediaStyle = Image;
    }

    // factory to display the photo info
    function getMediaFactory() {
        const photographerMediasArticle = document.createElement('article');

        photographerMediasArticle.classList.add('photographer_article');
        photographerMediasArticle.innerHTML += `

        ${mediaStyle}
        <div class="photographer_media_article_text">
        <h2>${title}</h2>
        <div class="photographer_article_like">
            <span class="likes" aria-label="Nombre de personne qui ont aimé la publication" tabindex="0">${likes}</span>
            <button class="photographer_article_like_icon"  data-increment='false' aria-label='Bouton pour liker la publication nommée ${title}'>
                <i class="fa-solid fa-heart fa-like fa-xl count"></i>
            </button>
        </div>
      </div>
      `;

        return photographerMediasArticle;
    }

    return { photographerId, title, image, likes, video, getMediaFactory };
}

//--------------------------------------------Lightbox--------------------------------------------------------------------

// ----------------------------------------Like and price box at bottom of page--------------------------------------

function likeAndPriceFactory(data) {
    const { price, likes } = data;

    function getLikeAndPriceFactory() {
        const photographerLikeAndPrice = document.createElement('div');

        photographerLikeAndPrice.classList.add('photographer_nav');
        photographerLikeAndPrice.innerHTML = `
        <ul class="photographer_nav_like">
        <li class="photographer_nav_like_total" tabindex='0' aria-label='nombre de like total'>${likes}</li>
        <li><i class="fa-solid fa-heart"></i></li>
        </ul>
        <p class='photographer_nav_price' tabindex='0' aria-label='Honoraire du photographe par jour'>${price}€ / jour</p>`;

        return photographerLikeAndPrice;
    }
    return { price, likes, getLikeAndPriceFactory };
}

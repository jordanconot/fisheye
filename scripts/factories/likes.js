// Fonction pour gérer les likes avec une boucle sur tous les boutons, on gére l'événement au click en controlant si les boutons
// sont par défault en data-incrément 'false' on incrémente de 1 et on leur passe data-increment sur true
// et si c'est sur 'true', on décrémente et on les repasse sur 'false'
function incrementLikes() {
    const likeButtons = document.querySelectorAll('.photographer_article_like_icon');
    console.log(likeButtons);
    const likeCounts = document.querySelectorAll('.likes');
    const likesCountsLength = likeCounts.length;
    const likeTotal = document.querySelector('.photographer_nav_like_total');

    for (let i = 0; i < likesCountsLength; i++) {
        likeButtons[i].addEventListener('click', () => {
            if (likeButtons[i].getAttribute('data-increment') === 'false') {
                likeCounts[i].textContent++;
                likeCounts[i].style.color = '#DB8876';
                likeButtons[i].style.color = '#DB8876';
                likeTotal.textContent++;
                likeButtons[i].setAttribute('data-increment', 'true');
            } else {
                likeCounts[i].textContent--;
                likeCounts[i].style.color = 'black';
                likeButtons[i].style.color = '#901C1C';
                likeTotal.textContent--;
                likeButtons[i].setAttribute('data-increment', 'false');
            }
        });
    }
}

async function getPhotographers() {
  // mais il sera à remplacer avec une requête sur le fichier JSON en utilisant "fetch".
  const photographersAPI = await fetch('./data/photographers.json')
    .then((res) => res.json())
    .then((res) => {
      const { photographers } = res;
      const { media } = res;
      // et bien retourner le tableau photographers seulement une fois récupéré
      return { photographers, media };
    })
    .catch((err) => {
      throw new Error('error:', err);
    });
  return photographersAPI;
}

async function displayData(photographers) {
  const photographersSection = document.querySelector('.photographer_section');

  photographers.forEach((photographer) => {
    const photographerModel = photographerFactory(photographer);
    const userCardDOM = photographerModel.getUserCardDOM();
    photographersSection.appendChild(userCardDOM);
  });
}

async function init() {
  // Récupère les datas des photographes
  const { photographers } = await getPhotographers();
  displayData(photographers);
}
init();

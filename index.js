import { getAllWorks, getAllCategories } from "./callApi.js";
const sectionWorks = document.querySelector(".gallery");
// Cette fonction filtre les œuvres et met à jour l'affichage.
async function filterWorks(categoryName) {
    
    let worksToDisplay;
    if (categoryName === 'tous') {
        worksToDisplay = await getAllWorks();
    } else {
        const allWorks = await getAllWorks();
        worksToDisplay = allWorks.filter(work => work.category.name === categoryName);
    }
    // Met à jour l'affichage des œuvres.
    worksGenerator(worksToDisplay);
}
// Cette fonction crée le HTML pour les œuvres et l'insère dans la page.
function worksGenerator(works) {
    let figureHTML = "";
    works.forEach(work => {
        figureHTML += `
        <figure class="figure-${work.id}">
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>`;
    });
    sectionWorks.innerHTML = figureHTML;
}
// Cette fonction initialise les filtres de catégorie et gère les clics sur les boutons.
async function setupCategoryFilters() {
    let categories = await getAllCategories();
    const filtresContainer = document.querySelector(".filtres");
    filtresContainer.innerHTML = '';
    const allButton = document.createElement('button');
    allButton.className = 'categorie active';
    allButton.textContent = 'Tous';
    allButton.dataset.category = 'tous';
    allButton.addEventListener('click', function() {
        document.querySelectorAll('.filtres button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterWorks('tous');
    });
    filtresContainer.appendChild(allButton);
   
    categories.forEach(category => {
        let button = document.createElement('button');
        button.className = 'categorie';
        button.textContent = category.name;
        button.dataset.category = category.name;
        button.addEventListener('click', function() {
            document.querySelectorAll('.filtres button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterWorks(this.dataset.category);
        });
        filtresContainer.appendChild(button);
    });
}
// Initialisation de la page.
document.addEventListener('DOMContentLoaded', async () => {
    await setupCategoryFilters();
    filterWorks('tous'); // Affiche tous les travaux par défaut.
});


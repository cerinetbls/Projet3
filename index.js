// Récupère les données depuis callApi.js.
import { getAllWorks, getAllCategories } from "./callApi.js";
const sectionWorks = document.querySelector(".gallery");

// Applique le filtre sélectionné et met à jour l'affichage des œuvres.
async function filterWorks(categoryName) {
    // Sélectionne toutes les œuvres ou celles d'une catégorie spécifique.
    let worksToDisplay;
    if (categoryName === 'tous') {
        worksToDisplay = await getAllWorks();
    } else {
        const allWorks = await getAllWorks();
        worksToDisplay = allWorks.filter(work => work.category.name === categoryName);
    }
    // Affiche les œuvres filtrées.
    worksGenerator(worksToDisplay);
}

// Génère et affiche le HTML pour les œuvres.
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

// Prépare les boutons de filtre de catégorie.
async function setupCategoryFilters() {
    // Récupère les catégories pour créer les boutons de filtre.
    let categories = await getAllCategories();
    const filtresContainer = document.querySelector(".filtres");
    filtresContainer.innerHTML = '';

    // Crée le bouton 'Tous' et le rend actif par défaut.
    const allButton = document.createElement('button');
    allButton.className = 'categorie active';
    allButton.textContent = 'Tous';
    allButton.dataset.category = 'tous';
    allButton.addEventListener('click', function() {
        // Active ce bouton et affiche toutes les œuvres.
        document.querySelectorAll('.filtres button').forEach(btn => btn.classList.remove('active'));
        this.classList.add('active');
        filterWorks('tous');
    });
    filtresContainer.appendChild(allButton);

    // Crée un bouton pour chaque catégorie disponible.
    categories.forEach(category => {
        let button = document.createElement('button');
        button.className = 'categorie';
        button.textContent = category.name;
        button.dataset.category = category.name;
        button.addEventListener('click', function() {
            // Active ce bouton et filtre les œuvres par catégorie.
            document.querySelectorAll('.filtres button').forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            filterWorks(this.dataset.category);
        });
        filtresContainer.appendChild(button);
    });
}

// Assure que tout est prêt au chargement de la page.
document.addEventListener('DOMContentLoaded', async () => {
    // Configure les boutons et affiche toutes les œuvres initialement.
    await setupCategoryFilters();
    filterWorks('tous'); 
});

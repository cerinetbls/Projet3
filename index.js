import { getAllWorks, getAllCategories } from "./callApi.js";

const sectionWorks = document.querySelector(".gallery");
const modeEdition = document.querySelector(".mode-edition");
const header = document.querySelector("header");
const main = document.querySelector("main");
const footer = document.querySelector("footer");
const navigation = document.querySelector("#nav");

// Fonction pour gérer la déconnexion
function handleLogout(event) {
    event.preventDefault(); // Prévenir le comportement par défaut du lien
    // Supprimer le token du localStorage
    window.localStorage.removeItem("token");

    // Réinitialiser l'affichage pour un utilisateur non connecté
    adjustEditMode();

    // Rediriger vers la page d'accueil
    window.location.href = './index.html'; // Assurez-vous que le chemin est correct
}

// Ajuster le mode d'édition et la navigation en fonction du statut de connexion
function adjustEditMode() {
    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
        modeEdition.style.display = "flex";
        header.classList.add("shift");
        main.classList.add("shift");
        footer.classList.add("shift");
        setupNavigation(true);
    } else {
        modeEdition.style.display = "none";
        header.classList.remove("shift");
        main.classList.remove("shift");
        footer.classList.remove("shift");
        setupNavigation(false);
    }
}

// Configurer la navigation en fonction de l'état de connexion
function setupNavigation(isLoggedIn) {
    let navContent = `
        <ul>
            <li><a href="#portfolio" class="nav_link">projets</a></li>
            <li><a href="#contact" class="nav_link">contact</a></li>
            <li>
                <a id="login-logout" href="${isLoggedIn ? '#' : 'login.html'}" class="nav_link">${isLoggedIn ? 'logout' : 'login'}</a>
            </li>
            <li><img src="./assets/icons/instagram.png" alt="Instagram"></li>
        </ul>`;
    navigation.innerHTML = navContent;

    if (isLoggedIn) {
        // Ajouter l'événement de déconnexion
        document.getElementById("login-logout").addEventListener('click', handleLogout);
    }
}

// Fonction pour créer le HTML des œuvres et l'insérer dans la page
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

// Fonction pour filtrer les œuvres et mettre à jour l'affichage
async function filterWorks(categoryName) {
    let worksToDisplay;
    if (categoryName === 'tous') {
        worksToDisplay = await getAllWorks();
    } else {
        const allWorks = await getAllWorks();
        worksToDisplay = allWorks.filter(work => work.category.name === categoryName);
    }
    // Met à jour l'affichage des œuvres
    worksGenerator(worksToDisplay);
}

// Fonction pour initialiser les filtres de catégorie et gérer les clics sur les boutons
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

// Événement DOMContentLoaded pour initialiser les fonctions
document.addEventListener('DOMContentLoaded', async () => {
    await setupCategoryFilters();
    filterWorks('tous'); // Affiche tous les travaux par défaut
    adjustEditMode(); // Ajuster le mode édition selon l'état de connexion
});

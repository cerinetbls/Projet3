import { getAllWorks } from "./callApi.js";
/*Ajout à la galerie les travaux de l’architecte que j'ai récupéré.*/
const sectionWorks = document.querySelector(".gallery");
async function worksGenerator() {
    const works = await getAllWorks();
    const figureHTML = works.map(work =>
        `<figure class="figure-${work.id}">
            <img src="${work.imageUrl}" alt="${work.title}">
            <figcaption>${work.title}</figcaption>
        </figure>`).join('');
    sectionWorks.innerHTML = figureHTML;
}
worksGenerator();
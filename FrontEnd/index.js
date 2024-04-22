/*L’appel à l’API avec fetch afin de récupérer dynamiquement les projets.*/
async function displayArchitectWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();

/*Ajout des travaux à la galerie.*/
    works.forEach(work => {
        const gallery = document.querySelector(".gallery");
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const caption = document.createElement("figcaption");

        img.src = work.imageUrl;
        img.alt = work.title;
        caption.textContent = work.title;

        figure.appendChild(img);
        figure.appendChild(caption);
        gallery.appendChild(figure);
    });
}

displayArchitectWorks();

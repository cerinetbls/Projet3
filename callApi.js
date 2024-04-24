/*Appel à l’API avec fetch*/
export async function getAllWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
};
/*Ajout des filtres pour afficher les travaux par catégorie*/
export async function getAllCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    const categories = await response.json();
    return categories;
};
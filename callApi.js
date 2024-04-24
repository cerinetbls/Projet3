/*Appel à l’API avec fetch*/ 

export async function getAllWorks() {
    const response = await fetch("http://localhost:5678/api/works");
    const works = await response.json();
    return works;
};


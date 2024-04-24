// Sélectionne le formulaire et les champs par leurs identifiants
const formulaire = document.querySelector("#login-form");
const champsEmail = document.querySelector('#email');
const champsMotDePasse = document.querySelector('#password');

// Événement de soumission du formulaire
formulaire.addEventListener("submit", (event) => {
    event.preventDefault();  // Empêche l'envoi du formulaire par défaut

    const email = champsEmail.value;
    const password = champsMotDePasse.value;

    // Envoi des données d'identification à l'API pour vérification
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erreur d’identifiant ou de mot de passe");
        }
        return response.json();
    })
    .then((data) => {
        if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "./index.html";
        } else {
            throw new Error("Erreur lors de la connexion");
        }
    })
    .catch((error) => {
        document.querySelector(".error-message").textContent = error.message;
    });
});


const reponseworks = await fetch("http://localhost:5678/api/works")
let works = await reponseworks.json()


let userIsLoggedIn;

let Token = window.localStorage.getItem("tokenSophieBluel01");
/* Définit si l'utilisateur est connecté ou non en regardant si la valeur du token est différente de null */
if (window.localStorage.getItem("tokenSophieBluel01") != null) {
    userIsLoggedIn = true;
} else {
    userIsLoggedIn = false;
}

/*Declaration des elements pour les boutons filtres et ajout des classes */
const filtresPhoto = document.querySelector(".filter-bar")

const boutonFiltresTous = document.createElement("button")
boutonFiltresTous.classList.add("filtres_Tous", "button_inactive")
boutonFiltresTous.innerText = "Tous"

const boutonFiltresObjets = document.createElement("button")
boutonFiltresObjets.classList.add("filtres_Objets", "button_inactive")
boutonFiltresObjets.innerText = "Objets"

const boutonFiltresAppartements = document.createElement("button")
boutonFiltresAppartements.classList.add("filtres_Appartements", "button_inactive")
boutonFiltresAppartements.innerText = "Appartements"

const boutonFiltresHotel = document.createElement("button")
boutonFiltresHotel.classList.add("filtres_Hotel", "button_inactive")
boutonFiltresHotel.innerText = "Hôtel & restaurants"

/*Fonction affichage des images sur la page principale */

function affichageworks(works){
    for (let i = 0; i < works.length; i++){
        
        const figurePhoto = document.createElement("figure")
        const titrePhoto = document.createElement("figcaption")
        const worksPhoto = document.createElement("img")
        worksPhoto.src = works[i].imageUrl
        worksPhoto.alt = works[i].title
        titrePhoto.innerText = works[i].title
        figurePhoto.appendChild(worksPhoto)
        figurePhoto.appendChild(titrePhoto)

        const galleryPhoto = document.querySelector(".gallery")
        galleryPhoto.appendChild(figurePhoto)

    }
} 

affichageworks(works)



/*Fonctionnalite des boutons filtres */

boutonFiltresTous.addEventListener("click", function(){
    boutonFiltresTous.classList.add("button_active")
    boutonFiltresAppartements.classList.remove("button_active")
    boutonFiltresObjets.classList.remove("button_active")
    boutonFiltresHotel.classList.remove("button_active")
    document.querySelector(".gallery").innerHTML=""
    affichageworks(works)

})

boutonFiltresObjets.addEventListener("click", function(){
    boutonFiltresObjets.classList.add("button_active")
    boutonFiltresAppartements.classList.remove("button_active")
    boutonFiltresTous.classList.remove("button_active")
    boutonFiltresHotel.classList.remove("button_active")
    
    const worksObjets = works.filter(function (works){
        return works.categoryId === 1
    })
    
    document.querySelector(".gallery").innerHTML=""
    affichageworks(worksObjets)

})

boutonFiltresAppartements.addEventListener("click", function(){
    boutonFiltresAppartements.classList.add("button_active")
    boutonFiltresObjets.classList.remove("button_active")
    boutonFiltresTous.classList.remove("button_active")
    boutonFiltresHotel.classList.remove("button_active")
    
    const worksAppartements = works.filter(function (works){
        return works.categoryId === 2
    })
    
    document.querySelector(".gallery").innerHTML=""
    affichageworks(worksAppartements)

})

boutonFiltresHotel.addEventListener("click", function(){
    boutonFiltresHotel.classList.add("button_active")
    boutonFiltresAppartements.classList.remove("button_active")
    boutonFiltresTous.classList.remove("button_active")
    boutonFiltresObjets.classList.remove("button_active")
    
    const worksHotel = works.filter(function (works){
        return works.categoryId === 3
    })
    
    document.querySelector(".gallery").innerHTML=""
    affichageworks(worksHotel)

})

/*Fonctions de gestion de la modale*/
let modal = null

const modaleSuppressionProjet= document.getElementById("modale-delete")
const modaleAjoutProjet=document.getElementById("modale-add")

const boutonsFermetureModale=document.querySelectorAll(".modale-close")
const stoppeursPropagationModale=document.querySelectorAll(".modale-stop")

const openModal = function(e){
    e.preventDefault()
    modal = document.querySelector(".modale")
    modal.style.display = "flex"
    modal.removeAttribute("aria-hidden")
    modal.setAttribute("aria-modal", "true")
    modal.addEventListener("click", closeModal)
    
    
    for (let n = 0; n < boutonsFermetureModale.length; n++){
        boutonsFermetureModale[n].addEventListener("click", closeModal)
    }
    for(let x = 0; x < stoppeursPropagationModale.length; x++){
        stoppeursPropagationModale[x].addEventListener("click", stopPropagation)
    }

}

const closeModal = function(e){
    if (modal === null){
        return
    }else{
        e.preventDefault()
        modal.style.display="none"
        modal.setAttribute("aria-hidden", "true")
        modal.removeAttribute("aria-modal")
        modal.removeEventListener("click", closeModal)
        for (let n = 0; n < boutonsFermetureModale.length; n++){
            boutonsFermetureModale[n].removeEventListener("click", closeModal)
        }
        for(let x = 0; x < stoppeursPropagationModale.length; x++){
            stoppeursPropagationModale[x].removeEventListener("click", stopPropagation)
        }

        modal=null
        modaleSuppressionProjet.style.display="flex"
        modaleAjoutProjet.style.display="none"
    }
}

const stopPropagation = function(e){
    e.stopPropagation()
}

/*Declaration et modification des elements du formulaire d'ajout des projets*/

const Formulaire=document.querySelector("#Form-send-img")
const BoutonValidationFormulaire=document.createElement("input")
BoutonValidationFormulaire.setAttribute("type","button")
BoutonValidationFormulaire.setAttribute("value","Valider")
BoutonValidationFormulaire.classList.add("button-form","button-form-inactive")

const ZoneImage=document.getElementById("add-image")
const ZoneTitre=document.getElementById("titreImg")
const ZoneCategorie=document.getElementById("categorie")
const LabelZoneImg=document.getElementById("image_Label")
const ImagePrevisualisée= document.createElement("img")
/* Previsualisation image */

ZoneImage.onchange = function(){
    let LectureFichier = new FileReader()
    LectureFichier.readAsDataURL(ZoneImage.files[0])
    
    LectureFichier.onload = function(){
        
        LabelZoneImg.innerHTML=""
        
        ImagePrevisualisée.setAttribute("src", LectureFichier.result)
        LabelZoneImg.appendChild(ImagePrevisualisée)
        
    }

}


/*Recuperation des categories depuis la base de donnees et ajout des options en consequence sur le formulaire */

const reponseCategories = await fetch("http://localhost:5678/api/categories")
const Categories = await reponseCategories.json()



for (let i=0; i <Categories.length;i++){
    let OptionCategorie = document.createElement("option")
    OptionCategorie.setAttribute("value",Categories[i].id)
    OptionCategorie.innerText=Categories[i].name
    ZoneCategorie.appendChild(OptionCategorie)
}
 
/* BOUTON RENDU INVALIDE SI FORMULAIRE PAS CORRECT */
function VerificationChampFormulaire(balise){
    if (balise.value === ""){
        balise.classList.add("champ-formulaire_incorrect")
    } else{
        balise.classList.remove("champ-formulaire_incorrect")
    }
}
function VerificationFichier(balise){
    if (balise.files[0].type == "image/png" || balise.files[0].type == "image/jpg" || balise.files[0].type == "image/jpeg" || balise.files[0].size<4000000){
        balise.classList.remove("champ-formulaire_incorrect")
        
    }else{
        balise.classList.add("champ-formulaire_incorrect")
        alert("Fichier de type incorrect ou taille supérieure a 4 Mo")
    }
}

function ValidationBoutonEnvoiFormulaire(bouton){
    if (ZoneTitre.classList.contains("champ-formulaire_incorrect")===true|| ZoneCategorie.classList.contains("champ-formulaire_incorrect")===true|| ZoneImage.classList.contains("champ-formulaire_incorrect")===true){
        bouton.classList.add("button-form-inactive")
        bouton.setAttribute("disabled", "")
    }else{
        bouton.classList.remove("button-form-inactive")
        bouton.classList.add("button-form-active")
        bouton.removeAttribute("disabled")
    }
}

VerificationChampFormulaire(ZoneTitre)
VerificationChampFormulaire(ZoneCategorie)
VerificationChampFormulaire(ZoneImage)

ZoneTitre.addEventListener("change",()=>{
    VerificationChampFormulaire(ZoneTitre)
    ValidationBoutonEnvoiFormulaire(BoutonValidationFormulaire)
})
ZoneCategorie.addEventListener("change",()=>{
    VerificationChampFormulaire(ZoneCategorie)
    ValidationBoutonEnvoiFormulaire(BoutonValidationFormulaire)
})
ZoneImage.addEventListener("change",()=>{
    VerificationFichier(ZoneImage)
    ValidationBoutonEnvoiFormulaire(BoutonValidationFormulaire)
})


/*Envoi du formulaire pour requete POST */





BoutonValidationFormulaire.addEventListener("click",async function(event){
    event.preventDefault()
    let formData = new FormData()
    formData.append("image",ZoneImage.files[0])
    formData.append("title",ZoneTitre.value)
    formData.append("category",ZoneCategorie.value)
    
    for (const value of formData.values()){
        console.log(value)
    }
    
    await fetch("http://localhost:5678/api/works",{
        method:"POST",
        headers: {
            accept:"application/json",
            Authorization: `Bearer ${Token}`,
        },
        body:formData,
    }).then (async function(response){
        if (response.ok===true){
            
            const ReponseWorksUpdated = await fetch("http://localhost:5678/api/works")
            const worksUpdated = await ReponseWorksUpdated.json()
            document.querySelector(".gallery").innerHTML=""
            affichageworks(worksUpdated)
            document.querySelector(".modale-gallery").innerHTML=""
            affichageEtSuppressionworks(worksUpdated)
            
            alert("L'ajout du projet est réussi")
            
            
            return
            
            
        }else{
            alert("Echec de l'ajout du projet, formulaire incorrect")
        }
    })
})

/*Affichage des projets dans la modale et du bouton suppression et sa fonctionnalité*/
const affichageEtSuppressionworks = function(works){
    for (let i = 0; i < works.length; i++){
        
        const figureModale = document.createElement("figure")
        const GallerieModale = document.querySelector(".modale-gallery")
        const worksModale = document.createElement("img")
        const DivSuppression= document.createElement("div")
        const IconeCorbeille = document.createElement("i")
        IconeCorbeille.classList.add("fa-solid", "fa-trash-can")
        DivSuppression.classList.add("button-delete-modale")
        worksModale.src = works[i].imageUrl
        worksModale.alt = works[i].title
       
        figureModale.appendChild(worksModale)
        DivSuppression.appendChild(IconeCorbeille)
        figureModale.appendChild(DivSuppression)

        GallerieModale.appendChild(figureModale)
        
        DivSuppression.addEventListener("click",async function(event){
            event.preventDefault()
            event.stopPropagation()
            const IDSuppression = works[i].id
        
            await fetch(`http://localhost:5678/api/works/${IDSuppression}`,{
                method:"DELETE",
                headers:{
                    accept:"*/*",
                    Authorization: `Bearer ${Token}`,
                    
                }
            }).then (async function(response){
                if(response.status>=200 && response.status<300){
                    const ReponseWorksUpdated = await fetch("http://localhost:5678/api/works")
                    const worksUpdated = await ReponseWorksUpdated.json()
                    document.querySelector(".gallery").innerHTML=""
                    affichageworks(worksUpdated)
                    document.querySelector(".modale-gallery").innerHTML=""
                    affichageEtSuppressionworks(worksUpdated)          
                    
                }else{
                    alert("Echec de la suppression du projet")
                }
            })

        })
        

    }
}

/*Declaration des elements utilises pour le mode edition */
const divHeader = document.getElementById("header_div")
const divProjets = document.querySelector(".Project")
const iconeEdition = document.createElement("i")
const iconeEdition2 = document.createElement("i")
const texteHeader = document.createElement("p")
const divModificationProjet = document.createElement("div")
const texteProjets = document.createElement("p")
const LienLoginLogout=document.getElementById("Login_Logout")

/*Gestion de l'affichage selon si l'utilisateur est connecte ou non */
if (userIsLoggedIn === true){
    filtresPhoto.innerHTML = ""

    divHeader.classList.remove("display_none")
    divHeader.classList.add("header-edition")
    iconeEdition.classList.add("fa-regular", "fa-pen-to-square")
    iconeEdition2.classList.add("fa-regular", "fa-pen-to-square")
    texteHeader.innerText="Mode édition"
    texteProjets.innerText="modifier" 

    divHeader.appendChild(iconeEdition)
    divHeader.appendChild(texteHeader)

    divProjets.appendChild(divModificationProjet)
    divModificationProjet.appendChild(iconeEdition2)
    divModificationProjet.appendChild(texteProjets)

    LienLoginLogout.href=""
    LienLoginLogout.innerText="logout"
    /*Suppression du token au click sur le logout et rechargement de la page */
    LienLoginLogout.addEventListener("click", function() {
        window.localStorage.removeItem("tokenSophieBluel01");
        document.location.href = "index.html";
    })
    
    /*Event Listener pour ouverture modale sur la div*/
    divModificationProjet.addEventListener("click", openModal)

    /*Appel de la fonction d'affichage des element et de suppression des projets dans la modale */
    affichageEtSuppressionworks(works)
    /*Ajout du bouton pour acceder a la seconde modale et fonctionnement */
    const boutonChangementModale = document.createElement("button")
    boutonChangementModale.classList.add("button_active")
    boutonChangementModale.innerText="Ajouter une photo"
    
    modaleSuppressionProjet.appendChild(boutonChangementModale)

    boutonChangementModale.addEventListener("click", function(event){
        event.preventDefault()
        event.stopPropagation()
        modaleSuppressionProjet.style.display="none"
        modaleAjoutProjet.style.display="flex"
    })

    const boutonRetourModalePrecedente=document.querySelector(".modale-back")
    boutonRetourModalePrecedente.addEventListener("click",function(event){
        event.preventDefault()
        event.stopPropagation()
        modaleSuppressionProjet.style.display="flex"
        modaleAjoutProjet.style.display="none"
    })

    /*Ajout du bouton de validation du formulaire d'ajout de projet par javascript pour securiser davantage*/
    
    Formulaire.appendChild(BoutonValidationFormulaire)

}else{
    filtresPhoto.appendChild(boutonFiltresTous)
    filtresPhoto.appendChild(boutonFiltresObjets)
    filtresPhoto.appendChild(boutonFiltresAppartements)
    filtresPhoto.appendChild(boutonFiltresHotel)
}

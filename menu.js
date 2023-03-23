// fonction pour renvoyer à une autre page
// Sélectionnez le bouton
var button = document.querySelector(".lancer-partie");

// changer d'animal
listImage = ["bunny", "cat", "deer", "horse", "chicken", "cow", "dog", "fox", "grenouille", "koala", "panda", "pig", "penguin", "racoon", "tiger"]


animal = document.querySelector("#myImage");

animal.addEventListener("click", () => {
  animal.setAttribute("src", "images/animals/" + listImage[Math.floor(Math.random() * 15)] + ".png");
});


// Ajoutez un écouteur d'événements pour l'événement click
button.addEventListener("click", function() {
    // Utilisez la méthode window.location.href pour rediriger vers une autre page
    var difficulty = document.querySelector(".color-carre.selected").getAttribute("id");
    var numCards = document.querySelector(".color-button.selected").getAttribute("id");
    window.location.href = "Game/index.html?difficulty="+difficulty+"&numCards="+numCards;
});


//fonction pour sélectionner seulement une case
var buttons = document.getElementsByClassName("color-button");
for (var i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        // Enlever la classe "selected" de tous les boutons
        for (var j = 0; j < buttons.length; j++) {
            buttons[j].classList.remove("selected");
        }
        // Ajouter la classe "selected" au bouton cliqué
        this.classList.add("selected");
    });
} 
// fonction pour ne chosir qu'une difficulté
var button = document.getElementsByClassName("color-carre");
for (var i = 0; i < buttons.length; i++) {
    button[i].addEventListener("click", function() {
        // Enlever la classe "selected" de tous les boutons
        for (var j = 0; j < buttons.length; j++) {
            button[j].classList.remove("selected");
        }
        // Ajouter la classe "selected" au bouton cliqué
        this.classList.add("selected");
    });
}
//fonction pour afficher le règles sous forme de pop-up
// Récupérer les éléments
var rulesButton = document.getElementById("rules-button");
var modal = document.getElementById("modal");
var closeButton = document.getElementById("close-button");

// Ajouter un écouteur d'événements click au bouton Règles du jeu
rulesButton.addEventListener("click", function() {
  modal.style.display = "block";
});

// Ajouter un écouteur d'événements click au bouton fermer
closeButton.addEventListener("click", function() {
  modal.style.display = "none"
}) 
//contour qui s'illumine
const image = document.getElementById("myImage");
  image.addEventListener('mouseover', () => {
    image.style.outline = "4px solid lightblue";
  });
  image.addEventListener('mouseout', () => {
    image.style.outline = "";
  });
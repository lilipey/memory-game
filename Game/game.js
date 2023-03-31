const urlParams = new URLSearchParams(window.location.search);
const difficulty = urlParams.get('difficulty');
const num = urlParams.get('numCards');
var is_safari = navigator.userAgent.indexOf("Safari") > -1;

const section = document.querySelector("section");
const wins = document.querySelector(".wins")
const styleCard = document.querySelectorAll(".card");
const playerLivesCount = document.querySelector(".playerLivesCount");
const movesCount = document.querySelector(".moves");
const timeCount = document.querySelector(".time");
const text = document.querySelector(".life");
let playerLives;
let gameTime;
let timeLeft;

const img = document.querySelector(".img")
const heartContainer = document.createElement("div");
heartContainer.setAttribute("id", "heart-container");
//function to generate the heart 
const heartGenerator = () => {
  for (let i = 0; i <= playerLives; i++) {
    const heartImg = document.createElement("img");
    heartImg.setAttribute("id", `heart-${i}`);
    heartImg.classList.add("heart");
    heartImg.setAttribute("src", "../images/heart.png");
    heartImg.setAttribute("alt", "heart");
    heartContainer.appendChild(heartImg);
    img.appendChild(heartContainer);
  }
};
heartGenerator();

const updateHearts = () => {
  const hearts = document.querySelectorAll('.heart');
  for (let i = 0; i < hearts.length; i++) {
    if (i <= playerLives) {
      hearts[i].setAttribute('src', '../images/heart.png');
    } else {
      hearts[i].setAttribute('src', '../images/heart.gif');
    }
  }
};
updateHearts();


if (difficulty == "carre1") {
  if (num == "button1") {
    playerLives = 8;
    gameTime = 80; // Time in seconds
    timeLeft = gameTime;
  } else {
    playerLives = 11;
    gameTime = 100; // Time in seconds
    timeLeft = gameTime;
  }
} else if (difficulty == "carre2") {
  if (num == "button1") {
    playerLives = 20;
    gameTime = 100; // Time in seconds
    timeLeft = gameTime;
  } else {
    playerLives = 21;
    gameTime = 110; // Time in seconds
    timeLeft = gameTime;
  }
} else {
  playerLives = 20;
  gameTime = 120; // Time in seconds
  timeLeft = gameTime;
}


// Append the heart container to a parent element in your HTML, e.g.
document.body.appendChild(heartContainer);


let moves = 0;
let match = 0;


playerLivesCount.textContent = playerLives;
movesCount.textContent = moves;
timeCount.textContent = timeLeft;

//function to put name, and affilite the image of the cards
const datas = [
  { name: "bunny", image: "../images/animals/bunny.png" },
  { name: "cat", image: "../images/animals/cat.png" },
  { name: "deer", image: "../images/animals/deer.png" },
  { name: "horse", image: "../images/animals/horse.png" },
  { name: "chicken", image: "../images/animals/chicken.png" },
  { name: "cow", image: "../images/animals/cow.png" },
  { name: "dog", image: "../images/animals/dog.png" },
  { name: "fox", image: "../images/animals/fox.png" },
  { name: "grenouille", image: "../images/animals/grenouille.png" },
  { name: "koala", image: "../images/animals/koala.png" },
  { name: "panda", image: "../images/animals/panda.png" },
  { name: "pig", image: "../images/animals/pig.png" },
  { name: "penguin", image: "../images/animals/penguin.png" },
  { name: "racoon", image: "../images/animals/racoon.png" },
  { name: "tiger", image: "../images/animals/tiger.png" }
];
// shuffle the array so you can have dif cards each party, even if you choose 10 cards
const cards = datas.sort(() => Math.random() - 0.5);

const getData = (numCards) => {
  // Filter cards to only include as many as needed( because that's a pair)
  cards.splice(numCards / 2);

  // Duplicate and shuffle cards 
  const shuffledCards = cards
    .flatMap((card) => [card, card])
    .sort(() => Math.random() - 0.5);

  return shuffledCards;
};

// Set the number of cards
let numCards;
if (num == "button1") {
  numCards = 12;
  section.style.gridTemplateColumns = "repeat(4, auto)";
} else if (num == "button2") {
  numCards = 18;
  section.style.gridTemplateColumns = "repeat(6, auto)";
} else {
  numCards = 24;
  section.style.gridTemplateColumns = "repeat(6, auto)";
}

// function to generate the cards
const cardGenerator = () => {
  const cardData = getData(numCards);
  // create the cards (back, face, cards)
  cardData.forEach((item) => {
    const card = document.createElement("div");
    const back = document.createElement("img");
    const face = document.createElement("img");
    card.classList.add("card");
    back.classList.add("back");
    face.classList.add("face");
    if (navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1) {
      card.classList.add("safari");}
    face.src = item.image;
    card.setAttribute("name", item.name);
    card.appendChild(face);
    card.appendChild(back);
    section.appendChild(card);
    back.addEventListener("click", checkCards);
  });
};

var onFlip = 0;

// function to check if the cards match
const checkCards = (e) => {

  if (onFlip < 2) {
    
    const clickedCard = e.target.parentElement;
    clickedCard.classList.toggle("toggleCard");
    let flippedCards = document.querySelectorAll(".toggleCard");
    if (flippedCards.length === 1) {
      flippedCards.forEach((card) => {
        card.style.pointerEvents = "none";

      });
    }
    if (flippedCards.length === 2) {
      moves++;
      movesCount.textContent = moves;
      if (
        flippedCards[0].getAttribute("name") ===
        flippedCards[1].getAttribute("name")
      ) {
        console.log("match");
        flippedCards.forEach((card) => {
          card.style.pointerEvents = "none";
          card.classList.add("matchedCard");
          card.classList.remove("toggleCard");
          match++;
          setTimeout(() => {onFlip = 0;}, 1);
          
        });
      } else {
        console.log("wrong");

        flippedCards.forEach((card) => {
          card.style.pointerEvents = "none";
          card.classList.add("wrong");
        });
        setTimeout(() => {
          flippedCards.forEach((card) => {
            card.style.pointerEvents = "auto";
            card.classList.remove("toggleCard", "wrong");
            onFlip = 0;
          });
        }, 1000);
        playerLives--;
        updateHearts();
        playerLivesCount.textContent = playerLives;
        lives();
      }
    }
    onFlip += 1;
    
  }

};
let countdownTimer; // Declare a global variable to hold the countdown timer ID
const countdown = () => {
  if (timeLeft <= 0 || playerLives <= 0) {
    // Time is up or player has used every life, execute code here
    section.innerHTML = "<h1>Game Over!</h1>";
    clearTimeout(countdownTimer); // Stop the countdown
  } else if (match === (getData(numCards).length)) {
    // All cards are matched, the player has won
    wins.innerHTML = '<h2 class="win">You Won!</h2>';
    clearTimeout(countdownTimer); // Stop the countdown
    section.style.animation = "change-scale 0.5s linear forwards";
  } else {
    timeLeft--;
    timeCount.textContent = timeLeft + "s";
    countdownTimer = setTimeout(countdown, 1000);
  }
};

const startOverButton = document.getElementById("start-over");
startOverButton.addEventListener("click", () => {
  location.reload();
});

const changeLevelButton = document.getElementById("change-level");
changeLevelButton.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const lives = () => {
  if (playerLives <= 0) {
    endGame();
  }
};

const endGame = () => {
  clearTimeout(countdownTimer); // Stop the countdown timer
  section.innerHTML = "<h1>You've used every lives.</h1>";
};


// Start countdown
countdown();
cardGenerator();
heartGenerator();


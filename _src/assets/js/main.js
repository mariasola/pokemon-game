"use strict";
const inputs = document.querySelectorAll(".form_input");
const button = document.querySelector(".form_btn");
const cardsList = document.querySelector(".cards");
let value;
let pokemons = [];

//Get data from API
const getDatafromApi = event => {
  event.preventDefault();
  fetch(
    `https://raw.githubusercontent.com/Adalab/cards-data/master/${knowNumberOfCards()}.json`
  )
    .then(response => response.json())
    .then(data => {
      console.log(data);
      pokemons = data;
      console.log(pokemons);
      paintCards(data);
    });
};

const getNumber = () => {
  const dataInfo = localStorage.getItem("saved_data");
  if (dataInfo === null) {
    const inputFour = document.getElementById("4");
    inputFour.checked = true;
  } else {
    for (const input of inputs) {
      if (input.value === dataInfo) {
        input.checked = true;
      } else {
        input.checked = false;
      }
    }
  }
};
function knowNumberOfCards() {
  for (const input of inputs) {
    const inputValue = input.id;
    const inputChecked = input.checked;
    if (inputChecked === true) {
      value = inputValue;
    }
  }
  return parseInt(value);
}
//Paint front and back cards
const paintCards = () => {
  for (
    let numberOfCards = 0;
    numberOfCards < knowNumberOfCards();
    numberOfCards++
  ) {
    const cardsItem = document.createElement("li");
    cardsItem.classList.add("cards_item");
    const cardBack = document.createElement("img");
    cardBack.classList.add("img_back");
    cardBack.src =
      "https://via.placeholder.com/160x195/30d9c4/ffffff/?text=ADALAB";
    const cardFront = document.createElement("img");
    cardFront.classList.add("img_front", "hidden");
    cardFront.src = pokemons[numberOfCards].image;

    cardsItem.appendChild(cardBack);
    cardsItem.appendChild(cardFront);
    cardsList.appendChild(cardsItem);

    cardsItem.addEventListener("click", changeCards);
  }
  localStorage.setItem("saved_data", knowNumberOfCards());
};

//show one side or the other of the card
const changeCards = event => {
  const frontCards = event.currentTarget.querySelector(".img_front");
  const backCards = event.currentTarget.querySelector(".img_back");
  if (frontCards.classList.contains("hidden") === true) {
    frontCards.classList.remove("hidden");
    backCards.classList.add("hidden");
  } else {
    frontCards.classList.add("hidden");
    backCards.classList.remove("hidden");
  }
};
button.addEventListener("click", getDatafromApi);
getNumber();

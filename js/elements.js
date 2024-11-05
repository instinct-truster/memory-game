class Elements {
  constructor(cardsNumber) {
    this.cardsNumber = cardsNumber;
    this.playground = document.querySelector(".playground");
    this.cardsIndex = [];
    this.doubleIndex();
    this.createCard();
    this.cards = document.querySelectorAll(".card");
    this.attempts = {
      correct: 0,
      wrong: 0,
      click: 0,
    };

    this.modal = document.querySelector(".modal");
    this.modalButton = document.querySelector(".modal-button");
    this.wrong = document.querySelector(".wrong");
    this.restartButton = document.querySelector(".restart-button");
    this.timer = document.querySelector(".timer");
    this.modalTime = document.querySelector(".modal-time");

    this.restartGame();
  }

  shuffleIndexes(array) {
    return array.sort(() => Math.random() - 0.5);
  }

  doubleIndex() {
    for (let i = 1; i <= this.cardsNumber; i++) {
      i <= this.cardsNumber / 2
        ? this.cardsIndex.push(i)
        : this.cardsIndex.push(i - this.cardsNumber / 2);
    }

    console.log(this.cardsIndex);
  }

  createCard() {
    console.log(this.cardsNumber);
    this.playground.style.gridTemplateRows = `repeat(${Math.sqrt(
      this.cardsNumber
    )}, 1fr)`;
    this.playground.style.gridTemplateColumns = `repeat(${Math.sqrt(
      this.cardsNumber
    )}, 1fr)`;

    this.shuffleIndexes(this.cardsIndex).forEach((index) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.setAttribute("data-index", index);
      // name each image "icon-(number) and all need to be the same format for example .png"
      const img = document.createElement("img");
      img.src = `assets/images/icon-${index}.png`;
      card.append(img);
      this.playground.append(card);
    });
  }
  restartGame() {
    this.restartButton.onclick = () => {
      this.modal.style.cssText =
        "visibility: visible; opacity: 1; transition: opacity .5s;";
      const modalContent = this.modal.firstElementChild;
      modalContent.innerHTML =
        "<h2 class='modal-text'>Do you want to quit the game?</h2><div><button class='button yes-button'>Yes</button><button class='button cancel-button'>Cancel</button></div>";
      modalContent.querySelector(".cancel-button").onclick = () => {
        this.modal.style.cssText =
          "visibility: hidden; opacity: 0; transition: opacity .5s;";
      };
      modalContent.querySelector(".yes-button").onclick = () => {
        location.reload();
      };
    };
  }
}

export default Elements;

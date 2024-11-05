import Elements from "./elements.js";

class Controller {
  constructor(cardsNumber) {
    this.elements = new Elements(cardsNumber);
    this.prevCard;
    this.clickCard();
    this.startClock = true;
    this.time;
  }

  clickCard() {
    const { attempts, cards } = this.elements;
    cards.forEach((card) => {
      card.addEventListener("click", () => {
        this.startClock && this.setTime();
        attempts.click++;
        card.classList.add("change");
        if (attempts.click === 2) {
          cards.forEach((card) => {
            card.classList.add("pause");
            setTimeout(() => {
              card.classList.remove("pause");
            }, 1000);
          });
          if (this.prevCard.dataset.index === card.dataset.index) {
            attempts.correct++;
            card.classList.add("stop");
            this.prevCard.classList.add("stop");
          } else {
            attempts.wrong++;
            setTimeout(() => {
              card.classList.remove("change");
              this.prevCard.classList.remove("change");
            }, 1000);
          }
          attempts.click = 0;
          this.endGame(attempts);
          console.log(attempts.correct, attempts.wrong);
        } else {
          this.prevCard = card;
        }
        this.startClock = false;
      });
    });
  }
  endGame({ correct }) {
    const {
      cardsNumber,
      modal,
      modalButton,
      wrong,
      attempts,
      timer,
      modalTime,
    } = this.elements;
    if (correct === cardsNumber / 2) {
      console.log("You Won!");
      this.startClock = true;
      this.stopTime();
      modal.style.cssText = "visibility: visible; opacity: 1;";
      const timerClone = timer.cloneNode(true);
      modalTime.append(timerClone);
      wrong.textContent = attempts.wrong;
      modalButton.onclick = () => location.reload();
    } else {
      console.log("Not Yet");
    }
  }

  setTime() {
    let int = 1;
    const { timer } = this.elements;

    this.time = setInterval(() => {
      const seconds = int % 60;
      timer.children[1].innerHTML = seconds > 9 ? seconds : `0${seconds}`;
      const minutes = Math.floor(int / 60);
      timer.children[0].innerHTML = minutes > 9 ? minutes : `0${minutes}`;
      int++;
    }, 1000);
  }

  stopTime() {
    clearInterval(this.time);
  }
}

export default Controller;

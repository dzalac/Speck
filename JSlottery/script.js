import Lottery from "./modules/lottery.js";
import { politicians } from "./data/data.js";
import { folk } from "./data/data.js";

const buttonStartLottery = document.querySelector('.button-start-lottery');
const lottteryResultsEl = document.querySelector('.lottery-results');
const winningCombinationEl = document.querySelector('.winning-combination');
const winningMessageEl = document.querySelector('.winners-message');
const winnersEl = document.querySelector('.winners');

const lottery = new Lottery(politicians);

buttonStartLottery.addEventListener("click", () => {
    buttonStartLottery.disabled =true;
    buttonStartLottery.innerHTML = "Lottery drawing in progress...";

    lottteryResultsEl.getElementsByClassName.display = "none";

    lottery.startDrawing()
        .then(result => {
            winnersEl.display = "block";
            winningCombinationEl.innerHTML = `Winning combination was: ${result.winningCombination}`;
            winningMessageEl.innerHTML = 'Winners:';

            let winnersList = '';
            result.winners.forEach(player => winnersList += `<li>${player.getPlayerDetails()}</li>`);
            winnersEl.innerHTML = winnersList;


        })
        .catch(result => {
            winnersEl.display = 'none';
            winningCombinationEl.innerHTML = `Winning combination was: ${result.winningCombination}`;
            winningMessageEl.innerHTML = 'There are no winners!';
        })
        .finally(() => {
            buttonStartLottery.innerHTML = 'Start lottery drawing';
            buttonStartLottery.disabled = false;
            lottteryResultsEl.style.display = 'block';
        });

})
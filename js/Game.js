class Game {
    constructor(start) {
        this.stats = new Stats();
        this.wallet = new Wallet(start);
        this.draw = new Draw();
        this.startButton = document.getElementById('start');
        this.startButton.addEventListener('click', this.startGame.bind(this));

        this.modalLegend = document.getElementById("legend-modal");
        this.legendButton = document.getElementById("show-legend");
        this.legendButton.addEventListener('click', this.showLegend.bind(this));
        this.closeModal = document.querySelector(".modal-content .close");
        this.closeModal.addEventListener('click', this.closeLegend.bind(this));

        this.rollers = [...document.querySelectorAll('.card .roll')];
        this.spanWins = document.querySelector('.score span.win');
        this.spanWallet = document.querySelector('.panel span.wallet');
        this.infromPanel = document.querySelector('.inform');
        this.init();
    }

    init() {
        document.getElementById('input1').setAttribute('checked', true);
        this.setText();
    }

    setText(money = this.wallet.getWalletValue(), stats = this.stats) {
        this.spanWins.textContent = `${stats.getWonGames()}`;
        this.spanWallet.textContent = money + " $";

    }

    startGame() {
        const bid = document.querySelector('input[name="bid"]:checked').value;
        if (Number(bid) <= this.wallet.getWalletValue()) {
            const that = this;
            const results = [...this.draw.drawResult()];
            this.wallet.decreaseWallet(Number(bid));
            console.log(bid);
            console.log(results);


            for (let index = 0; index < this.rollers.length; index++) {
                that.rollers[index].className = "roll";
                that.rollers[index].classList.add(`opening${index+1}`);

                that.startButton.setAttribute('disabled', true);

                setTimeout(function () {
                    that.rollers[index].classList.remove(`opening${index+1}`);
                    that.rollers[index].classList.add(`goTo${results[index]}`);
                }, (index + 1) * 1000);

            }

            const result = Result.checkWinnerAndGetValue(results);
            console.log(result);

            if (result) {

                that.stats.addWon();
                setTimeout(function () {
                    that.wallet.increaseWallet(Result.getReward(result, bid));
                    that.setText(that.wallet.getWalletValue());
                    that.infromPanel.classList.add("move");
                    if (result == 1) {
                        that.infromPanel.classList.add("gold");
                    }
                }, 4010);

                setTimeout(function () {
                    that.startButton.removeAttribute('disabled');
                    that.infromPanel.classList.remove("move");
                    that.infromPanel.classList.add("");
                }, 7500);

            } else {
                setTimeout(function () {
                    that.startButton.removeAttribute('disabled');
                }, 4500);
            }


            this.setText(this.wallet.getWalletValue());
        }
    }

    showLegend() {
        this.modalLegend.style.display = "block";
    }

    closeLegend() {
        this.modalLegend.style.display = "none";
    }
}



const game = new Game(200);
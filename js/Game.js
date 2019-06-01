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
        this.lightForm = document.querySelector('.light');
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
        const that = this;

        if (Number(bid) <= this.wallet.getWalletValue()) {
            const results = [...this.draw.drawResult()];
            this.wallet.decreaseWallet(Number(bid));

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
                    if (result === 1.5) {
                        that.lightForm.classList.add('lightingBlue');
                    } else if (result === 2) {
                        that.lightForm.classList.add('lightingRed');
                    } else if (result === 3) {
                        that.lightForm.classList.add('lightingYellowRed');
                    } else if (result === 5) {
                        that.lightForm.classList.add('lightingYellowLong');
                    } else if (result === 7) {
                        that.lightForm.classList.add('lightingGreen');
                    } else if (result === 1) {
                        that.lightForm.classList.add('lightBlue');
                    } else {
                        that.lightForm.classList.add('lightingDiamond');
                    }
                }, 5000);

                setTimeout(function () {
                    that.startButton.removeAttribute('disabled');
                    that.lightForm.className = 'light';
                    that.setText(that.wallet.getWalletValue());
                }, 6000);

            } else {
                setTimeout(function () {
                    that.startButton.removeAttribute('disabled');
                    that.setText(that.wallet.getWalletValue());
                }, 4500);
            }

        } else {
            that.startButton.setAttribute('disabled', true);
            that.infromPanel.classList.add("move");
            that.infromPanel.textContent = "U don't have enought money!"
            setTimeout(function () {
                that.startButton.removeAttribute('disabled');
                that.infromPanel.className = "inform";
            }, 3010);
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
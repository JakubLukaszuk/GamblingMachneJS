class Game {
    constructor(start) {
        this.stats = new Stats();
        this.wallet = new Wallet(start);
        this.draw = new Draw();
        this.startButton = document.getElementById('start');
        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.rollers = [...document.querySelectorAll('.card .roll')];
        this.spanWins = document.querySelector('.score span.win');
        this.spanWallet = document.querySelector('.panel span.wallet');
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
            if (result) {
                that.stats.addWon();
                setTimeout(function () {
                    that.wallet.increaseWallet(Result.getReward(result, bid));
                    that.setText(that.wallet.getWalletValue());

                }, 4010);
            }

            setTimeout(function () {
                that.startButton.removeAttribute('disabled');
            }, 4500);

            this.setText(this.wallet.getWalletValue());
        }
    }
}



const game = new Game(200);
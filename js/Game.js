class Game {
    constructor(start) {
        //this.wallet = new Wallet(start);
        this.draw = new Draw();
        this.startButton = document.getElementById('start');
        this.startButton.addEventListener('click', this.startGame.bind(this));
        this.rollers = [...document.querySelectorAll('.card .roll')];
        //this.render()
    }

    startGame() {
        const that = this;
        const results = [...that.draw.drawResult()];
        console.log(results);


        for (let index = 0; index < this.rollers.length; index++) {
            that.rollers[index].className = "roll";
            that.rollers[index].classList.add(`opening${index+1}`);

            that.startButton.setAttribute('disabled', true);

            setTimeout(function () {
                that.rollers[index].classList.remove(`opening${index+1}`);
                that.rollers[index].classList.add(`goTo${results[index]}`);
            }, (index + 1) * 1000);


            // setTimeout(function () {
            //     that.rollers[index].style.animationName = `goToAnimation${results[index]}`;
            //     that.rollers[index].style.animationDuration = "1s";
            //     that.rollers[index].style.animationFillMode = "forwards";

            // }, (index + 1) * 1010);
        }

        setTimeout(function () {
            that.startButton.removeAttribute('disabled');
        }, 5000);



        // setTimeout(function () {
        //     that.rollers[1].classList.remove("opening");
        //     that.rollers[1].style.animationName = "goTo12";
        //     that.rollers[1].style.animationDuration = "1s";
        // }, 2000);




    }
}



const game = new Game();
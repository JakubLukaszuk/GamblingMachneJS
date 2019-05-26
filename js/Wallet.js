class Wallet {
    constructor(money) {
        let _money = money;
        this.getWalletValue = () => _money;

        this.checkCanPlay = (value) => {
            if (_money >= value) return true;
            return false;
        }

        this.increaseWallet = (value) => {
            if (typeof value === "number" && !isNaN(value)) {
                return _money + value;
            } else {
                console.log(typeof value);
                throw new Error("Error reload page")
            }
        }

        this.decreaseWallet = (value) => {
            if (typeof value === "number" && !isNaN(value)) {
                return _money - value;
            } else {
                console.log(typeof value);
                throw new Error("Error reload page")
            }
        }

    }

}
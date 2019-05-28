class Stats {
    constructor() {
        this.wonGames = 0;
    }

    addWon = () => this.wonGames++;
    getWonGames = () => this.wonGames;
}
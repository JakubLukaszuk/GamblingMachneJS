class Draw {
    constructor() {
        this.options = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    }

    drawResult() {
        let drawResult = [];

        for (let i = 0; i < 4; i++) {
            const index = Math.floor(Math.random() * this.options.length)
            const result = this.options[index]
            drawResult.push(result)
        }
        return drawResult;

    }
}
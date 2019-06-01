class Result {
    static getReward(result, bid) {
        if (result) return result * bid;
        else return 0;
    }

    static checkWinnerAndGetValue(drawTab) {


        const draw = Result.simplifyResults(drawTab);
        console.log(draw);

        if (draw[0] != draw[1] && draw[0] != draw[2] && draw[0] != draw[3] &&
            draw[1] != draw[2] && draw[1] != draw[3] &&
            draw[2] != draw[3]) {
            return 1.5;
        } else if (draw[0] === draw[1] && draw[0] === draw[2] && draw[0] === draw[3]) {
            const winResult = draw[0];
            console.log(draw[0]);
            if (winResult === 3) {
                return 2;
            } else if (winResult === 6) {
                return 3;
            } else if (winResult === 2) {
                return 5;
            } else if (winResult === 1) {
                return 7;
            } else if (winResult === 5) {
                return 1;
            } else if (winResult === 7) {
                return 10;
            }
        } else
            return false;
    }

    static simplifyResults(draw) {
        for (let index = 0; index < draw.length; index++) {
            if (draw[index] === 4 || draw[index] === 8 || draw[index] === 11) draw[index] = 3;
            else if (draw[index] === 10 || draw[index] === 12) draw[index] = 6;
            else if (draw[index] === 9) draw[index] = 2;
        }
        return draw;
    }
}
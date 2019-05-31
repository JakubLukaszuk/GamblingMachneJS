class Result {
    static getReward(result, bid) {
        if (result) return result * bid;
        else return 0;
    }

    static checkWinnerAndGetValue(draw) {


        if (draw[0] == 3 || draw[0] == 4 || draw[0] == 8 || draw[0] == 11) {
            if (draw[1] == 3 || draw[1] == 4 || draw[1] == 8 || draw[1] == 11) {
                if (draw[2] == 3 || draw[2] == 4 || draw[2] == 8 || draw[2] == 11) {
                    if (draw[3] === 3 || draw[3] == 4 || draw[3] == 8 || draw[3] == 11) {
                        return 2;
                    } else return false;
                } else return false;
            } else return false;

        } else if (draw[0] === 6 || draw[0] == 10 || draw[0] == 12) {
            if (draw[1] === 6 || draw[1] == 10 || draw[1] == 12) {
                if (draw[2] == 6 || draw[2] == 10 || draw[2] == 12) {
                    if (draw[3] == 6 || draw[3] == 10 || draw[3] == 12) {
                        return 3;
                    } else return false;
                } else return false;
            } else return false;

        } else if (draw[0] == 2 || draw[0] == 9) {
            if (draw[1] == 2 || draw[1] == 9) {
                if (draw[2] == 2 || draw[2] == 9) {
                    if (draw[3] == 2 || draw[3] == 9) {
                        return 5;
                    } else return false;
                } else return false;
            } else return false;

        } else if (draw[0] == draw[1] == draw[2] == draw[3]) {
            const winResult = draw[0];
            if (winResult === 1) {
                return 7;
            } else if (winResult === 5) {
                return 1;
            } else if (winResult === 7) {
                return 10;
            }
        } else if (draw[0] == 2 || draw[0] == 9 && draw[1] == 7 &&
            draw[2] == 2 || draw[2] == 9 && draw[3] == 7) {
            return 8;
        } else if (draw[0] == 7 && draw[1] == 2 || draw[1] == 9 &&
            draw[2] == 7 && draw[3] == 2 || draw[3] == 9) {
            return 8;
        } else
            return false;
    }
}
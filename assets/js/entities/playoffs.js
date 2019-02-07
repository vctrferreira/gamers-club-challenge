import Match from "./match.js";
import Championship from "./championship.js";

export default class Playoffs {
    constructor(teams) {
        this.teams = teams;
        this.brackets = [];
        this.bracketsHistory = [];
    }

    start() {
        this.bracketsRound(this.teams);
    }

    bracketsRound(teams) {
        let winners = [];
        let brackets = [];

        for (let index = 0; index < teams.length; index+=2) {
            let match = new Match(teams[index], teams[index + 1], true);

            match.start();

            brackets.push(match);
            winners.push(match.winner);
        }

        this.bracketsHistory.push(brackets);

        if (winners.length > 1) {
            this.bracketsRound(winners);
        } else {
            alert(`Time ${winners[0].name} foi o vencedor!`);
        }
    }
}

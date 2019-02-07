export default class Team {
    constructor(name) {
        this.name = name;
        this.points = 0;
        this.matchHistory = [];
    }

    addWin() {
        this.points += 1;
    }

    addMatch(match) {
        this.matchHistory.push(match);

        if (match.winner === this) {
            this.addWin();
        }
    }

    hasMatchWith(team) {
        let totalMatchHistory = this.matchHistory.length;

        for (let index = 0; index < totalMatchHistory; index++) {
            if (this.matchHistory[index].teamA === team || this.matchHistory[index].teamB === team) {
                return true;
            }
        }
        return false;
    }

    get roundsBalance() {
        return this.matchHistory.reduce((acc, match) => {
            if (match.teamA === this) {
                acc += match.scoreTeamA - match.scoreTeamB;
            } else {
                acc += match.scoreTeamB - match.scoreTeamA;
            }

            return acc;
        }, 0);
    }
}

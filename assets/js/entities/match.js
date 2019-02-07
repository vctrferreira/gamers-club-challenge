export default class Match {
    constructor (teamA, teamB, isPlayoff = false) {
        this.teamA = teamA;
        this.teamB = teamB;

        this.scoreTeamA = 0;
        this.scoreTeamB = 0;
        
        this.isPlayoff = isPlayoff;
        this.winner = undefined;

    }

    addScoreTeamA() {
        this.scoreTeamA += 1;
    }

    addScoreTeamB() {
        this.scoreTeamB += 1;
    }

    start() {
        while (this.scoreTeamA < 16 && this.scoreTeamB < 16) {
            if (Math.random() > 0.5) {
                this.addScoreTeamA();
            } else {
                this.addScoreTeamB();
            }
        }

        this.saveMatch();
    }

    saveMatch() {
        this.winner = this.scoreTeamA >= 16 ? this.teamA : this.teamB;

        this.teamA.addMatch(this);
        this.teamB.addMatch(this);
    }
}

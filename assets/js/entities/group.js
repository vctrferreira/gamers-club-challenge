import Match from './match.js';


export default class Group {
    constructor(members) {
        this.members = members;
    }

    startMatches() {
        this.members.forEach(team => {
            let opponents = this.members.filter(x => x !== team);
            
            opponents.forEach(opponent => {
                if (!team.hasMatchWith(opponent)) {
                    let match = new Match(team, opponent);

                    match.start();
                }
            });
        });
    }

    orderByPoints() {
        this.members.sort((a, b) => {
            if (a.points < b.points) {
                return 1;
            }
            if (a.points > b.points) {
                return -1;
            }
                
            return a.roundsBalance > b.roundsBalance ? -1 : 1;
        });
    }
}

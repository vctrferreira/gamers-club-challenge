import Group from './group.js';
import Playoffs from './playoffs.js';
import Team from './team.js';


export default class Championship {
    constructor(totalTeams, teamPerGroups) {
        this.totalTeams = totalTeams || 80;
        this.teamPerGroups = teamPerGroups || 5; 

        this.teams = null;
        this.groups = null;
        this.playoffTeamList = [];
        this.playoff = null;
    }

    startGroups() {
        this.createTeams();
        this.generateGroups();
    }

    createTeams() {
        this.teams = [...Array(this.totalTeams).keys()].map(x => new Team(x));
    }

    generateGroups() {
        this.groups = [...Array(this.totalTeams / this.teamPerGroups).keys()].map(groupIndex => {
            let group = this.teams.slice(this.teamPerGroups * groupIndex).slice(0, this.teamPerGroups);
            return new Group(group);
        });
    }

    generateMatches() {
        this.groups.forEach(group => {
            group.startMatches();
        });
    }

    rankingGroups() {
        this.groups.forEach(group => {
            group.orderByPoints();
        });
    }

    startPlayoffs() {
        this.groups.forEach(group => {
            this.playoffTeamList = this.playoffTeamList.concat(group.members.slice(0, 2));
        });

        this.playoffTeamList.sort(_ => {
            return Math.random > 0.5 ? 1 : -1;
        });

        this.playoff = new Playoffs(this.playoffTeamList);

        this.playoff.start();
    }
}


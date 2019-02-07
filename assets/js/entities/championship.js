import Team from './team.js';
import Group from './group.js';


export default class Championship {
    constructor(totalTeams, teamPerGroups) {
        this.totalTeams = totalTeams || 80;
        this.teamPerGroups = teamPerGroups || 5; 

        this.teams = null;
        this.groups = null;
    }

    start() {
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

    startPlayoffs() {}
}


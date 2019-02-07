import Championship from './entities/championship.js';


let championship = new Championship(80, 5);

championship.start();
championship.generateMatches();
championship.rankingGroups();

console.log(championship);

import Championship from './entities/championship.js';


let championship = new Championship(80, 5);

championship.startGroups();

championship.generateMatches();
championship.rankingGroups();

championship.startPlayoffs();

customElements.define('championship-ui', class extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        shadowRoot.innerHTML = `
        <style></style>
        <slot name="groups">
        </slot>
        <slot name="playoffs">
        </slot>
      `;
    }
});


customElements.define('groups-ui', class extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });

        let data = `
            <style>
                h2 {
                    text-align: center;
                }

                .row {
                    display: flex;
                    flex-wrap: wrap;
                }

                .table {
                    font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                    border-collapse: collapse;
                    width: 300px;
                    margin: 10px 30px;
                  }
                  
                  .table td, .table th {
                    border: 1px solid #ddd;
                    padding: 8px;
                  }
                  
                  .table tr:nth-child(even){background-color: #f2f2f2;}
                  
                  .table tr:hover {background-color: #ddd;}
                  
                  .table th {
                    padding-top: 12px;
                    padding-bottom: 12px;
                    text-align: left;
                    background-color: black;
                    color: white;
                  }

                  .table caption {
                    padding-top: 12px;
                    padding-bottom: 12px;                      
                  }
            </style>
            <h2>Fase de Grupos</h2>
        `;
        data += '<div class="row">';

        for (const group of championship.groups) {
            data += `
            <table class="table">
                <caption>Grupo ${championship.groups.indexOf(group) + 1}</caption>
                <thead class="thead-dark">
                    <tr>
                        <th>Nome</th>
                        <th>Pontos</th>
                        <th>Saldo de rounds</th>
                    </tr>
                </thead>
                <tbody>
            `;

            for (const team of group.members) {
                data += `
                <tr>
                    <td> Time ${team.name} </td>
                    <td> ${team.points} </td>
                    <td> ${team.roundsBalance} </td>
                </tr>`;
            }
            data += '</tbody></table>';
        }
        data += '</div>';
        shadowRoot.innerHTML = data;
    }
});
customElements.define('playoffs-ui', class extends HTMLElement {
    constructor() {
        super();

        const shadowRoot = this.attachShadow({ mode: 'open' });
        let data = `
        <style>
            h2 {
                text-align: center;
            }

            .table {
                font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
                border-collapse: collapse;
                width: 200px;
                margin: 10px 30px;
              }
              
              .table td, .table th {
                border: 1px solid #ddd;
                padding: 8px;
              }
              
              .table tr:nth-child(even){background-color: #f2f2f2;}
              
              .table tr:hover {background-color: #ddd;}
              
              .table th {
                padding-top: 12px;
                padding-bottom: 12px;
                text-align: left;
                background-color: black;
                color: white;
              }
              .container div {
                  height: fit-content;
              }
        </style>

        <h2>Playoffs</h2>
        <div class="container">
        `;
        for (const phase of championship.playoff.bracketsHistory) {
            data += '<div style="display: inline-block;">';
            for (const match of phase) {
                data += `
                    <table class="table">
                        <tr>
                            <td>Time ${match.teamA.name}</td>
                            <td>${match.scoreTeamA}</td>
                        </tr>
                        <tr>
                            <td>Time ${match.teamB.name}</td>
                            <td>${match.scoreTeamB}</td>
                        </tr>
                    </table>
                `;
            }
            data += '</div>';
        }
        data += '</div>';

        shadowRoot.innerHTML = data;
    }
});

console.log(championship);

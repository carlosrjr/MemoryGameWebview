let content = document.getElementById("content");
let players_table = document.getElementById("players_table");

function init() {
    let scores = localStorage.getItem("scores");
    if(!scores) content.textContent = "Nenhum rank!"; 
    else buildRank(JSON.parse(scores));
}

let sortScores = (a, b) => (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : (a.errors > b.errors) ? 1 : (a.errors < b.errors) ? -1 : 0;

function buildRank(scores) {
    Array.from(scores)
        .map(score => {
            score["points"] = parseInt(score["points"]);
            score["errors"] = parseInt(score["errors"]);
            return score;
        })
        .sort(sortScores)
        .map((score, index) => {
            var tr = document.createElement('tr');   
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');

            td1.textContent = index+1;
            td2.textContent = score["name"];
            td3.textContent = score["errors"];
            td4.textContent = score["points"];

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            players_table.appendChild(tr);
        });
}
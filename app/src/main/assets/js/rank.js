const content = document.getElementById("content");
const players_table = document.getElementById("players_table");
const no_content = document.getElementById("no_content");
const sort_type = document.getElementById("sort_type");

let sortByPoints = (a, b) => (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : (a.errors > b.errors) ? 1 : (a.errors < b.errors) ? -1 : 0;
let sortByErros = (a, b) => (a.errors > b.errors) ? -1 : (a.errors < b.errors) ? 1 : (a.points > b.points) ? -1 : (a.points < b.points) ? 1 : 0;

function init(sortArray = sortByPoints) {
    let scores = localStorage.getItem("scores");
    if(!scores) {
        content.classList.add("hide");
        no_content.classList.remove("hide"); 
    } else buildRank(JSON.parse(scores), sortArray);
}


function buildRank(scores, sortArray) {
    Array.from(scores)
        .map(score => {
            score["points"] = parseInt(score["points"]);
            score["errors"] = parseInt(score["errors"]);
            return score;
        })
        .sort(sortArray)
        .map((score, index) => {
            var tr = document.createElement('tr');   
            var td1 = document.createElement('td');
            var td2 = document.createElement('td');
            var td3 = document.createElement('td');
            var td4 = document.createElement('td');

            td1.textContent = index+1;
            td2.textContent = score["name"].length === 0 ? "Não informado" : score["name"];
            td3.textContent = score["errors"];
            td4.textContent = score["points"];

            tr.appendChild(td1);
            tr.appendChild(td2);
            tr.appendChild(td3);
            tr.appendChild(td4);

            players_table.appendChild(tr);
        });
}

function clearRank() {
    localStorage.clear();
    players_table.innerHTML = "";
    init();
}

function changeSort() {
    players_table.innerHTML = "";
    let func = (sort_type.value === "errors") ? sortByErros : sortByPoints;
    init(func)
}
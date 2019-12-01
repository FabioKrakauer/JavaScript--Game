function loadGame(){
    constructMap(document.getElementById("gameBlock"), "9x9");
    setPlayerPosition("11");
    stopObjectives();
    setGameOn(true)
}
let objectivesTime = setInterval(() => {
        addObjective();
    }, 1 * 1000);

function stopObjectives(){
    setTimeout(() => {
        setGameOn(false);
        clearInterval(objectivesTime);
        document.getElementById("text").innerHTML = "Jogo finalizado! Você capturou " + getObjectivesCaptured() + " objetivo(s)!";
    }, 10 * 1000);
}

document.getElementById("body").addEventListener('keydown', (event) => requestMove(event));
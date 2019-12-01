let blocks = [];
let currentPosition = 11;
let objectives = 0;
let gameOn = false;
function constructMap(element, size) { 
    let lines = size.split("x")[0];
    let columns = size.split("x")[1];
    for(let line = 1; line <= lines; line++){
        for(let column = 1; column <= columns; column++){
            element.innerHTML += '<div class="block" id="'+line+column+'"></div>';
            if(column == columns){
                element.innerHTML += '<br/>';
            }
            blocks.push(line.toString() + column.toString());
        }
    }
}
function setGameOn(status){
    gameOn = status;
}
function getCurrentPosition(){
    return currentPosition;
}
function getBlock(position)  {
    return document.getElementById(position);
}
function setPlayerPosition(position) {
    getBlock(currentPosition).classList.remove("bg-secondary");
    getBlock(position).classList.add("bg-secondary");
    currentPosition = position;
}
function addObjectivePosition(position) { 
    getBlock(position).classList.add("bg-success");
}
function removeObjective(position){
    getBlock(position).classList.remove("bg-success");
}
function calculateNewPosition(command) {
    let position = {
        line: parseInt(getCurrentPosition().split('')[0]),
        column: parseInt(getCurrentPosition().split('')[1])
    };
    switch(command){
        case "up":
            position.line -= 1;
            break;
        case "down":
            position.line += 1;
            break;
        case "left":
            position.column -= 1;
            break;
        case "right":
            position.column += 1;
            break;
    }
    return position.line.toString() + position.column.toString();
}
function requestMove(event) {
    let newPostion = getCurrentPosition();
    const acceptMoviments = {
        ArrowUp(){
            newPostion = calculateNewPosition("up");
            if(canMove(newPostion)){
                movePlayer(newPostion);
            }
        },
        ArrowDown(){
            newPostion = calculateNewPosition("down");
            if(canMove(newPostion)){
                movePlayer(newPostion);
            }
        },
        ArrowRight(){
            newPostion = calculateNewPosition("right");
            if(canMove(newPostion)){
                movePlayer(newPostion);
            }
        },
        ArrowLeft(){
            newPostion = calculateNewPosition("left");
            if(canMove(newPostion)){
                movePlayer(newPostion);
            }
        },
    };
    let key = event.key;
    if(acceptMoviments[key]){
        acceptMoviments[key]();
    }
}

function canMove(newPosition) {
    if(!gameOn){
        return false;
    }
    if(blocks.includes(newPosition)){
        return true;
    }
    return false;
}
function movePlayer(position){
    setPlayerPosition(position);
    verifyObjective(position)
}
function isObjective(position){
    return getBlock(position).classList.contains("bg-success");
}
function verifyObjective(position) {
    if(isObjective(position)){
        addCapturedObjective(1);
        removeObjective(position);
    }
}
function ocupatedBlock(position){
    if(getBlock(position).classList.contains("bg-success")){
        return true;
    }
    if(getBlock(position).classList.contains("bg-secondary")){
        return true;
    }
    return false;
}
function randomBlock(){
    let line = Math.floor(Math.random() * 9 + 1);
    let column = Math.floor(Math.random() * 10 + 1);
    return line.toString() + column.toString();

}
function addCapturedObjective(objects){
    objectives += objects;
    document.getElementById("text").innerHTML = "Objetos Capturados: " + objectives;
}
function addObjective(){
    let block = randomBlock();
    if(ocupatedBlock(block)){
        block = randomBlock();
    }
    addObjectivePosition(block);
}
function getObjectivesCaptured() {
    return objectives;
}
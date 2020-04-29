// 888b    888 8888888 .d8888b.  888    d8P    .d8888b.        d8888  .d8888b.  8888888888 
// 8888b   888   888  d88P  Y88b 888   d8P    d88P  Y88b      d88888 d88P  Y88b 888        
// 88888b  888   888  888    888 888  d8P     888    888     d88P888 888    888 888        
// 888Y88b 888   888  888        888d88K      888           d88P 888 888        8888888    
// 888 Y88b888   888  888        8888888b     888          d88P  888 888  88888 888        
// 888  Y88888   888  888    888 888  Y88b    888    888  d88P   888 888    888 888        
// 888   Y8888   888  Y88b  d88P 888   Y88b   Y88b  d88P d8888888888 Y88b  d88P 888        
// 888    Y888 8888888 "Y8888P"  888    Y88b   "Y8888P" d88P     888  "Y8888P88 8888888888 
// Feito por Nicolas Oliveira em Abril de 2020
// [][][][] |
// [][][][] | Aqui se obtém um plano cartesiano onde começa em (0,0) e termina em (n,m)
// [][][][] | onde n e m é literalmente a posição final em pixels do canvas = canvas.width, canvas.height
// [][][][] |
// -> render é o objeto que renderiza pela tag canvas
// -> size é o tamanho do quadrado -1 pixel para a borda
// é definido pelo tamanho do canvas dividido pelas colunas menos um pixel para a borda
// -> cell é a constante do tamanho da celula, ele que irá preencher o espaço do quadrado
// -> row são as linhas
// -> col são as colunas
// -> é necessário que os números sejam ímpares para que a snake spawne em um centro
// a cobra se locomove devido a multiplicação entre a constante cell e sua posição relativa
// render.fillRect(35*0,35*0,34,34) -> renderiza literalmente um quadrado com borda de 1 px no canto superior
const canvas = document.getElementById('game');
const render = canvas.getContext('2d');

const cell = 35;
const row = 15;
const col = 15;

canvas.height = row*cell;
canvas.width = col*cell;

const size = cell - 1;

let dir = {
    x: 0,
    y: 0
};

let score = 0;

let tail = [];
let start = false;
let key = 4;
let visible = false;

function getScore(){
    let text = document.getElementById('score');
    text.innerHTML = `Score: ${score}`;
}
function renderRtc(x,y){
    render.fillRect(cell*x,cell*y,size,size);
}
function clearRtc(oldx, oldy){
    render.clearRect(cell*oldx,cell*oldy,size,size);
}
function clearAll(){
    render.clearRect(0,0, canvas.width, canvas.height);
}
function logScreen() {
    const arrowStrings = [
        'up ↑',
        'down ↓',
        'right →',
        'left ←',
        'none'
    ];
    function dirTxt(text) {
        var container = document.getElementById('arrow');
        var dirElement = document.createElement('p');
        dirElement.innerHTML = text;
        container.appendChild(dirElement);
    }
    function writeArrowTxt(text){
        var container = document.getElementById('arrow');
        container.innerHTML = text;
    }
    function menuLog(){
        if(visible){
            let title = 'Dev Tools';
            writeArrowTxt(title);
            dirTxt(`Dir: ${arrowStrings[key]}`);
            dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
            dirTxt(`<br>Snake`);
            for(n in tail){
                if(n < 5)
                    dirTxt(`{${tail[n].x},${tail[n].y}}`);
                if(n > 5){
                    dirTxt(`{...}`);
                    break;
                }   
            }
            dirTxt(`length: ${tail.length}`);
            dirTxt(`<br>Apple`);
            dirTxt(`{${dirApple.x},${dirApple.y}}`);
        }
    }
    menuLog(4);
    document.addEventListener('keydown', function(e){
        switch (e.key) {
            case "ArrowUp":
                key = 0;
                menuLog();
                break;
            case "ArrowDown":
                key = 1;
                menuLog();
                break;
            case "ArrowRight":
                key = 2;
                menuLog();
                break;
            case "ArrowLeft":
                key = 3;
                menuLog();
                break;
            case "z":
                visible = !visible;
                document.getElementById('arrow').innerHTML = "";
            default:
                key = 4;
                menuLog();
                break;
        }
    });
}
function reset(){
    start = false;
    score = 0;
    getScore();
    clearAll();
    dirApple = apple();
    tail = [];
    dir = {
        x: 0,
        y: 0
    }
    spawnSnake(tail);
    document.getElementById('arrow').innerHTML = "";
    logScreen();
}

function apple() {
    render.fillStyle = 'red';
    function randomCell(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let posicApple = {
        x: randomCell(0,col-1),
        y: randomCell(0,row-1)
    }
    renderRtc(posicApple.x, posicApple.y);
    return posicApple;
}
let dirApple = apple();

function controllerDir(){
    document.addEventListener('keydown', function(e){
        switch (e.key) {
            case "ArrowRight":
                if(dir.x != -1){
                    dir.x = 1;
                    dir.y = 0;
                }
                break;
            case "ArrowLeft":
                if(start && dir.x != 1){
                    dir.x = -1;
                    dir.y = 0;
                }
                break;
            case "ArrowUp":
                if(dir.y != 1){
                    dir.x = 0;
                    dir.y = -1;
                }
                break;
            case "ArrowDown":
                if(dir.y != -1){
                    dir.x = 0;
                    dir.y = 1;
                }
                break;
        }
    });
}
controllerDir();

function spawnSnake(tail){
    render.fillStyle = 'green';
    for(let t = 0; t < 3; t++){
        tail.push({
            x: (col - 1) / 2 - t,
            y: (row - 1) / 2
        });
        renderRtc(tail[t].x,tail[0].y);
    }
}    

function snake() {
    spawnSnake(tail);
    function increment(){
        render.fillStyle = 'green';
        tail.push({
            x: tail[tail.length -1].x,
            y: tail[tail.length -1].y
        });
        score++;
    }
    function isBody(x,y){
        for(t in tail){
            if(t > 0)
                if(x === tail[t].x && y === tail[t].y)
                    return true;
        }
        return false;
    }
    function motion(){
        start = true;
        let end = [{
            x: tail[tail.length - 1].x,
            y: tail[tail.length - 1].y
        }];
        for (let t = tail.length - 1; t > 0; t--) {
            tail[t].x = tail[t - 1].x;
            tail[t].y = tail[t - 1].y;
        }
        tail[0].x += dir.x;
        tail[0].y += dir.y;
        for(t in tail){
            renderRtc(tail[t].x,tail[t].y);
        }
        clearRtc(end[0].x,end[0].y)
    }

    function animation(){
        setTimeout(()=>{
            if(tail[0].x < 0 || tail[0].y < 0 || tail[0].y*cell === canvas.height || tail[0].x*cell === canvas.width){
                clearTimeout(animation);
                reset();
            }
            if(isBody(tail[0].x,tail[0].y)){
                reset();
            }
            if(dir.x !== 0 || dir.y !== 0){
                motion();
            }
            if(tail[0].x === dirApple.x && tail[0].y === dirApple.y){
                dirApple = apple();
                increment();
                getScore();
            }
            setTimeout(animation,1000/15);
        }, 1000/10)       
    }
    setTimeout(animation,1000/15);

}
snake();
logScreen();

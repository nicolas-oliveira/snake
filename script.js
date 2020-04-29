// [][][][] |
// [][][][] | row é definido pela quantidade de quadrados do quadrado canvas
// [][][][] |
// -> render é o objeto que renderiza pela tag canvas
// -> pixels é o tamanho do container do canvas em pixels
// -> size é o tamanho do quadrado 
// é definido pelo tamanho do canvas dividido pelas colunas menos um pixel para a borda
// -> cell é a constante da linha da celula, ele que irá preencher o espaço do quadrado
// na posição adequada.
// Dessa forma as posições no jogo são definidos de 0 até 14 totalizando 15 colunas ou row
// para obter a renderização multiplica-se cell*(posição) que se necessita.
const canvas = document.getElementById('game');
const render = canvas.getContext('2d');

const pixels = 525;
const row = 15;

canvas.height = pixels;
canvas.width = pixels;

const size = (pixels / row) - 1;
const cell = pixels / row;

const spawn = 5;

let dir = {
    x: 0,
    y: 0
};

let score = 0;
let tail = [];

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
    let visible = true;
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
    function menuLog(t){
        if(visible){
            let title = 'Dev Tools';
            writeArrowTxt(title);
            dirTxt(`Dir: ${arrowStrings[t]}`);
            dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
            dirTxt(`<br>Snake`);
            for(n in tail){
                dirTxt(`{${tail[n].x},${tail[n].y}}`);
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
                menuLog(0);
                break;
            case "ArrowDown":
                menuLog(1);
                break;
            case "ArrowRight":
                menuLog(2);

                break;
            case "ArrowLeft":
                menuLog(3);
                break;
            case "z":
                if(visible){
                    visible = false;
                    document.getElementById('arrow').innerHTML = "";
                }else{
                    visible = true;
                }
            default:
                menuLog(4);
                break;
        }
    });
}
function reset(){
    clearAll();
    grade();
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
function grade() {
    for(let i = 0; i < row; i++)
        for(let j = 0; j < row; j++){
            render.fillStyle = 'rgba(0, 0, 0, 0.2)';
            renderRtc(i,j);
        }    
}
grade();

function apple() {
    render.fillStyle = 'red';
    function randomCell(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
    let posicApple = {
        x: randomCell(0,row-1),
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
                dir.x = 1;
                dir.y = 0;
                break;
            case "ArrowUp":
                dir.x = 0;
                dir.y = -1;
                break;
            case "ArrowDown":
                dir.x = 0;
                dir.y = 1;
                break;
            case "ArrowLeft":
                dir.x = -1;
                dir.y = 0;
                break;
            default:
                dir.x = 0;
                dir.y = 0;
                break;
        }
    });
}
controllerDir();

function spawnSnake(tail){
    render.fillStyle = 'green';
    for(let t = 0; t < 1; t++){
        tail.push({
            x: (row - 1) / 2 - t,
            y: (row - 1) / 2
        });
        renderRtc(tail[t].x,tail[0].y);
    }
}    

function snake() {

    spawnSnake(tail);
    function limit(){
        if(tail[0].x > (row-1) || tail[0].x < 0 || tail[0].y > (row-1) || tail[0].y < 0){
            return true;
        }else{
            return false;
        }
    }
    function motion(){
        if(dir.x === 1){
            if(limit()){
                reset();
            }else{
                for(t in tail){
                    tail.push({
                        x: tail[t].x++,
                        y: tail[t].y
                    });
                    tail.pop();
    
                    clearRtc(tail[t].x-1,tail[t].y);
                    renderRtc(tail[t].x,tail[t].y);
                }
            }
        }
        if(dir.x === -1){
            if(limit()){
                reset();
            }else{
                for(t in tail){
                    tail.push({
                        x: tail[t].x--,
                        y: tail[t].y
                    });
                    tail.pop();
                    clearRtc(tail[t].x+1,tail[t].y);                    
                    renderRtc(tail[t].x,tail[t].y);
                }

            }
        }
        if(dir.y === -1){
            if(limit()){
                reset();
            }else{
                for(t in tail){
                    tail.push({
                        x: tail[t].x,
                        y: tail[t].y--
                    });
                    tail.pop();
    
                    clearRtc(tail[t].x,tail[t].y+1);
                    renderRtc(tail[t].x,tail[t].y);
                }

            }
        }
        if(dir.y === 1){
            if(limit()){
                reset();
            }else{
                for(t in tail){
                    tail.push({
                        x: tail[t].x,
                        y: tail[t].y++
                    });
                    tail.pop();
    
                    clearRtc(tail[t].x,tail[t].y-1);
                    renderRtc(tail[t].x,tail[t].y);
                }
            }
        }

    }

    document.addEventListener('keydown', () => {
        if(dir.x !== 0 || dir.y !== 0){//right
            motion();
        } 
    });
    
}
snake();
render.fillStyle = 'blue';

logScreen();
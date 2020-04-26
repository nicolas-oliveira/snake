// [][][][] |
// [][][][] | row é definido pela quantidade de quadrados
// [][][][] |
// -> render é o que renderiza pelo canvas
// -> pixels é o tamanho do container do canvas em pixels
// -> size é o tamanho do quadrado que é definido pelo tamanho do canvas 
// divido pelas colunas menos um pixel para a borda
// -> posic é a posição em si, pois para cada quadrado o seu próprio tamanho 
// conta na posição portanto a primeira posição é 0,0 e a ultima 490,490
const canvas = document.getElementById('game');
const render = canvas.getContext('2d');

const pixels = 525;
const row = 15;

canvas.height = pixels;
canvas.width = pixels;

const size = (pixels / row) - 1;
const posic = pixels / row;

const spawn = 5;

function grade() {
    for(let i = 0; i < 15; i++)
        for(let j = 0; j < 15; j++){
            render.fillStyle = 'rgba(0, 0, 0, 0.2)';
            render.fillRect(posic*i,posic*j,size,size);
        }
            
}
grade();
    

function apple() {
    render.fillStyle = 'red';
    spawnApple();
}
apple();


function spawnApple() {
    function randomPosic(min,max){
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    function renderSpawn(x, y){
        render.fillRect(posic*x,posic*y,size,size);
    }
    let x = randomPosic(0,row-1);
    let y = randomPosic(0,row-1);
    
    renderSpawn(x,y);
}
let dir = {
    x: 0,
    y: 0
};

function controllerDir(){
    document.addEventListener('keydown', function(e){
        switch (e.key) {
            case "ArrowUp":
                dir.x = 0;
                dir.y = 1;
                break;
            case "ArrowDown":
                dir.x = 0;
                dir.y = -1;
                break;
            case "ArrowRight":
                dir.x = 1;
                dir.y = 0;
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

function logScreen() {
    const arrowStrings = [
        'up ↑',
        'down ↓',
        'left ←',
        'right →',
        ' '
    ];
    
    function dirTxt(text) {
        var container = document.getElementById('arrow');
        var dirElement = document.createElement('p');
        dirElement.innerHTML = text;
        container.appendChild(dirElement);
    }

    dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);

    function writeArrowTxt(text){
        var container = document.getElementById('arrow');
        container.innerHTML = text;
    }

    document.addEventListener('keydown', function(e){
        switch (e.key) {
            case "ArrowUp":
                writeArrowTxt(arrowStrings[0]);
                dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
                break;
            case "ArrowDown":
                writeArrowTxt(arrowStrings[1]);
                dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
                break;
            case "ArrowRight":
                writeArrowTxt(arrowStrings[3]);
                dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
                break;
            case "ArrowLeft":
                writeArrowTxt(arrowStrings[2]);
                dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
                break;
            default:
                writeArrowTxt(arrowStrings[4]);
                dirTxt(`x: ${dir.x}<br>y: ${dir.y}`);
                break;
        }
    });
}
logScreen();

function spawnSnake(){
    render.fillStyle = 'green';
    render.fillRect(posic*5,posic*5,size,size);
}

let points = 0;

function snake() {
    spawnSnake();

    function renderPosic(x,y,oldX,oldY){
        render.fillStyle = 'green';
        render.clearRect(posic*oldX,posic*oldY,size,size);
        render.fillRect(posic*x,posic*y,size,size);
    }

    function motion() {
        let head = {
            x: spawn,
            y: spawn
        };

        let tail = {
            x: spawn - points,
            y: spawn - points
        };

        function update(){
            if(dir.x !== 0 && dir.y !== 0){
                tail.x = head.x;
                tail.y = head.y;
            }
        }
        document.addEventListener('keydown', () => {
            if(dir.x === 1){//right
                head.x++;
                update();
                renderPosic(head.x,head.y,tail.x,tail.y);
            }
            if(dir.x === -1){//left
                head.x--;
                update();
                renderPosic(head.x,head.y,tail.x,tail.y);
            }
            if(dir.y === 1){//up
                head.y--;
                update();
                renderPosic(head.x,head.y,tail.x,tail.y);
            }
            if(dir.y === -1){//down
                head.y++;
                update();
                renderPosic(head.x,head.y,tail.x,tail.y);
            }
        });
    }
    motion();
}
snake();


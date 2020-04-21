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

function grade() {
    for(let i = 0; i < 15; i++)
        for(let j = 0; j < 15; j++){
            render.fillStyle = 'rgba(0, 0, 0, 0.2)';
            render.fillRect(posic*i,posic*j,size,size);
        }
            
}
grade();

function showArrowsScreen() {
    const arrowStrings = [
        'up ↑',
        'down ↓',
        'left ←',
        'right →'
    ];

    function writeArrowTxt(text){
        var container = document.getElementById('arrow');
        container.innerHTML = text;
    }

    document.addEventListener('keydown', function(e){
        switch (e.key) {
            case "ArrowUp":
                writeArrowTxt(arrowStrings[0]);
                break;
            case "ArrowDown":
                writeArrowTxt(arrowStrings[1]);
                break;
            case "ArrowLeft":
                writeArrowTxt(arrowStrings[2]);
                break;
            case "ArrowRight":
                writeArrowTxt(arrowStrings[3]);
                break;
            default:
                break;
        }
    });
}
showArrowsScreen();

function spawnSnake(){
    render.fillStyle = 'green';
    render.fillRect(posic*5,posic*7,size,size);
    render.fillRect(posic*6,posic*7,size,size);
    render.fillRect(posic*7,posic*7,size,size);
}

let points = 2;

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

function apple() {
    render.fillStyle = 'red';
    spawnApple();
}
apple();

function snake() {
    spawnSnake();
    function body(j){
        render.fillStyle = 'white';
        render.clearRect(posic*(j-1),posic*7,size,size);
        render.fillRect(posic*(j),posic*7,size,size);
        
        for(let n = 0; n < points; n++)
            render.fillRect(posic*(++j),posic*7,size,size);
    }

    function motion() {
        for (var num = 5; num < (row - points); num++) {
          setTimeout((j) => {
            body(j);
          }, num * 170, num);
        }
    }
    motion();
}
snake();


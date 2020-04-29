//Cria uma grade preenchendo todos os espaços
        // for (var num = 5; num < (row - points); num++) {

                // render.fillStyle = 'white';
                // render.clearRect(posic*(x-1),posic*7,size,size);
                // render.fillRect(posic*(x),posic*7,size,size);
                
                // for(let n = 0; n < points; n++)
                //     render.fillRect(posic*(++j),posic*7,size,size);

        // }


        // function renderPosic(x,y,oldX,oldY){
        //         render.fillStyle = 'green';
        //         render.clearRect(posic*oldX,posic*oldY,size,size);
        //         render.fillRect(posic*x,posic*y,size,size);
        //     }
        

        // function motion() {
        //         let head = {
        //             x: spawn,
        //             y: spawn
        //         };
        
        //         let tail = {
        //             x: spawn - points,
        //             y: spawn - points
        //         };
        
        //         function update(){
        //             if(dir.x !== 0 && dir.y !== 0){
        //                 tail.x = head.x;
        //                 tail.y = head.y;
        //             }
        //         }
        //         document.addEventListener('keydown', () => {
        //             if(dir.x === 1){//right
        //                 head.x++;
        //                 update();
        //                 renderPosic(head.x,head.y,tail.x,tail.y);
        //             }
        //             if(dir.x === -1){//left
        //                 head.x--;
        //                 update();
        //                 renderPosic(head.x,head.y,tail.x,tail.y);
        //             }
        //             if(dir.y === 1){//up
        //                 head.y--;
        //                 update();
        //                 renderPosic(head.x,head.y,tail.x,tail.y);
        //             }
        //             if(dir.y === -1){//down
        //                 head.y++;
        //                 update();
        //                 renderPosic(head.x,head.y,tail.x,tail.y);
        //             }
        //         });
        //     }
        //     motion();
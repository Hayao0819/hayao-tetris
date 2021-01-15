
//罫線をひく
createLine();
function createLine() {
    if (Line){
        //開始
        context.beginPath();

        //縦線を引く
        for (var _x=0; _x<canvas.width/block.width; _x++){
            context.moveTo(_x*block.width,0)
            context.lineTo(_x*block.width,canvas.height)
        }

        //縦線を引く
        for (var _y=0; _y<canvas.height/block.height; _y++){
            context.moveTo(0,_y*block.height)
            context.lineTo(canvas.width,_y*block.height)
        }

        //終了
        context.closePath();

        //現在のパスを輪郭表示
        // 2回実行しないと一部が薄い（なんで？）
        context.stroke();
        context.stroke();
    }
}

//ブロックを作成 
function createBlock(x,y,color) {
    context.fillStyle=color;
    context.fillRect(x,y,block.width,block.height);
    document.getElementById("canvas_wrapper").appendChild(canvas);
}



// キーボードの処理
document.addEventListener("keydown",
    event => {
        //console.log(event.code);
        switch(event.code){
            case "ArrowUp":
                moveConvex("up");
                break;
            case "ArrowDown":
                moveConvex("down");
                break;
            case "ArrowRight":
                moveConvex("right");
                break;
            case "ArrowLeft":
                moveConvex("left");
                break;
            case "KeyR":
                refreshScreen();
                break;
            case "KeyS":
                roteteConvex();
                break;
        }
    }
);


//画面を再描写
function refreshScreen(){
    
    var _x_list=x_list;
    var _y_list=y_list;
    var _color_list=color_list;
    var _direction_list = direction_list;
    

    x_list= new Array();
    y_list= new Array();
    color_list = new Array();
    direction_list = new Array();


    //凸ブロックを再描写
    var _convex_list=convex_list;
    convex_list= new Array();
    for (var i = 0; i < _convex_list.length; i++) {
        createConvex(_x_list[i],_y_list[i],_color_list[i],_direction_list[i]);
    }

    //罫線を再描写
    createLine();
}

WriteLog("Loaded core.js")

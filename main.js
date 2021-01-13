// 初期化
var canvas = document.createElement("canvas");
canvas.classList=(null);
canvas.style.backgroundColor = "gray";
var context = canvas.getContext('2d');

// ブロックの設定
var block={
    height: 40,
    width: 40,
    color: null,
}

//現在の設定
var now_x=null;
var now_y=null;
var now_color=null;

// 全ての図形の座標の値と色を保存
var x_list= new Array();
var y_list= new Array();
var color_list = new Array();

// 座標配列のconvexが該当する番号
var convex_list= new Array();

// 色の種類
colors=[
    "blue",
    "red",
    "black",
    "green",
    "pink",
    "skyblue"
]

// 範囲の設定
canvas.width=640;
canvas.height=480;

//罫線をひく
function createLine() {
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
    context.stroke();
}

//ブロックを作成 
function createBlock(x,y,color) {
    context.fillStyle=color;
    context.fillRect(x,y,block.width,block.height);
    document.getElementById("canvas_wrapper").appendChild(canvas);
}

// 凸ブロックを作成
function createConvex(x,y,color) {
    x_list.push(x);
    y_list.push(y);
    convex_list.push(x_list.length);

    now_x=x
    now_y=y
    if ( color == null ) {
        if (block.color != null) {
            var color = block.color;
        } else {
            //色をランダムで取得
            var color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    now_color=color
    color_list.push(color)

    createBlock(x+block.width,y,color);
    createBlock(x+block.width,y+block.height,color);
    createBlock(x+block.width * 2,y+block.height,color);
    createBlock(x,y+block.height,color);

    console.log(x_list);
    console.log(y_list);
    console.log(color_list);
    console.log(convex_list);
}

//凸ブロックを削除
function removeConvex(x,y){
    x_list.pop();
    y_list.pop();
    color_list.pop();
    convex_list.pop();

    context.clearRect(x+block.width,y,block.width,block.height);
    context.clearRect(x,y+block.height,block.width*3,block.height);
}

//凸ブロックを移動
function moveConvex(direction) {
    refreshScreen();
    removeConvex(now_x,now_y)
   switch(direction){
        case "up":
            createConvex(now_x,now_y-block.height,now_color);
            break;
        case "down":
            createConvex(now_x,now_y+block.height,now_color);
            break;
        case "right":
            createConvex(now_x+block.height,now_y,now_color);
            break;
        case "left":
            createConvex(now_x-block.height,now_y,now_color);
            break;
   }
}

// キーボードの処理
document.addEventListener("keydown",
    event => {
        console.log(event.code);
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
        }
    }
);


//画面を再描写
function refreshScreen(){
    var _x_list=x_list;
    var _y_list=y_list;
    var _color_list=color_list;

    x_list= new Array();
    y_list= new Array();
    color_list = new Array();
    

    //凸ブロックを再描写
    var _convex_list=convex_list;
    convex_list= new Array();
    for (var i = 0; i < _convex_list.length; i++) {
        createConvex(_x_list[i],_y_list[i],_color_list[i])
    }

    //罫線を再描写
    //createLine();
}



createConvex(0,0)


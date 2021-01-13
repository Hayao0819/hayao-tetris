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
var now_x=null
var now_y=null
var now_color=null

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

//ブロックを作成 
function createBlock(x,y,color) {
    context.fillStyle=color;
    context.fillRect(x,y,block.width,block.height);
    document.getElementById("canvas_wrapper").appendChild(canvas);
}

function createConvex(x,y,color) {
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

    createBlock(x+block.width,y,color);
    createBlock(x+block.width,y+block.height,color);
    createBlock(x+block.width * 2,y+block.height,color);
    createBlock(x,y+block.height,color);
}

function removeConvex(x,y){
    context.clearRect(x+block.width,y,block.width,block.height);
    context.clearRect(x,y+block.height,block.width*3,block.height);
}

function moveConvex(direction) {
    removeConvex(now_x,now_y)
    if ( direction == "up" ) {
        createConvex(now_x,now_y-block.height,now_color)
    } else {
        createConvex(now_x,now_y+block.height,now_color)
    }
}

// キーボードの処理
document.addEventListener("keydown",
    event => {
        console.log(event.code);
        switch(event.code){
            case "ArrowUp":
                moveConvex("up")
                break;
            case "ArrowDown":
                moveConvex("down")
                break;
        }
    }
);

createConvex(100,300)



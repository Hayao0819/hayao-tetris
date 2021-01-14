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

// 罫線を表示
//Line = true;
Line = false;

WriteLog("Loaded config.js")
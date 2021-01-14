#!/usr/bin/env bash

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


    WriteLog("Created convex (" + x + " " + y + ")");
}

//凸ブロックを削除
function removeConvex(x,y){
    x_list.pop();
    y_list.pop();
    color_list.pop();
    convex_list.pop();

    context.clearRect(x+block.width,y,block.width,block.height);
    context.clearRect(x,y+block.height,block.width*3,block.height);

    WriteLog("Removed convex (" + x + " " + y + ")");
}

//凸ブロックを移動
function moveConvex(direction) {
    WriteLog("====== Move Convex =====")
    removeConvex(now_x,now_y)
    refreshScreen();
    var move_x, move_y
   switch(direction){
        case "up":
            move_x = now_x;
            move_y = now_y - block.height;
            break;
        case "down":
            move_x = now_x;
            move_y = now_y + block.height;
            break;
        case "right":
            move_x = now_x + block.height;
            move_y = now_y;
            break;
        case "left":
            move_x = now_x - block.height;
            move_y = now_y;
            break;
   }

   //WriteLog("Moved (" + now_x + " " + now_y + ") to (" + move_x + " " + move_y + ")");

   createConvex(move_x,move_y,now_color)
}

WriteLog("Loaded convex.js")

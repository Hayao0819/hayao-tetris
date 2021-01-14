#!/usr/bin/env bash

// 凸ブロックを作成
// 座標は必須、それ以外は無くても可
function createConvex(x,y,color,direction) {
    x_list.push(x);
    y_list.push(y);
    convex_list.push(x_list.length);
    now_x=x
    now_y=y

    //色を設定
    if ( color == null || color == "random") {
        if (block.color != null) {
            var color = block.color;
        } else {
            //色をランダムで取得
            var color = colors[Math.floor(Math.random() * colors.length)];
        }
    }
    now_color=color
    color_list.push(color)

    //方向を設定
    if (direction == null){
        direction=now_direction;
    }
    now_direction=direction;
    direction_list.push(direction);

    switch(direction){
        case "up":
            createBlock(x+block.width,y,color);
            createBlock(x+block.width,y+block.height,color);
            createBlock(x+block.width * 2,y+block.height,color);
            createBlock(x,y+block.height,color);
            break;
        case "down":
            createBlock(x,y,color);
            createBlock(x+block.width,y,color);
            createBlock(x+block.width * 2,y,color);
            createBlock(x+block.width,y+block.height,color);
            break;
    }

    console.log(direction_list);
    console.log(color_list);
    
    WriteLog("Created " + direction + " convex (" + x + " " + y + ")");
}

//凸ブロックを削除
function removeConvex(x,y){
    x_list.pop();
    y_list.pop();
    color_list.pop();
    convex_list.pop();

    switch(now_direction){
        case "up":
            context.clearRect(x+block.width,y,block.width,block.height);
            context.clearRect(x,y+block.height,block.width*3,block.height);
            break;
        case "down":
            context.clearRect(x+block.width,y+block.height,block.width,block.height);
            context.clearRect(x,y,block.width * 3,block.height);
            break;
    }


    WriteLog("Removed convex (" + x + " " + y + ")");
}

//凸ブロックを移動
function moveConvex(destination) {
    WriteLog("====== Move Convex =====")
    removeConvex(now_x,now_y)
    refreshScreen();
    var move_x, move_y;
    switch(destination){
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

   createConvex(move_x,move_y,now_color,now_direction);
}


function roteteConvex(){
    WriteLog("====== Rotate Convex =====")
    removeConvex(now_x,now_y);
    switch(now_direction){
        case "up":
            createConvex(now_x,now_y,now_color,"down");
            break;
        case "down":
            createConvex(now_x,now_y,now_color,"up");
            break;
    }
}

WriteLog("Loaded convex.js")

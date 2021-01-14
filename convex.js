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
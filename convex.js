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
            now_top=y;
            now_bottom=y+ block.height + block.height * 2;
            now_left=x - block.width;
            now_right=x + block.width * 2  + block.width * 2;
            break;
        case "down":
            createBlock(x,y,color);
            createBlock(x+block.width,y,color);
            createBlock(x+block.width * 2,y,color);
            createBlock(x+block.width,y+block.height,color);
            break;
        case "right":
            createBlock(x,y,color);
            createBlock(x,y+block.height,color);
            createBlock(x+block.width,y+block.height,color);
            createBlock(x,y+block.height * 2,color);
            break;
    }

    WriteLog("Created " + direction + " convex (" + x + " " + y + ")");
}

//凸ブロックを削除
function removeConvex(x,y){
    x_list.pop();
    y_list.pop();
    color_list.pop();
    convex_list.pop();
    direction_list.pop();

    switch(now_direction){
        case "up":
            context.clearRect(x+block.width,y,block.width,block.height);
            context.clearRect(x,y+block.height,block.width*3,block.height);
            break;
        case "down":
            context.clearRect(x+block.width,y+block.height,block.width,block.height);
            context.clearRect(x,y,block.width * 3,block.height);
            break;
        case "right":
            context.clearRect(x,y,block.width,block.height * 3);
            context.clearRect(x+block.width,y+block.height,block.width,block.height);
            break;
    }


    WriteLog("Removed convex (" + x + " " + y + ")");
}

//凸ブロックを移動
function moveConvex(destination) {
    var move_x, move_y;
    switch(destination){
        case "up":
            if (! now_top <= 0){
                move_x = now_x;
                move_y = now_y - block.height;
            }else{
                return;
            }
            break;
        case "down":
            // 440 + 40                        480
            // 0 + 40
            if (now_bottom <= canvas.height){
                move_x = now_x;
                move_y = now_y + block.height;
            }else{
                return;
            }
            break;
        case "right":
            if (now_right<= canvas.width){
                move_x = now_x + block.height;
                move_y = now_y;
            }else{
                return;
            }
            break;
        case "left":
            if (now_left >= 0){
                move_x = now_x - block.height;
                move_y = now_y;
            }else{
                return;
            }
            break;
   }

   WriteLog("====== Move Convex =====")
   //WriteLog("Moved (" + now_x + " " + now_y + ") to (" + move_x + " " + move_y + ")");
   removeConvex(now_x,now_y)
   createConvex(move_x,move_y,now_color,now_direction);
   refreshScreen();
}


function roteteConvex(){
    WriteLog("====== Rotate Convex =====")
    removeConvex(now_x,now_y);
    switch(now_direction){
        case "up":
            createConvex(now_x,now_y,now_color,"right");
            break;
        case "right":
            createConvex(now_x,now_y,now_color,"down");
            break;
        case "down":
            createConvex(now_x,now_y,now_color,"up");
            break;

    }
    createLine();
}

WriteLog("Loaded convex.js")

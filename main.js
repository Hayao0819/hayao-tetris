//罫線の設定

function changeLine(){
    WriteLog("====== Change Line view =====")
    if (Line){
        // trueなら
        Line=false;
    }else{
        //falseなら
        Line=true;
    }
    createLine();
    context.clearRect(0, 0, canvas.width, canvas.height);
    refreshScreen();
}

function RandomDirection() {
    var _directions
    
    /*
    _directions=[
        "up",
        "down",
        "right",
        "left"
    ]
    */

    _directions=[
        "up"
    ]
    return(_directions[Math.floor(Math.random() * _directions.length)]);
}

function AddNewBlock(){
    createConvex(0,0,"random",RandomDirection());
}

WriteLog("Loaded main.js")
WriteLog("====== Finished the start process =====")

AddNewBlock();
//removeConvex(0,0)

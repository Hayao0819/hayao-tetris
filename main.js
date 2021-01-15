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

WriteLog("Loaded main.js")
WriteLog("====== Finished the start process =====")

createConvex(0,0,"random","down")

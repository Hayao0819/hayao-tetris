function WriteLog(_msg) {
    var LogBox = document.getElementById("log");
    if ( LogBox.value == "" ){
        LogBox.value = _msg;
    } else {
        LogBox.value = LogBox.value + "\n" + _msg;
    }
    //console.log(_msg);
    
    // 一番下まで自動でスクロール
    LogBox.scrollTop = LogBox.scrollHeight;
}

WriteLog("Loaded log.js")

function WriteLog(_msg) {
    var LogBox = document.getElementById("log");
    console.log(LogBox.value)
    if ( LogBox.value == null ){
        LogBox.value = _msg;
    } else {
        LogBox.value = LogBox.value + "\n" + _msg;
    }
    console.log(_msg);
    
    // 一番下まで自動でスクロール
    LogBox.scrollTop = LogBox.scrollHeight;
}

WriteLog("Loaded log.js")


//callback to obtain mouse position 
$("body").mousemove(function (e) {
    MOUSE_X = e.pageX;
    MOUSE_Y = e.pageY;
    
    //console.log(MOUSE_X, MOUSE_Y);
})
$("body").mousedown(function (e) {
    //gameRunning = false;
    console.log(MOUSE_X, MOUSE_Y);
})
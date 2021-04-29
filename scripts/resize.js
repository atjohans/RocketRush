//dynamically resize canvas
$(function () {
    resizeCanvas();
});

$(window).on('resize', function () {
    resizeCanvas();
});

function resizeCanvas() {
    //callback for resizing window if needed 
    console.log("Resizing...");
    GAME_WIDTH = $(window).width();
    GAME_HEIGHT = $(window).height();
    renderer.gameWindow.canvas.width = GAME_WIDTH;
    renderer.gameWindow.canvas.height = GAME_HEIGHT;
}


//initialize the canvas and load all images. 

function loadGame() {

    $('#startScreen').css("width", $('#canvasContainer').width());
    $('#startScreen').css("height", $('#canvasContainer').height());
    if (localStorage.getItem('highScore') != null) {
        var highScoreArray = JSON.parse(localStorage.getItem('highScore'));
        var counter = 0;
        highScoreArray.sort(highScoreSort);
        for (var i in highScoreArray) {

            topPlayers.push(highScoreArray[i]);

           
            if (counter == 9) {
                break;
            }
            counter += 1;
        }
    }
    console.log(topPlayers);
}

function startGame() {
    //renderer.renderBackgroundColor("#000");
    // change background image from the intro to the actual game background
	bgmDown.play();
    $('#canvasContainer').css("visibility", "visible");

    //make sure no objects are drawn 
    renderer.renderBackgroundColor("black");
    $('#startScreen').hide();
    $('#dist').hide();
    gameRunning = true;

    //remove "display: none" from elements cuz seeing things is cool 
    var canvasContainer = document.getElementById("canvasContainer");
    canvasContainer.style.display = canvasContainer.style.display === 'none' ? '' : '';
    var canvasContainer = document.getElementById("start");
    canvasContainer.style.display = canvasContainer.style.display === 'none' ? '' : '';
    //console.log(sessionStorage.getItem("username"));
    if (sessionStorage.getItem("username") !== null) {
     
        username = sessionStorage.getItem("username");
        $('#user_input').val(username);
        console.log("Yeah");
    }

    $('#start').click(function () {
        

            username = $('#user_input').val();

            if (username.trim().length > 0) {
                username_check = true;
                username = username.trim();
                sessionStorage.setItem("username", username);
            }
        
        if (username_check ) {
            
            $('#user_input').val("");
            //console.log(username);
            $('#username').hide();
            $('#start').hide();
            $('#dist').show();
            bgmDown.stop();
            bgmEarth.play();


            //Main Game Loop, update, draw, etc
            checkCollision();
            updateGame = setInterval(updateGameFunc, UPDATE_RATE);
        }
        else {
            $('#user_input').css("background-color", "yellow");
            if (username.trim().length > 0) {
                username_check = true;
                username = username.trim();
            }
        }
        

    });

}

function updateGameFunc() {

    //IF GAME STATE IS TRUE 
    if (gameRunning) {

     

        tick += 1;
        updateDistance();
        //Background updates after background color refresh, before objects
        refreshCanvas();
        updateBackground();
        //updatePlanet();
        createParticles();

        createObjects();
        renderer.renderObjects(entityManager.entities);
        renderer.renderParticles(entityManager.particles);
        updateFuel();

    } else {
        //END THE GAME 
       
        gameOver();

    }
}

function updateFuel() {
    fuelGuage.x = GAME_WIDTH - 100;

    renderer.renderFuelGuage();
    fuelGuage.tick();
    if (fuelGuage.angle > 0) {
        causeOfDeath = username + " Ran Out of Fuel!";
        document.getElementById("twitterButton").setAttribute('href', "https://twitter.com/intent/tweet?text=I,%20" + username + ",%20made%20it%20" + distanceTravelled + "%20thousand%20miles%20before%20running%20out%20of%20fuel.%20Can%20you%20beat%20my%20highscore?%20&hashtags=RocketRush");
        this.gameRunning = false;
    }

    if (fuelGuage.angle > -Math.PI / 4) {

        fuelGaugeColor = "red";
        //console.log(fuelGaugeColor);
        if (!playedAlarm) {
            sfxAlarm.play();

            playedAlarm = true;
        }
    } else {
        fuelGaugeColor = "yellow";
    }

}

function checkCollision() {
    collInt = setInterval(function () {
        entityManager.checkPlayerCollisions();
    }, UPDATE_RATE - 10 );
}

function updatePlanet() {

    //new planet every 60 seconds 
    if (tick % PLANET_SPAWN_FREQUENCY  == 0) {

        delete (entityManager.planets.pop());

    }

         if (!entityManager.planets.length == 0) {
            let curr_planet = entityManager.planets[entityManager.planets.length - 1];
            // console.log(curr_planet);
            if (typeof curr_planet != "undefined") {
                curr_planet.setX(GAME_WIDTH / 5 - curr_planet.width/2);
                if (curr_planet.y > GAME_HEIGHT) {
                 //dont draw 
                }
                else {
                    renderer.drawObj(curr_planet);
                    curr_planet.move();
                }
            }
        }
}

function updateBackground() {
    bgRend.update(distanceTravelled);
}
function updateDistance() {

    shamelessPromoTick += 1;
    if (shamelessPromoTick % 1000 == 0) {
        console.log("Like the music? Visit https://soundcloud.com/relurek for more!");
    }

    distanceTravelled = distanceTravelled + 1;
    document.getElementById("dist").innerHTML = "Distance Travelled: " + distanceTravelled;

}
function createObjects() {
    entityManager.createMeteor();
    entityManager.createFuel();
    entityManager.createDeadPlayer();
    entityManager.moveObjs();
    
    entityManager.checkObjectBounds();

}
function createParticles() {

    entityManager.createParticle();
    entityManager.moveParticles();


}



function refreshCanvas() {
    //takes string of color, "black", "#000", etc
    renderer.renderBackgroundColor("#000");
}
function gameOver() {
    sfxFail.play();
    clearInterval(collInt);
    clearInterval(updateGame);
    $('#dist').hide();
    $("#canvasContainer").hide();
    $("#gameOverWindow").css("visibility", "visible");

    //console.log(causeOfDeath);
    $("#game_over").html("GAME OVER!<br/>" + causeOfDeath);

    if (localStorage.getItem('highScore') != null) {
        var highScoreArray = JSON.parse(localStorage.getItem('highScore'));
        highScoreArray.push([distanceTravelled, username]);
    } else {
        var highScoreArray = [];
        highScoreArray.push([distanceTravelled, username]);
    }
    highScoreArray.sort(highScoreSort);
    console.table(highScoreArray);
    var num = 10;
    if (highScoreArray.length < 10) {
        num = highScoreArray.length;
    }
    for (let i = 0; i < num; i++) {
        document.getElementById("score_" + (i + 1)).innerHTML = highScoreArray[i][0] + ": " + highScoreArray[i][1];
    }
    localStorage.setItem('highScore',JSON.stringify(highScoreArray));

    haltMusic();
    bgmDown.play();
    $("#play_again").click(function () {


        location.reload();
    

    });
     

}

function highScoreSort(a, b) {
    if (a[0] === b[0]) {
        return 0;
    } else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}


function introScene() {

    //code for intro 
    //rocketImgStr = "<img id='rocketImg' src='./resources/placeholders/Rocket_Placeholder.png' width=" + PLAYER_WIDTH + " height=" + PLAYER_HEIGHT + " />";
    $('#startScreen').show();
    $('#launch_button').click(function () {
		sfxLaunch.play();
        $('#launch').css('visibility','visible');
        $('#launch_button').hide();
        $('#startScreen').css("animation-play-state", "running");
        $('#rocket').css("animation-play-state", "running");
        canvasCenter = renderer.getCenter();
        player.setX(canvasCenter[0] - PLAYER_WIDTH / 2);
        player.setY(canvasCenter[1] - PLAYER_HEIGHT / 2);
        console.log("player drawn");
        //console.log(rocketImgStr);
        //end code for intro 
        setTimeout(startGame, 6900);
    });
}


//BEGIN THE GAME 
$(document).ready(function () {
    renderer = new Renderer();
    player = new Rocket(GAME_WIDTH/2, GAME_HEIGHT/2, PLAYER_WIDTH, PLAYER_HEIGHT, PLAYER_SPEED, './resources/final_images/Rocket.png', 0);
    renderer.gameWindow.init();
    entityManager = new EntityManager();
    entityManager.entities.push(player);
    entityManager.entity_idx++;
    player.init();


    console.log("Document ready, loading Game....")
    loadGame();
    $('#startScreen').css("animation-play-state", "paused");
    $('#rocket').css("animation-play-state", "paused");
    console.log(sessionStorage.getItem("firstRun"));

    if (sessionStorage.getItem("firstRun") == "true") {
        sessionStorage.setItem("firstRun", "false");
        introScene();
    } else {
        console.log("ok");
        startGame();
    }
});



// Get random number between min and max integer
function getRandomNumber(min, max) {
    return (Math.random() * (max - min)) + min;
}
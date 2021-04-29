//in ms
const UPDATE_RATE = 20;
const PLAYER_SPEED = 8.0;
const PLAYER_WIDTH = 101;
const PLAYER_HEIGHT = 152;
const METEOR_MAX_SPEED = 12;
const METEOR_MIN_SPEED = 3;
const FUEL_SPAWN_FREQUENCY = 700;
const PARTICLE_SPAWN_RATE = 7;
const PLANET_SPAWN_FREQUENCY = (1 / (UPDATE_RATE / 1000)) * 80;
const METEOR_SPAWN_INCREMENT = 3; 
var gameRunning = false;
var topPlayers = [];
var causeOfDeath = ""; 
var fuelGaugeColor = "yellow";
var tick = 0;
var player;
var distanceTravelled = 0;
var username = "";
var username_check = false;

var shamelessPromoTick = 0;
//background object management
var bgRend = new RenderBackground(false);

//object that will draw to canvas
var renderer = new Renderer();
//object to spawn and delete entities, also checks collisions with player 
var entityManager = new EntityManager();


//maintain state after refresh
if (sessionStorage.getItem("firstRun") === null) {
    sessionStorage.setItem("firstRun", true);
}

var METEOR_SPAWN_FREQUENCY = 65;
var GAME_WIDTH = innerWidth;
var GAME_HEIGHT = innerHeight; 
var MOUSE_X = 0;
var MOUSE_Y = 0;

var playedAlarm = false; 

var fuelGuage = new FuelGuage(GAME_WIDTH - 100, 100, 75);

//SFX
var bgmEarth = new Sound('./resources/sounds/bgm/01 RocketEarth.ogg', "bgmEarth", false);
var bgmMars = new Sound('./resources/sounds/bgm/02 RocketMars.ogg', "bgmMars", false);
var bgmJupiter = new Sound('./resources/sounds/bgm/03 RocketJupiter.ogg', "bgmJupiter", false);
var bgmSaturn = new Sound('./resources/sounds/bgm/04 RocketSaturn.ogg', "bgmSaturn", false);
var bgmUranus = new Sound('./resources/sounds/bgm/05 RocketUranus.ogg', "bgmUranus", false);
var bgmNeptune = new Sound('./resources/sounds/bgm/06 RocketNeptune.ogg', "bgmNeptune", false);
var bgmPluto = new Sound('./resources/sounds/bgm/07 RocketPluto.ogg', "bgmPluto", false);
var bgmDown = new Sound('./resources/sounds/bgm/08 RocketDown.ogg', "bgmDown", false);

var sfxLaunch = new Sound('./resources/sounds/sfx/Launch.wav', "sfxLaunch", false);
var sfxFuel = new Sound('./resources/sounds/sfx/FuelUp.wav', "sfxFuel", false);
sfxFuel.sound.volume = 0.5;
var sfxFail = new Sound('./resources/sounds/sfx/Failure.wav', "sfxFail", false);
var sfxAlarm = new Sound('./resources/sounds/sfx/Alarm.wav', "sfxAlarm", false);
sfxAlarm.sound.volume = 0.6;
//GAME SETTINGS: ==============================================================
const GAME_TITLE   = "Lunar Legends: A Journey Beyond";
const GAME_VERSION = "0.1.0";

const DEBUG         = false;
const PIXELART      = true; //para el tema del escalado de imagen
const ZOOM          = 1;

const SCREEN_WIDTH  = 340;
const SCREEN_HEIGHT = 340;

const VERTICAL_LEVELS_WIDTH  = Math.max(SCREEN_WIDTH,SCREEN_HEIGHT); 
const VERTICAL_LEVELS_HEIGHT = Math.max(SCREEN_WIDTH,SCREEN_HEIGHT);

const SCREEN_MIN_WIDTH  = 328;
const SCREEN_MIN_HEIGHT = 188;

const SCREEN_MAX_WIDTH  = 660;
const SCREEN_MAX_HEIGHT = 660;

const TRANSPARENT = true; //para poner fondo transparente o no

//RUTAS A RECURSOS: ===========================================================
const ASSETS_PATH = "assets/";
const CODE_PATH   = "src/js/";
const CSS____PATH = "src/css/";
const JSON___PATH = "src/json/";

const IMAGES_PATH = ASSETS_PATH + "img/";
const MUSIC_PATH  = ASSETS_PATH + "music/";
const IMAG_PATH_V = IMAGES_PATH + "verticalLevels/";
const IMAG_PATH_H = IMAGES_PATH + "horizontalLevels/";
const OBJECT_PATH = CODE_PATH + "obj/";
const SCENES_PATH = CODE_PATH + "scenes/";

const BGM_PATH = MUSIC_PATH + "BGM/"; //Música de fondo (BackGround Music); música de fondo en loop
const BGS_PATH = MUSIC_PATH + "BGS/"; //Sonido de fondo (BackGround Sound); sonido ambiente de fondo en loop
const ME_PATH  = MUSIC_PATH + "ME/";  //Efecto musical (Music Effect); las típicas melodías cortas sin loop de cuando mueres/pasas un nivel/encuentras un objeto etc
const SE_PATH  = MUSIC_PATH + "SE/";  //Efecto de sonido (Sound Effect); sonido corto sin loop que se aplica cuando disparas, rompes/abres algo etc.

//ASTRONAUT CONFIGURATIONS: ===================================================
const SPRITE_WIDTH    = 64;
const SPRITE_HEIGHT   = 64;
const IDLE_FRAME_RATE = 7; //duracion de cada postura del sprite durante la animacion de idle       (medido en numero de frames)
const MOVI_FRAME_RATE = 10; //duracion de cada postura del sprite durante la animacion de movimiento (medido en numero de frames)
const GRAVITY_FACTOR = 1000;

//ASTRONAUT INITIAL POS:
const AST_INITIAL_X = 100;
const AST_INITIAL_Y = 300;

//SPACESHIP SPRITE CONFIGURATIONS: ============================================
const SPACESHIP_WIDTH   = 80;//82;
const SPACESHIP_HEIGHT  = 80;//86;
const SPACESHIP_IDLE_FR = 1;
const SPACESHIP_MOVI_FR = 10;

const SPACESHIP_SPEED   = 0.2;
const SPACESHIP_INIT_X  = VERTICAL_LEVELS_WIDTH/2;
const SPACESHIP_INIT_Y  = VERTICAL_LEVELS_HEIGHT- 100;
const ASTRONAUT_SPEED  = 2;

//PHYSICS (by default): =======================================================
const GRAVITIES     = { "LUNA": 0.165, "TIERRA": 1, "MARTE": 0.379, "JUPITER": 2.528, "SATURNO": 1.065, "URANO": 0.904, "NEPTUNO": 1.137 };
const JUMPFORCE     = 17;
const FLOORHEIGHT   = 599;
const GRAVITY       = GRAVITIES["LUNA"];

//GAME SETTINGS:
const GAME_TITLE   = "Lunar Legends: A Journey Beyond";
const GAME_VERSION = "0.1.0";

const DEBUG         = false;
const PIXELART      = true; //para el tema del escalado de imagen
const ZOOM          = 1;

const SCREEN_WIDTH  = 656;
const SCREEN_HEIGHT = 373;

const VERTICAL_LEVELS_WIDTH  = 270; 
const VERTICAL_LEVELS_HEIGHT = 480;

const SCREEN_MIN_WIDTH  = 328;
const SCREEN_MIN_HEIGHT = 188;

const SCREEN_MAX_WIDTH  = 1312;
const SCREEN_MAX_HEIGHT = 752;

const TRANSPARENT = true; //para poner fondo transparente o no

//RUTAS A RECURSOS:
const IMAGES_PATH = "rsc/img/";
const IMAG_PATH_V = IMAGES_PATH + "verticalLevels/";
const IMAG_PATH_H = IMAGES_PATH + "horizontalLevels/";
const MUSIC_PATH  = "rsc/music/";
const CSS____PATH = "lib/css/";
const OBJECT_PATH = "lib/js/obj/";
const SCENES_PATH = "lib/js/scenes/";
const JSON___PATH = "lib/json/";

const BGM_PATH = MUSIC_PATH + "BGM/"; //Música de fondo (BackGround Music); música de fondo en loop
const BGS_PATH = MUSIC_PATH + "BGS/"; //Sonido de fondo (BackGround Sound); sonido ambiente de fondo en loop
const ME_PATH  = MUSIC_PATH + "ME/";  //Efecto musical (Music Effect); las típicas melodías cortas sin loop de cuando mueres/pasas un nivel/encuentras un objeto etc
const SE_PATH  = MUSIC_PATH + "SE/";  //Efecto de sonido (Sound Effect); sonido corto sin loop que se aplica cuando disparas, rompes/abres algo etc.

//SPRITE CONFIGURATIONS:
const SPRITE_WIDTH    = 64;
const SPRITE_HEIGHT   = 64;
const IDLE_FRAME_RATE = 20; //duracion de cada postura del sprite durante la animacion de idle       (medido en numero de frames)
const MOVI_FRAME_RATE = 10; //duracion de cada postura del sprite durante la animacion de movimiento (medido en numero de frames)

//SPACESHIP SPRITE CONFIGURATIONS:
const SPACESHIP_WIDTH  = 82;
const SPACESHIP_HEIGHT = 86;
const SPACESHIP_SPEED  = 0.15;
const SPACESHIP_THRES  = 0.15;

//ASTRONAUT INITIAL POS:
const AST_INITIAL_X = 100;
const AST_INITIAL_Y = 300;

//PHYSICS (by default):
const GRAVITIES     = { "LUNA": 0.165, "TIERRA": 1, "MARTE": 0.379, "JUPITER": 2.528, "SATURNO": 1.065, "URANO": 0.904, "NEPTUNO": 1.137 };
const JUMPFORCE     = 17;
const FLOORHEIGHT   = 599;
const GRAVITY       = GRAVITIES["LUNA"];

//FUNCIONES PARA OBTENER LAS RUTAS A RECURSOS:
function getImg(name)   { return IMAGES_PATH + name + ".png";  };
function getImgV(name)  { return IMAG_PATH_V + name + ".png";  };
function getImgH(name)  { return IMAG_PATH_H + name + ".png";  };
function getCss(name)   { return CSS____PATH + name + ".css";  };
function getJson(name)  { return JSON___PATH + name + ".json"; };
function getObj(name)   { return OBJECT_PATH + name; };
function getScene(name) { return SCENES_PATH + name; };

function getBGM(name) { return BGM_PATH + name; };
function getBGS(name) { return BGS_PATH + name; };
function getME(name)  { return ME_PATH  + name; };
function getSE(name)  { return SE_PATH  + name; };

function getColor(hexColorStr)  { return Phaser.Display.Color.HexStringToColor(hexColorStr).color; } //where hexColorStr is #0033ff, #03f, 0x0033ff, or 0x03f
function getColor(r,g,b)  { return Phaser.Display.Color.GetColor(r, g, b);      }
function getColor(r,g,b,a){ return Phaser.Display.Color.GetColor32(r, g, b, a); }

function digitsToStr(digits,numDigits){
    let ret = "" + digits;
    for(let i = ret.length; i < numDigits; i++){ ret = "0" + ret; }
    return ret;
}

function createAnim(_scene, _key, _spriteKey, _start, _end, _frameRate, _repeat){
    _scene.anims.create({
        key: _key,
        frames: _scene.anims.generateFrameNumbers(_spriteKey, { start: _start, end: _end}),
        frameRate: _frameRate,
        repeat: _repeat
    });
}

function createSpriteJson(namesArray, frameWidth, frameHeight, rows, cols){
    var ret = { "frames": [] };
    for(var i = 0; i < namesArray.length; i++){
        ret["frames"][i] = { 
            "filename": namesArray[i], 
            "frame": {
                "x": (i%cols)*frameWidth,
                "y": Math.floor(i/rows)*frameHeight,
                "w": frameWidth,
                "h": frameHeight
            }
        };
    }
    return ret;
}

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
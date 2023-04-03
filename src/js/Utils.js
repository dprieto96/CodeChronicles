//FUNCIONES PARA OBTENER LAS RUTAS A RECURSOS:
export default class Utils{
    constructor(){}
    
    static getImg(assetName)   { return IMAGES_PATH + assetName + ".png";  };
    static getImgV(assetName)  { return IMAG_PATH_V + assetName + ".png";  };
    static getImgH(assetName)  { return IMAG_PATH_H + assetName + ".png";  };
    static getCss(assetName)   { return CSS____PATH + assetName + ".css";  };
    static getJson(assetName)  { return JSON___PATH + assetName + ".json"; };
    static getObj(assetName)   { return OBJECT_PATH + assetName; };
    static getScene(assetName) { return SCENES_PATH + assetName; };
    
    static getBGM(assetName) { return BGM_PATH + assetName; };
    static getBGS(assetName) { return BGS_PATH + assetName; };
    static getME(assetName)  { return ME_PATH  + assetName; };
    static getSE(assetName)  { return SE_PATH  + assetName; };
    
    static getColor(hexColorStr)  { return Phaser.Display.Color.HexStringToColor(hexColorStr).color; } //where hexColorStr is #0033ff, #03f, 0x0033ff, or 0x03f
    static getColor(r,g,b)  { return Phaser.Display.Color.GetColor(r, g, b);      }
    static getColor(r,g,b,a){ return Phaser.Display.Color.GetColor32(r, g, b, a); }
    
    static digitsToStr(digits,numDigits){
        let ret = "" + digits;
        for(let i = ret.length; i < numDigits; i++){ ret = "0" + ret; }
        return ret;
    }
    
    static createAnim(_scene, _key, _spriteKey, _start, _end, _frameRate, _repeat){
        _scene.anims.create({
            key: _key,
            frames: _scene.anims.generateFrameNumbers(_spriteKey, { start: _start, end: _end}),
            frameRate: _frameRate,
            repeat: _repeat
        });
    }

    static createAnimFromAtlas(_scene, _key, _spriteKey, _prefix, _end, _zeroPad, _frameRate, _repeat){
        _scene.anims.create({
            key: _key,
            frames: _scene.anims.generateFrameNames(_spriteKey, {
              prefix: _prefix,
              start: 0,
              end: _end,
              zeroPad: _zeroPad,
            }),
            frameRate: _frameRate,
            repeat: _repeat,
        });
    }
    
    static createKeyBindings(obj){
        obj.a  = obj.input.keyboard.addKey("A");
        obj.s  = obj.input.keyboard.addKey("S");
        obj.d  = obj.input.keyboard.addKey("D");
        obj.w  = obj.input.keyboard.addKey("W");
        obj.p  = obj.input.keyboard.addKey("P");
        obj.sp = obj.input.keyboard.addKey("space");
    }
    
    static createSpriteJson(assetNamesArray, frameWidth, frameHeight, rows, cols){
        var ret = { "frames": [] };
        for(var i = 0; i < assetNamesArray.length; i++){
            ret["frames"][i] = { 
                "fileassetName": assetNamesArray[i], 
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

}
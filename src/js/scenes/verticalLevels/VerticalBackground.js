import Utils from "../../Utils.js"
import Background from "../Background.js"
export default class VerticalBackground extends Background{
    constructor(scene){
        super(scene);
        this.framesToReachSpace = 300;

        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet,      Utils.getImgV(this.scene.planet));
        this.scene.load.image(this.scene.destination, Utils.getImgV(this.scene.destination));
        this.decorations = [];
        this.particles   = [];
    }

    create(){
        super.create();
        let st = this.scene.st["decorations"];
        //decorations:
        for (let i = 0; i < st["planets"].length; i++) {
            const objSt = st["planets"][i];
            Utils.createAnimFromAtlas(this.scene, objSt["sprite"]+"0"+i, "verticalAtlas", objSt["sprite"], 0, 2, 1, 0);
            let obj = { 
                "sprite": this.scene.add.sprite(5, 10, 'verticalAtlas', objSt["sprite"]+"0"+i), 
                "x": objSt["x"], "y": objSt["y"], "z": objSt["z"],
                "speedX": objSt["speedX"], "speedY": objSt["speedY"]
            }
            obj.sprite.x = obj.x;
            obj.sprite.y = obj.y;
            this.decorations.push(obj);
        }

        for (let i = 0; i < st["particles"].length; i++) {
            const objSt = st["particles"][i];
            for(let j = 0; j < objSt["density"]; j++){
                const objSt = st["particles"][i];
                Utils.createAnimFromAtlas(this.scene, objSt["sprite"]+"0"+i, "verticalAtlas", objSt["sprite"], 0, 1, 1, 0);
                let obj = { 
                    "sprite": this.scene.add.sprite(5, 10, 'verticalAtlas', objSt["sprite"]+"0"+i), 
                    "speedX": objSt["speedX"], "speedY": objSt["speedY"]
                }

                obj.sprite.x = Math.floor(Phaser.Math.Between(0, SCREEN_WIDTH));
                obj.sprite.y = Math.floor(Phaser.Math.Between(-100, -50));
                obj.sprite.setDepth(0);
                obj.speedY   = Math.floor(Phaser.Math.Between(   1,  5));
                this.particles.push(obj);
            }
        }
        
        this.destinImg = this.scene.add.image(VERTICAL_LEVELS_WIDTH/2, 0, this.scene.destination).setOrigin(0.5, 0);
        this.destinImg.rotation += Math.PI;
        this.destinImg.setDepth(2);
    }

    launch(){
        this.auxSpeed += 0.035;
        if(this.planetImg.y < VERTICAL_LEVELS_HEIGHT + this.planetImg.height + this.framesToReachSpace){
            this.planetImg.y += this.auxSpeed;
        }
        else if (this.atmosphere.alpha > 0){
            this.atmosphere.alpha -= 0.002;
            this.scene.player.y   -= SPACESHIP_SPEED;
        }
        else{ 
            this.scene.player.speedY = -SPACESHIP_SPEED*2;
            this.scene.introDone = true;
        }
    }

    update(){
        if(!this.scene.checkEndOfGame() || false){ //this.scene.enemiesGroup.getLength() > 0
            for(let i = 0; i < this.decorations.length; i++){
                let myObj = this.decorations[i];
                myObj["sprite"].x += myObj.speedX / myObj.z;
                myObj["sprite"].y = (myObj.speedY + this.scene.distanceReached) / myObj.z;
            }
    
            for(let i = 0; i < this.particles.length; i++){
                let myObj = this.particles[i];
                myObj["sprite"].x += myObj.speedX;
                myObj["sprite"].y += myObj.speedY;
                if (myObj["sprite"].y >= SCREEN_HEIGHT){
                    myObj["sprite"].y = Math.floor(Phaser.Math.Between(-100, -50));
                    myObj.speedY      = Math.floor(Phaser.Math.Between(   1,  5));
                }
            }
        }
        else if (!this.scene.levelCleared){
            for(let i = 0; i < this.particles.length; i++){
                let myObj = this.particles[i];
                myObj["sprite"].x += myObj.speedX;
                myObj["sprite"].y += myObj.speedY;
                myObj["sprite"].alpha -= 0.002;
                if (myObj["sprite"].y >= SCREEN_HEIGHT){
                    myObj["sprite"].y = Math.floor(Phaser.Math.Between(-100, -50));
                    myObj.speedY      = Math.floor(Phaser.Math.Between(   1,  5));
                }
            }
        }
    }

    endOfGame(){
        if(this.destinImg.y < this.destinImg.height / 2){
            //cinemática final:
            this.destinImg.y += 0.2;
        }
        else{ this.scene.levelCleared = true; }
    }
}

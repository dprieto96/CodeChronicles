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
            let numFrames = objSt["frames"] != null && objSt["frames"] > 1 ? objSt["frames"] - 1 : 0;
            Utils.createAnimFromAtlas(this.scene, objSt["sprite"]+"0"+i, "verticalAtlas", objSt["sprite"], numFrames, 2, 10, -1);
            let obj = { 
                "sprite": this.scene.add.sprite(5, 10, 'verticalAtlas', objSt["sprite"]+"0"+i), 
                "x": objSt["x"], "y": objSt["y"], "z": objSt["z"],
                "speedX": objSt["speedX"], "speedY": objSt["speedY"]
            }
            //this.scene.physics.add.existing(obj.sprite);
            //this.scene.physics.world.enable(obj.sprite); 
            obj.sprite.x = obj.x;
            obj.sprite.y = obj.y;
            //obj.sprite.setVelocity(objSt["speedX"],objSt["speedY"]);
            this.decorations.push(obj);
            if (numFrames > 0) { obj.sprite.play(objSt["sprite"]+"0"+i); }
        }

        for (let i = 0; i < st["particles"].length; i++) {
            const objSt = st["particles"][i];
            let numFrames = objSt["frames"] != null && objSt["frames"] > 1 ? objSt["frames"] - 1 : 0;
            for(let j = 0; j < objSt["density"]; j++){
                Utils.createAnimFromAtlas(this.scene, objSt["sprite"]+"0"+i, "verticalAtlas", objSt["sprite"], numFrames, 2, 10, -1);
                let obj = { 
                    "sprite": this.scene.add.sprite(0, 0, 'verticalAtlas', objSt["sprite"]+"0"+i), 
                    "minSpeedY": objSt["minSpeedY"], "maxSpeedY": objSt["maxSpeedY"]
                }

                obj.sprite.x = Math.floor(Phaser.Math.Between(0, SCREEN_WIDTH));
                obj.sprite.y = Math.floor(Phaser.Math.Between(-100, -50));
                obj.sprite.setDepth(0);
                obj.speedY   = Math.floor(Phaser.Math.Between(obj.minSpeedY, obj.maxSpeedY));
                this.particles.push(obj);
            }
        }
        
        this.destinImg = this.scene.add.image(VERTICAL_LEVELS_WIDTH/2, 0, this.scene.destination).setOrigin(0.5, 0);
        this.destinImg.rotation += Math.PI;
        this.destinImg.setDepth(2);
        this.countdown = 150;
    }

    launch(){
        if(this.countdown >= 0){ this.countdown--; }
        else {
            this.scene.player.play("UP",true);
            this.auxSpeed += 0.02;
            if(this.planetImg.y < VERTICAL_LEVELS_HEIGHT + this.planetImg.height + this.framesToReachSpace){
                this.planetImg.y += this.auxSpeed;
            }
            else if (this.atmosphere.alpha > 0){
                this.atmosphere.alpha -= 0.004;
                this.scene.player.y   -= SPACESHIP_SPEED;
            }
            else{ 
                this.scene.player.speedY = -SPACESHIP_SPEED*2;
                this.scene.introDone = true;
            }
        }
        this.update();
    }

    update(){
        this.updateDecorations();
        this.updateParticles();
    }

    updateDecorations(){
        let st = this.scene.st["decorations"];
        for(let i = 0; i < this.decorations.length; i++){
            const objSt = st["planets"][i];
            let myObj = this.decorations[i];
            //myObj["sprite"].x = objSt.x;
            myObj["sprite"].x += myObj.speedX / myObj.z;

            if(this.scene.distanceReached <= 0 || this.scene.checkEndOfGame()){
                myObj["sprite"].y += myObj.speedY / myObj.z;
                objSt.y = myObj["sprite"].y
            }
            else if (myObj.speedY <= 0){
                myObj["sprite"].y = objSt.y + this.scene.distanceReached / myObj.z;
            }
            else{
               myObj["sprite"].y = objSt.y + this.scene.distanceReached*myObj.speedY / myObj.z;
            }
        }
    }
    
    updateParticles(){
        for(let i = 0; i < this.particles.length; i++){
            let myObj = this.particles[i];
            myObj["sprite"].y += myObj.speedY;

            //opacity:
            if(this.countdown >= 0){
                myObj["sprite"].alpha = 0;
            }
            else if(!this.scene.introDone && myObj["sprite"].alpha <= 1){
                myObj["sprite"].alpha += 0.002;
            }
            else if(this.scene.checkEndOfGame() && !this.scene.levelCleared){ //this.scene.enemiesGroup.getLength() > 0
                myObj["sprite"].alpha -= 0.002;
            }
    
            if (myObj["sprite"].y >= SCREEN_HEIGHT){
                myObj["sprite"].y = Math.floor(Phaser.Math.Between(-100, -50));
                myObj.speedY      = Math.floor(Phaser.Math.Between(myObj.minSpeedY, myObj.maxSpeedY));
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

import Asteroid from "../../obj/Asteroid.js";
import Utils from "../../Utils.js"
import Background from "../Background.js"
export default class VerticalBackground extends Background{
    constructor(scene){
        super(scene);
        this.framesToReachSpace = 300;
        
        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet,      Utils.getImgV(this.scene.planet));
        this.scene.load.image(this.scene.destination, Utils.getImgV(this.scene.destination));
    }

    create(){
        super.create();
        this.planetImg = this.scene.add.image(0, VERTICAL_LEVELS_HEIGHT, this.scene.planet).setOrigin(0, 1);
        this.destinImg = this.scene.add.image(VERTICAL_LEVELS_WIDTH/2, 0, this.scene.destination).setOrigin(0.5, 0);
        this.destinImg.rotation += Math.PI;
    }

    launch(){
        this.auxSpeed += 0.035;
        if(this.planetImg.y < VERTICAL_LEVELS_HEIGHT + this.planetImg.height + this.framesToReachSpace){
            this.planetImg.y += this.auxSpeed;
        }
        else if (this.atmosphere.alpha > 0){
            this.atmosphere.alpha -= 0.01;
            this.scene.player.y   -= SPACESHIP_SPEED*3;
        }
        else{ 
            this.scene.player.speedY = -SPACESHIP_SPEED*2;
            this.scene.introDone = true;
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

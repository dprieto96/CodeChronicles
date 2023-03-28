import Utils from "../../Utils.js"
import Background from "../Background.js"
export default class VerticalBackground extends Background{
    constructor(scene){
        super(scene);
        this.framesToReachSpace = 300;
        
        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet, Utils.getImgV(this.scene.planet));
    }

    create(){
        super.create();
        this.planetImg = this.scene.add.image(0, VERTICAL_LEVELS_HEIGHT, this.scene.planet).setOrigin(0, 1);
    }

    launch(){
        if(!this.scene.introDone){
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
    }
}
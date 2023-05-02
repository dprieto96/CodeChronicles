import Utils from "../../Utils.js"
import Nivel from "../Nivel.js"
import Background from "../Background.js"
export default class HorizontalBackground extends Background{
    constructor(scene){
        super(scene);

        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet + "H", Utils.getImgH(this.scene.planet));
        this.scene.load.image('platform', Utils.getImgH('moonPlatforms'));
        this.mode = "H";
    }

    create(){
        super.create();

        let x = 1000;
        this.bgST = this.scene.bgST["background"];
        this.atmosphere = this.graphics.fillRect(0, 0, this.scene.bgST["bounds"]["x"], this.scene.bgST["bounds"]["y"]);
        this.planetImg.setPosition(this.bgST["x"],this.bgST["y"]);
        this.planetImg.setScale(this.bgST["scale"]);
        this.atmosphere.setPosition(0,0);
        this.atmosphere.setScale(this.bgST["scale"]);

        if(this.scene.bgST["planet"] == "VENUS") 
        {
            this.groupI = this.scene.add.group();

            for(let i = 0; i < 8; i++) 
            {
                this.groupI.add(this.scene.add.image(x, this.bgST["y"], this.scene.planet + this.mode).setOrigin(0, 1).setScale(this.bgST["scale"]));
                x += 800;
            }
            this.groupI.setDepth(2);

        }
        
    
    }

    launch(){

        
    }

    endOfGame(){
        this.scene.levelCleared = true; 
    }
}

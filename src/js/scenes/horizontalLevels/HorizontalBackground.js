import Utils from "../../Utils.js"
import Background from "../Background.js"
export default class HorizontalBackground extends Background{
    constructor(scene){
        super(scene);

        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet + "H", Utils.getImgH(this.scene.planet));
        this.scene.load.image('platform', Utils.getImgH('moonPlatforms'));
        console.log(Utils.getImgH(this.scene.planet));
        this.mode = "H";
    }

    create(){
        super.create();
    }

    launch(){

        
    }

    endOfGame(){
        this.scene.levelCleared = true; 
    }
}

import Utils from "../../Utils.js"
import Background from "../Background.js"
export default class HorizontalBackground extends Background{
    constructor(scene){
        super(scene);

        // Carga la imagen 'planet' usando 'load'
        this.scene.load.image(this.scene.planet, Utils.getImgV(this.scene.planet));
        this.scene.load.image('platform', Utils.getImgH('moonPlatforms'));
    }

    create(){
        super.create();
    }

    launch(){

        
    }
}

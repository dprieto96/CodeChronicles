import Utils from "../Utils.js"
export default class Background extends Phaser.GameObjects.Sprite{
    constructor(scene){
        super(scene, 0, 0);
        this.scene      = scene;
        this.graphics   = this.scene.add.graphics();
        this.atmosphere = null;
        this.auxSpeed   = 0;
        this.mode       = "";
    }

    create(){
        let st = this.scene.ctrl.planetSettings[this.scene.planet];
		this.graphics.fillStyle(st["atmosColor"], 1);
		this.atmosphere = this.graphics.fillRect(0, 0, VERTICAL_LEVELS_WIDTH, VERTICAL_LEVELS_HEIGHT);
        this.atmosphere.alpha = st["transparency"];
        this.atmosphere.setDepth(1);

        //main planet:
        this.planetImg = this.scene.add.image(0, VERTICAL_LEVELS_HEIGHT, this.scene.planet + this.mode).setOrigin(0, 1);
        this.planetImg.setDepth(2);
    }

    launch(){}
    endOfGame(){}
}

/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import MenuScene from "../scenes/MenuScene";
//import NivelVertical from "./verticalLevels/NivelVertical";

export default class PauseScene extends Phaser.Scene{

	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'PauseScene' });    
	}

    preload(){
        this.load.image('cross', 'assets/img/cross.png');
    }

    create(){
        this.scale=0.03;
        
        //BUTTON CROSS
        this.buttonCROSS = this.add.image(SCREEN_MAX_WIDTH,100,'cross');
        this.buttonCROSS.setDepth(999);
        this.buttonCROSS.setScale(0.03);
        this.buttonCROSS.setInteractive();

        this.buttonCROSS.on('pointerdown', function () {
            this.scene.resume('LevelSelector');
            this.scene.stop();
        }, this);

        

    }

    update(){
        super.update();
    }


}
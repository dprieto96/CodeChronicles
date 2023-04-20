/**
 * Escena de Título.
 * @extends Phaser.Scene
 */


//import NivelVertical from "./verticalLevels/NivelVertical.js";
//import NivelVertical from "./verticalLevels/NivelVertical";

export default class PauseScene extends Phaser.Scene{

	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'PauseScene' });    
	}

    static launchPauseScene(escena){
        escena.scene.launch('PauseScene');


    }

    init(settings){
        this.escena=settings.clave;
        
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
            this.scene.resume(this.escena);
          // this.escena.continuar();
            this.scene.stop();
        }, this);

        

    }

    update(){
        super.update();
    }


}
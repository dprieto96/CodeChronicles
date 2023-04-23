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



    init(settings){
        this.escena=settings.clave;
    }

    preload(){
        this.load.image('cross', 'assets/img/cross.png');
        this.load.image('bg', 'assets/img/button.png');
        this.load.image('home', 'assets/img/home.png');
        this.load.image('reload', 'assets/img/reload.png');
    }

    create(){
        this.scale=0.03;
        
        //BUTTON CROSS
        this.buttonCROSS = this.add.image(SCREEN_MAX_WIDTH+50   ,250,'cross');
        this.buttonCROSS.setDepth(999);
        this.buttonCROSS.setScale(0.03);
        this.buttonCROSS.setInteractive();

        this.buttonCROSS.on('pointerdown', function () {
            this.scene.resume(this.escena);
            this.scene.stop();
        }, this);

        this.bg = this.add.image(SCREEN_MAX_WIDTH/2+80,SCREEN_MAX_HEIGHT/2+80,'bg');
        this.bg.setDepth(1);


        //HOME
        this.buttonHOME = this.add.image(SCREEN_MAX_WIDTH/2-80,SCREEN_MAX_HEIGHT/2+80,'home');
        this.buttonHOME.setDepth(999);
        this.buttonHOME.setScale(0.3);
        this.buttonHOME.setInteractive();

        this.buttonHOME.on('pointerdown', function () {
             location.reload();  
            /*
            this.scene.start('menuScene');
            console.log('La escena que paro es: ' + this.escena);
            this.scene.remove(this.escena);
            this.scene.stop('levelSelector');
            this.scene.stop();*/

            //window.location.reload();
            //window.location.reload();
        }, this);

        //RELOAD
        this.buttonRELOAD = this.add.image(SCREEN_MAX_WIDTH/2+250,SCREEN_MAX_HEIGHT/2+80,'reload');
        this.buttonRELOAD.setDepth(999);
        this.buttonRELOAD.setScale(0.3);
        this.buttonRELOAD.setInteractive();

        this.buttonRELOAD.on('pointerdown', function () {
            this.scene.start(this.escena);
            this.scene.stop();
        }, this);
        

    }

    update(){
        super.update();
    }


}
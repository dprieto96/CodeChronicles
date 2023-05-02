/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import MenuScene from "../scenes/MenuScene";



export default class ControlsScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'ControlsScene' });    
	}

    preload(){
        this.load.image('cross', 'assets/img/cross.png');
        this.load.image('book', 'assets/img/book.gif');
        this.load.image('controls', 'assets/img/controls.png');
        this.load.image('right-arrow', 'assets/img/right-arrow.png');
        
    }

    create(){
        this.scale=0.03;

        this.text= this.add.text(SCREEN_MAX_WIDTH/2+100, 200, '',{ fontStyle: 'strong',font: '15px Arial', fill: '##606060' });
         var content = "To control the spaceship and astronaut \n\n, use the W, A, S, and D keys to move in\n\n different directions.\n\n The space bar is used to fire weapons\n\n and destroy enemy targets.";

         this.text.setText( content);
         this.text.setDepth(1000);

        
         //BUTTON CROSS
         this.buttonCROSS = this.add.image(SCREEN_MAX_WIDTH+50,50,'cross');
         this.buttonCROSS.setDepth(999);
         this.buttonCROSS.setScale(0.03);
         this.buttonCROSS.setInteractive();
         this.buttonCROSS.on('pointerup', function () {this.scene.start('menuScene')}, this);

         this.book=this.add.image(SCREEN_MAX_WIDTH/2+70,SCREEN_MAX_HEIGHT/2+50,'book');
         this.book.setDepth(1);
         this.book.setScale(1.8);

         this.controls=this.add.image(SCREEN_MAX_WIDTH/2 -80,SCREEN_MAX_HEIGHT/2+40,'controls');
         this.controls.setDepth(999);
         this.controls.setScale(0.5);

         this.arrow=this.add.image(SCREEN_MAX_WIDTH+30,SCREEN_MAX_HEIGHT-50,'right-arrow');
         this.arrow.setInteractive();
         this.arrow.setDepth(999);
         this.arrow.setScale(0.1);
         this.arrow.on('pointerup', function () {
            this.scene.switch('ControlsScene2');}, this);


    }

    update(){
        super.update();
    }


}
    
    

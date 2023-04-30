/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import MenuScene from "../scenes/MenuScene";



export default class ControlsScene2 extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'ControlsScene2' });    
	}

    preload(){
        this.load.image('cross', 'assets/img/cross.png');
        this.load.image('book', 'assets/img/book.gif');
        this.load.image('left-arrow', 'assets/img/left-arrow.png');
        
    }

    create(){

         //BUTTON CROSS
         this.buttonCROSS = this.add.image(SCREEN_MAX_WIDTH+50,50,'cross');
         this.buttonCROSS.setDepth(999);
         this.buttonCROSS.setScale(0.03);
         this.buttonCROSS.setInteractive();
         this.buttonCROSS.on('pointerup', function () {this.scene.start('menuScene')}, this);

         this.book=this.add.image(SCREEN_MAX_WIDTH/2+70,SCREEN_MAX_HEIGHT/2+50,'book');
         this.book.setDepth(1);
         this.book.setScale(1.8);


         this.arrow=this.add.image(100,SCREEN_MAX_HEIGHT-50,'leftt-arrow');
         this.arrow.setInteractive();
         this.arrow.setDepth(999);
         this.arrow.setScale(1);
         this.arrow.on('pointerup', function () {this.scene.start('ControlScene')}, this);


    }

    update(){
        super.update();
    }


}
    
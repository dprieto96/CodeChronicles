/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import MenuScene from "../scenes/MenuScene";


export default class HistoryScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'HistoryScene' });    
	}

    preload(){
        this.load.image('cross', 'assets/img/cross.png');
        this.load.image('Xote', 'assets/img/Xote.jpeg');
        this.load.image('book', 'assets/img/book.gif');
    }

    create(){
        this.scale=0.03;

        
        //BUTTON CROSS
        this.buttonCROSS = this.add.image(SCREEN_MAX_WIDTH+50,50,'cross');
        this.buttonCROSS.setDepth(999);
        this.buttonCROSS.setScale(0.03);
        this.buttonCROSS.setInteractive();
        this.buttonCROSS.on('pointerup', function () {this.scene.start('menuScene')}, this);

        this.bg=this.add.image(SCREEN_MAX_WIDTH/2 -100,SCREEN_MAX_HEIGHT/2+40,'Xote');
        this.bg.setDepth(999);
        this.bg.setScale(0.25);

        this.book=this.add.image(SCREEN_MAX_WIDTH/2+70,SCREEN_MAX_HEIGHT/2+50,'book');
        this.book.setDepth(1);
        this.book.setScale(1.8);


    }

    update(){
        super.update();
    }


}
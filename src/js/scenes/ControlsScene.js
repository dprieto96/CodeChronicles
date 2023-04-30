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
         var content = "SPACE LOG, DAY 2314:\n\n"+
         "I am about to leave the Moon to reach Mars, where an exploration and\n"+
         "resource gathering mission awaits me. According to the reports, it is a\n"+
         "hostile world, full of dangers and mysteries.\n\n"+
         "I will have to use my cunning and my equipment to survive and achieve my\n"+
         "goal. I don't know what I will find there, but I am ready for anything.\n"+
         "This is the biggest challenge of my career as astronaut, and I can't fail.\n\n"+
         "May luck be with me.";

         this.text.setText(this.text + content);
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
    
    

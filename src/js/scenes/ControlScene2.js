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
        this.load.image('explain', 'assets/img/Explain.png');
        this.load.image('left-arrow', 'assets/img/left-arrow.png');
     
        
    }

    create(){

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


         this.buttonARROW=this.add.image(100,SCREEN_MAX_HEIGHT-50,'left-arrow');
         this.buttonARROW.setInteractive();
         this.buttonARROW.setDepth(999);
         this.buttonARROW.setScale(0.1);
         this.buttonARROW.on('pointerup', function () {this.scene.switch('ControlsScene')}, this);

         this.explain=this.add.image(220,SCREEN_MAX_HEIGHT/2+50,'explain');
         this.explain.setDepth(1000);
         this.explain.setScale(0.3);
    }

    update(){ super.update(); }


}
    
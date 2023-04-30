/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

//import MenuScene from "../scenes/MenuScene";
import LevelSelector from "./LevelSelector.js";
import ControlsScene from "./ControlsScene.js";
import HistoryScene from "./HistoryScene.js";
import Utils from "../Utils.js";


export default class LoreScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'LoreScene' });    
	}

    preload(){
        this.load.image('skip', 'assets/img/Skip.png');       
    }

    create(){

        this.buttonSKIP=this.add.image(SCREEN_MAX_WIDTH+30,SCREEN_MAX_HEIGHT-50,'skip');
        this.buttonSKIP.setInteractive();
        this.buttonSKIP.setDepth(999);
        this.buttonSKIP.setScale(0.15);
        
        this.buttonSKIP.on('pointerup', function () {
           this.scene.start('levelSelector');
           console.log('ENTRA')
       }, this);
        
         //BUTTON CROSS
         /*
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

         this.arrow=this.add.image(SCREEN_MAX_WIDTH+30,SCREEN_MAX_HEIGHT-50,'arrow');
         this.arrow.setDepth(999);
         this.arrow.setScale(0.02);
         this.buttonCROSS.on('pointerup', function () {this.scene.start('menuScene')}, this);*/

         //SKIP BUTTON

         var text = this.add.text(100, 100, '',{ fontStyle: 'strong',font: '20px Arial', fill: '#ffffff' });
         var content = "SPACE LOG, DAY 2314:\n\n"+
         "I am about to leave the Moon to reach Mars, where an exploration and\n"+
         "resource gathering mission awaits me. According to the reports, it is a\n"+
         "hostile world, full of dangers and mysteries.\n\n"+
         "I will have to use my cunning and my equipment to survive and achieve my\n"+
         "goal. I don't know what I will find there, but I am ready for anything.\n"+
         "This is the biggest challenge of my career as astronaut, and I can't fail.\n\n"+
         "May luck be with me.";
     
         var i = 0;
         var timer = this.time.addEvent({
             delay: 30, // tiempo entre cada letra en milisegundos
             repeat: content.length - 1, // cantidad de letras a agregar
             callback: function() {
                 text.setText(text.text + content[i]);
                 i++;
             },
             callbackScope: this
         });

        

    }

    update(){
        super.update();
    }


}
    
    
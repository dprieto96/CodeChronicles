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
        this.load.audio('typing', 'assets/music/bgm/typing.mp3');
    }

    create(){
        this.texts  = this.cache.json.get("texts");
        this.buttonSKIP=this.add.image(SCREEN_MAX_WIDTH+30,SCREEN_MAX_HEIGHT-50,'skip');
        this.buttonSKIP.setInteractive();
        this.buttonSKIP.setDepth(999);
        this.buttonSKIP.setScale(0.15);

        if(!Utils.isMute()){
			this.musicTYPING=this.sound.add('typing');
            this.musicTYPING.play();
		}
        
        
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
         var content = this.texts["lore"];
     
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
    
    
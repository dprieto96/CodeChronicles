/**
 * Escena de Título.
 * @extends Phaser.Scene
 */


//import NivelVertical from "./verticalLevels/NivelVertical.js";
//import NivelVertical from "./verticalLevels/NivelVertical";
import Utils from "../Utils.js";

export default class GameOverScene extends Phaser.Scene{

	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'gameOverScene' });   
        
	}

    init(settings){
        this.escena=settings.clave;
    }


    preload(){
        
        this.load.image('gameover', 'assets/img/GAME-OVER.png');
        this.load.image('bg', 'assets/img/button.png');
        this.load.audio('goverSound', 'assets/music/bgm/goverSound.mp3');
        
    }

    create(){
        this.game.sound.stopAll();
        if(!Utils.isMute()){
			this.musicOVER=this.sound.add('goverSound');
            this.musicOVER.play();
		}
        



        this.click=false;

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.bg = this.add.image(SCREEN_MAX_WIDTH/2+80,SCREEN_MAX_HEIGHT/2+80,'bg');
        this.bg.setDepth(998);

        this.gameOver=this.add.image(SCREEN_MAX_WIDTH/2+80,SCREEN_MAX_HEIGHT/2+80,'gameover');
        this.gameOver.setDepth(999);
        this.gameOver.setScale(0.3);

        this.textSTART=this.add.text(SCREEN_MAX_WIDTH/2-115,SCREEN_MAX_HEIGHT, "TOUCH SCREEN TO RETRY ",{ fontStyle: 'strong',font: '30px Arial', fill: '#ffffff' });
        this.textSTART.setDepth(999);
        
        this.input.on('pointerdown',()=>
            this.reload()

        );
    
    }

    reload(){
        this.scene.start(this.escena);
        this.scene.stop();
    }

    update(){
        super.update();
        //console.log('EL CLICK ESTA EN: '+this.click);

      /* if (Phaser.Input.Keyboard.JustDown(this.spacebar)|| this.click)
        {
            this.scene.start(this.escena);
            this.scene.stop();

        }*/

    }


}
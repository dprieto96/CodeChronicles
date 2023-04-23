/**
 * Escena de Título.
 * @extends Phaser.Scene
 */


//import NivelVertical from "./verticalLevels/NivelVertical.js";
//import NivelVertical from "./verticalLevels/NivelVertical";

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
        
    }

    create(){


        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.bg = this.add.image(SCREEN_MAX_WIDTH/2+80,SCREEN_MAX_HEIGHT/2+80,'bg');
        this.bg.setDepth(998);

        this.gameOver=this.add.image(SCREEN_MAX_WIDTH/2+80,SCREEN_MAX_HEIGHT/2+80,'gameover');
        this.gameOver.setDepth(999);
        this.gameOver.setScale(0.3);

        this.textSTART=this.add.text(SCREEN_MAX_WIDTH/2-150,SCREEN_MAX_HEIGHT, "PRESS SPACEBAR KEY TO RETRY ",{ fontStyle: 'strong',font: '30px Arial', fill: '#ffffff' });
        this.textSTART.setDepth(999);

        

       
    
    }

    update(){
        super.update();
        if (Phaser.Input.Keyboard.JustDown(this.spacebar))
        {
            this.scene.start(this.escena);
            this.scene.stop();

        }
    }


}
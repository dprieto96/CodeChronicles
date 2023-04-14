/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import LevelSelector from "./LevelSelector.js";


export default class MenuScene extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'menuScene' });    
        this.levels = [ 
            new LevelSelector()
        ];  
	}

    preload(){
        this.load.image('button', 'assets/img/button.png');
    }

    create(){
        this.text=this.add.text(SCREEN_MAX_WIDTH/2+40,SCREEN_HEIGHT/2, "START",{ fontStyle: 'strong',font: '40px Arial', fill: '#ffffff' });
        this.text.setDepth(999);

        this.button = this.add.image(SCREEN_MAX_WIDTH/2+100,SCREEN_HEIGHT/2+30,'button');
        this.button.setDepth(998);
        this.button.setScale(0.5);

        this.button.setInteractive();
        this.button.on('pointerup', function () {this.scene.start('levelSelector')}, this);
    
    }

    update(){
        super.update();
    }
}
    
    

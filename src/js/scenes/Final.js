/**
 * Escena de Título.
 * @extends Phaser.Scene
 */


//import NivelVertical from "./verticalLevels/NivelVertical.js";
//import NivelVertical from "./verticalLevels/NivelVertical";
import Utils from "../Utils.js";

export default class FinalSCene extends Phaser.Scene{

	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'FinalSCene' });   
        
	}

    init(settings){
        this.escena=settings.clave;
    }


    preload(){
   
        this.load.image('final', 'assets/img/wokeUp.jpeg');
    }

    create(){
        this.game.sound.stopAll();

        this.click=false;


        this.finish=this.add.image(SCREEN_MAX_WIDTH/2+80,SCREEN_MAX_HEIGHT/2+80,'final');
        this.finish.setDepth(999);
        this.finish.setScale(0.8);

        this.textSTART=this.add.text(SCREEN_MAX_WIDTH/2-180,10, "EVERYTHING WAS A NIGHTMARE",{ fontStyle: 'strong',font: '30px Arial', fill: '#ff5733' });
        this.textSTART.setDepth(999);
        
        this.input.on('pointerdown',()=>
            this.reload()
        );
    
    }

    reload(){
        location.reload();  
    }

    update(){
        super.update();
    }


}
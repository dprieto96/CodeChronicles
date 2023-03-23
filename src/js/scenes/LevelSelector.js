/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import NivelVertical    from "./verticalLevels/NivelVertical.js"
import NivelHorizontal  from "./horizontalLevels/NivelHorizontal.js"
import Utils from "../Utils.js"
export default class LevelSelector extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'levelSelector' });
        this.currentSceneIndex = -1;
        
        this.nivelV = new NivelVertical(0,"MOON",this);
        this.nivelH = new NivelHorizontal(0,"VENUS",this);
        this.scenes = [ this.nivelV, this.nivelH ];
	}
    
    init(){
        this.scene.add(this.nivelV.key, this.nivelV, false);
        this.scene.add(this.nivelH.key, this.nivelH, false);
    }
    
    create(){
        // Iniciar la primera escena
        Utils.createKeyBindings(this);
        this.next = 1;
    }

    startNextLevel(){
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.scenes.length;
        let nextLevel = this.scenes[this.currentSceneIndex];
        console.log(nextLevel.key);
        this.scene.pause();
        this.scene.launch(nextLevel.key);
    }
    
    update(){
        super.update();
        this.startNextLevel();
        //if(this.p.isDown){ this.startNextLevel(); }
        
        // wait at least 1 second (1000ms) to next shot
		//cerrar escena:
    }
}
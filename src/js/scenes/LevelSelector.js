/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import NivelVertical    from "./verticalLevels/NivelVertical.js"
import NivelHorizontal  from "./horizontalLevels/NivelHorizontal.js"
export default class LevelSelector extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'levelSelector' });
        this.currentSceneIndex = 0;
        
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
        this.startNextLevel(this.scenes[this.currentSceneIndex]);
    }

    startNextLevel(level){
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.scenes.length;
        level.scene.start(this.scenes[this.currentSceneIndex].key);
    }

    update(){}
}
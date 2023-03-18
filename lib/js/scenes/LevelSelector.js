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
        this.scenes = ['nivelVertical00', 'nivelHorizontal00'];
        this.currentSceneIndex = 0;
	}
    
    init(){        
        let nivelV = new NivelVertical(0,"MOON",this);
        this.scene.add(nivelV.key, nivelV, false);
        
        let nivelH = new NivelHorizontal(0,"VENUS",this);
        this.scene.add(nivelH.key, nivelH, false);
    }

    create(){
        // Escuchar el evento 'finish' de las escenas
        this.events.on('finish', () => {
            // Lanzar la siguiente escena
            this.launchNextScene();
        });

        // Iniciar la primera escena
        this.launchNextScene();
    }

    launchNextScene() {
        let nextSceneKey = this.scenes[this.currentSceneIndex];
        if(!this.scene.isActive(nextSceneKey)){
            this.scene.start(this.scenes[this.currentSceneIndex]);
        }
        else{
            this.scene.restart(this.scenes[this.currentSceneIndex]);
        }
    
        // Actualizar el índice de la siguiente escena
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.scenes.length;
    }

    update(){}
}
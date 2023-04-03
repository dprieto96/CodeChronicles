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
        this.verticalIdx   = 0;
        this.horizontalIdx = 0;
        
        this.levels = [ 
            new NivelVertical("MOON","MARS",this),
            new NivelHorizontal("VENUS",this),
            new NivelVertical("MARS","MOON",this)
        ];
	}
    
    getCurrentVId(){
        let ret = this.verticalIdx;
        this.verticalIdx++;
        return ret;
    }
    
    getCurrentHId(){
        let ret = this.horizontalIdx;
        this.horizontalIdx++;
        return ret;
    }

    init(){
        for (let i = 0; i < this.levels.length; i++){ 
            this.scene.add(this.levels[i].key, this.levels[i], false);
        }
    }

    preload(){
		this.load.json("config",Utils.getJson('planetsSettings'));
		this.load.json("levels",Utils.getJson('levels'));
    }
    
    create(){
        // Iniciar la primera escena
        Utils.createKeyBindings(this);
        this.planetSettings = this.cache.json.get("config");
		this.levelSettings   = this.cache.json.get("levels");
    }

    startNextLevel(){
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.levels.length;
        let nextLevel = this.levels[this.currentSceneIndex];
        //console.log(nextLevel.key);
        this.scene.pause();
        this.scene.launch(nextLevel.key);
    }
    
    update(){
        super.update();
        this.startNextLevel();
    }
}
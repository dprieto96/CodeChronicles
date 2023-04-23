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
            new NivelVertical(this,30),
            new NivelHorizontal(this),
            new NivelVertical(this,60),
            new NivelHorizontal(this),
            new NivelVertical(this,100),
            new NivelHorizontal(this)
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
		this.load.json("levelSettings",Utils.getJson('levelSettings'));

        //for(let i = 0; i < this.levels.length; i++){ this.levels[i].preload(); }
    }
    
    create(){
        console.log("a")
        // Iniciar la primera escena
        Utils.createKeyBindings(this);
        this.planetSettings = this.cache.json.get("config");
		this.levelSettings  = this.cache.json.get("levelSettings");
    }

    startNextLevel(){
        this.currentSceneIndex = (this.currentSceneIndex + 1) % this.levels.length;
        let nextLevel = this.levels[this.currentSceneIndex];
        this.scene.pause();

        console.log('LA proxima escena es: '+ nextLevel.key);
        this.scene.launch(nextLevel.key);
    }
    
    update(){
        super.update();
        this.startNextLevel();
    }
}
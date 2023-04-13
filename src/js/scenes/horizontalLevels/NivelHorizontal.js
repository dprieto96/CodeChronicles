/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import Nivel from "../Nivel.js"
import Utils from "../../Utils.js"
import Astronaut from '../../obj/player/Astronaut.js';
import HorizontalBackground from './HorizontalBackground.js';
export default class NivelHorizontal extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(ctrl) {
		super("nivelHorizontal"+Utils.digitsToStr(ctrl.getCurrentHId(),2),ctrl);
		this.introDone 	= false;
	}

	init(){}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();

		this.planet = this.st["planet"];
		this.bg 	= new HorizontalBackground(this);
		this.player = new Astronaut(this,0,320);
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		this.physics.world.gravity.y = GRAVITY_FACTOR * this.planetSettings["gravity"] ;
		this.bg.create();
		this.player.create();
		var platGroup = this.physics.add.staticGroup();

		platGroup.create(200, 200, 'platform');
		platGroup.create(200, 100, 'platform');
		platGroup.create(50, 100, 'platform');

		platGroup.children.iterate(function(plat) {
    		plat.body.immovable = true;
		});
		platGroup.enableBody = true;
		this.physics.add.collider(this.player,platGroup);
	}

	/**
	* Loop del juego
	*/
    update(){ 
    	super.update();
		
		if(!this.introDone){ this.bg.launch(); }
		this.player.handleMovement();
	}

	victoryCondition(){}
}

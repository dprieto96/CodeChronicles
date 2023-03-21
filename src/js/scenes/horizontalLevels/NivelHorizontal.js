/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import Nivel from "../Nivel.js"
import Astronaut from '../../obj/player/Astronaut.js';
import HorizontalBackground from './HorizontalBackground.js';
export default class NivelHorizontal extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(nivelId,planet,ctrl) {
		super("nivelHorizontal"+digitsToStr(nivelId,2),planet,ctrl);
		this.introDone 	= false;
	}

	init(){}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();

		this.bg 	= new HorizontalBackground(this);
		this.player = new Astronaut(this,100,300);
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();

		this.bg.create();
		this.player.create();
	}

	/**
	* Loop del juego
	*/
    update(){ 
    	super.update();
		
		if(!this.introDone){ this.bg.launch(); }
		this.player.handleMovement();
	}
}

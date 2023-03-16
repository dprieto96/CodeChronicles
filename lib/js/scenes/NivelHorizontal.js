/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import Nivel from "./Nivel.js"
import Astronaut from '../Astronaut.js';
export default class NivelHorizontal extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(planet,nivelId) {
		super("MARTE","NivelHorizontal"+digitsToStr(nivelId,2));
		this.introDone 	= false;
	}

	init(){}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();
		this.player = new Astronaut(this,100,300);// );
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		this.player.create();
	}

	/**
	* Loop del juego
	*/
    	update(){ 
    		super.update();
		this.player.handleMovement();
	}
}

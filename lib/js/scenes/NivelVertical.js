/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

import Nivel from "./Nivel.js"
import VerticalBackground from '../VerticalBackground.js';
import Spaceship from '../Spaceship.js';
export default class NivelVertical extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(planet,nivelId) {
		super("MARTE","nivelVertical"+digitsToStr(nivelId,2));
		this.introDone 	= false;
	}

	init(){}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();
		
		this.bg 	= new VerticalBackground(this);
		this.player = new Spaceship(this,VERTICAL_LEVELS_WIDTH/2, VERTICAL_LEVELS_HEIGHT- 100);// );
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
		else { this.player.handleMovement(); }
	}
}
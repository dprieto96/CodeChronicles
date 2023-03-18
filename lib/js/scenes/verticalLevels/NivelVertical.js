/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

import Nivel from "../Nivel.js"
import VerticalBackground from './VerticalBackground.js';
import Spaceship from '../../obj/player/Spaceship.js';
export default class NivelVertical extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(nivelId,planet,ctrl) {
		super("nivelVertical"+digitsToStr(nivelId,2),planet,ctrl);
		this.introDone 	= false;
	}

	init(){}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();
		this.bg 	= new VerticalBackground(this);
		this.player = new Spaceship(this,SPACESHIP_INIT_X, SPACESHIP_INIT_Y);
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
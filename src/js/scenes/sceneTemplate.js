/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
export default class SceneTemplate extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor() {
		super({ key: 'nivelPlantilla' });
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create(){}

	/**
	* Loop del juego
	*/
    update(){}
}
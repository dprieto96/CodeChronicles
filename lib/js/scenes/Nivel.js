/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

import Spaceship from '../Spaceship.js';
export default class Nivel extends Phaser.Scene {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(planet,key) {
		super({ key: key });
		this.introDone 	= false;
		this.planet 	= planet;
	}
	
	/**
	 * Cargamos todos los assets que vamos a necesitar
	*/
	preload(){
		//this.load.image('background', getImg("universeBg"));
		this.load.spritesheet("spaceship",getImgV("spaceship"), {frameWidth: SPACESHIP_WIDTH, frameHeight: SPACESHIP_HEIGHT});
		this.load.json("config",getJson('planetsSettings'));
	}
	
	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		//this.setCollideWorldBounds(true);
		//this.add.image(0, 0, 'background').setOrigin(0, 0);
		
		
		this.planetSettings = this.cache.json.get("config");
		console.log(this.planetSettings);

        this.a = this.input.keyboard.addKey("A");
		this.s = this.input.keyboard.addKey("S");
		this.d = this.input.keyboard.addKey("D");
		this.w = this.input.keyboard.addKey("W");

		

        /*
		//Pintamos un botón de Empezar
		sprite.setInteractive(); // Hacemos el sprite interactivo para que lance eventos

		// Escuchamos los eventos del ratón cuando interactual con nuestro sprite de "Start"
	    sprite.on('pointerdown', pointer    => { console.log("pulsando"); });
	    sprite.on('pointerup', pointer      => { this.scene.start('animation'); /*Cambiamos a la escena de juego });
		sprite.on('pointerover', ()         => { console.log("hola") });
	    sprite.on('pointerout', ()          => { console.log("adios") });
        */
	}

	/**
	* Loop del juego
	*/
    update(){ super.update(); }
}
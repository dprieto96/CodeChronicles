/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

import Nivel from "../Nivel.js"
import Utils from "../../Utils.js"
import VerticalBackground from './VerticalBackground.js';
import Spaceship from '../../obj/player/Spaceship.js';
import Enemy from "../../obj/player/enemy.js";
export default class NivelVertical extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(planet,ctrl) {
		super("nivelVertical"+Utils.digitsToStr(ctrl.getCurrentVId(),2),planet,ctrl);
		this.introDone 	= false;
	}

	updateParticles(){
		
	}

	init(){}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();
		this.bg 	= new VerticalBackground(this);
		this.player = new Spaceship(this,SPACESHIP_INIT_X, SPACESHIP_INIT_Y);
		this.enemy= new Enemy(this,0,0);
	}
	
	/**
	 * Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();
		this.bg.create();
		this.player.create();
		this.enemy.create();
		this.enemiesGroup=this.add.group();
		this.physics.world.gravity.y = 0;
	}

	 generateEnemy() {
		// determina una posición aleatoria para el nuevo enemigo
		this.x = Phaser.Math.Between(0, this.game.config.width);
		this.y = Phaser.Math.Between(0, this.game.config.height);
	  
		// crea un nuevo enemigo en la posición aleatoria y agrégalo al grupo de enemigos
		this.newEnemy = new Enemy(this, this.x, this.y);
		this.enemiesGroup.add(this.newEnemy);
	  }

	/**
	* Loop del juego
	*/
    update(){
		super.update();
		
		if(!this.introDone){ this.bg.launch(); }
		this.player.handleMovement();
		this.generateEnemy();
	}
}
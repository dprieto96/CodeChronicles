/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

import Nivel from "../Nivel.js"
import Utils from "../../Utils.js"
import VerticalBackground from './VerticalBackground.js';
import Spaceship from '../../obj/player/Spaceship.js';
import Enemy from "../../obj/enemy.js";
import Asteroid from "../../obj/Asteroid.js";
export default class NivelVertical extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(planet,destination,ctrl) {
		super("nivelVertical"+Utils.digitsToStr(ctrl.getCurrentVId(),2),planet,ctrl);
		this.destination 	 = destination;
		this.introDone 	 	 = false;
		this.distanceReached = 0;
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
        this.asteroids = [];

        let st = this.ctrl.levelSettings[this.key];
        this.numRocks = st["numAsteroids"];
        this.density  = st["density"];
        this.thrownAsteroids = 0;
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
		if(!this.introDone) { 
			this.bg.launch();
			this.player.play("UP",true);
		}
		else if (!this.checkEndOfGame()) { 
			this.player.handleMovement(); 
			this.distanceReached++;

			this.generateEnemy();
		}
		else if(!this.levelCleared){ 
			this.player.play("DOWN",true);
			this.bg.endOfGame();
		}
		else{ this.finishLevel(); }
	}

    updateAsteroids(){
        if(this.asteroids.length < this.density && this.thrownAsteroids < this.numRocks){
			let id 	  = Math.floor(Math.random()*10)%6;
			let initX = Math.floor(Math.random()*10)%VERTICAL_LEVELS_WIDTH;
			console.log(id, initX);
            this.asteroids.push(new Asteroid(this, "asteroid0"+id, initX, 20, [0,20]));
            this.thrownAsteroids++;
        }

        for (let i = 0; i < this.asteroids.length; i++){ 
            this.asteroids[i].rotation += 0.001;
            if(this.asteroids[i].y >= VERTICAL_LEVELS_HEIGHT){ 
                this.asteroids.splice(i,1);
                i--;
            }
        }
    }
		
	//checkEndOfGame(){ return super.checkEndOfGame(); }
	victoryCondition(){ return this.distanceReached >= this.ctrl.levelSettings[this.key]["levelLength"]; }
}
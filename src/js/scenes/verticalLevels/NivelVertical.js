/**
 * Escena de Título.
 * @extends Phaser.Scene
 */

import Nivel from "../Nivel.js"
import Utils from "../../Utils.js"
import VerticalBackground from './VerticalBackground.js';
import Spaceship from '../../obj/player/Spaceship.js';
import Asteroid from "../../obj/Asteroid.js";
import Bullet from "../../obj/player/Bullet.js"
export default class NivelVertical extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */

	constructor(ctrl) {
		super("nivelVertical"+Utils.digitsToStr(ctrl.getCurrentVId(),2),ctrl);
	}

	updateParticles(){
		//TODO
	}

	init(){}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();

		//this.load.image("bullet","assets\img\verticalLevels\bulletold.png");



		this.load.atlas('verticalAtlas', Utils.getImgV("templates"), Utils.getJson("verticalLevelElements"));
		this.destination = this.st["destination"];
		
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

		this.enemiesGroup = this.add.group();
		this.physics.world.gravity.y = 0;
		

        //this.numRocks = st["numAsteroids"];
        this.density  = this.st["density"];
        this.thrownAsteroids = 0;
		this.distanceReached = 0;


		this.cursors = this.input.keyboard.createCursorKeys();
		this.bulletsGroup = new Bullet(this.physics.world, this);

		this.physics.add.collider(this.player,this.enemiesGroup);
		this.physics.add.collider(this.enemiesGroup,this.enemiesGroup);

	

	//	this.physics.add.overlap(this.player, this.enemiesGroup, this.colision() , null, this);
	}

	colision(){
		// calcula el ángulo de la colisión
		this.angle = Phaser.Math.Angle.Between(this.player.x, this.player.y, this.enemiesGroup.x, this.enemiesGroup.y);
		
		// ajusta los vectores de velocidad de los objetos
		this.player.speedX = Math.cos(this.angle) * this.player.speed;
		this.player.speedY = Math.sin(this.angle) * this.player.speed;
		//this.enemiesGroup.setVelocity(Math.cos(this.angle + Math.PI) * this.enemiesGroup.speed,Math.sin(this.angle + Math.PI) * this.enemiesGroup.speed );
		/*this.enemiesGroup.velocity.x = Math.cos(this.angle + Math.PI) * this.enemiesGroup.speed;
		this.enemiesGroup.velocity.y = Math.sin(this.angle + Math.PI) * this.enemiesGroup.speed;*/
	  }

	generateEnemy() {
		//generar una nueva roca:
		if(this.enemiesGroup.getLength() < this.density && !this.victoryCondition()){
			// determina una posición aleatoria para el nuevo enemigo
			let newX = Phaser.Math.Between(0, this.game.config.width);

			// crea un nuevo enemigo en la posición aleatoria y agrégalo al grupo de enemigos
			let id = Math.floor(Phaser.Math.Between(0, 5));
			let signX 		 = Math.floor(Phaser.Math.Between(0,1)) % 2 == 0 ? -1 : 1;
			let signRotation = Math.floor(Phaser.Math.Between(0,1)) % 2 == 0 ? -1 : 1;
			let newVector = [
				Math.floor(Phaser.Math.Between(this.st["rockMinSpeedX"],this.st["rockMaxSpeedX"]))*signX,
				Math.floor(Phaser.Math.Between(this.st["rockMinSpeedY"],this.st["rockMaxSpeedY"])),
				(Math.random()*8+5)*signRotation
			]
			this.newAsteroid = new Asteroid(this, newX, -60, "asteroid0"+id, newVector);
			this.newAsteroid.create();
			this.enemiesGroup.add(this.newAsteroid);
			console.log(id, newX);
        }

		//comprobar si se sale del mapa para eliminar la roca:
        for (let i = 0; i < this.enemiesGroup.getLength(); i++){
			let child = this.enemiesGroup.getChildren()[i];
            if(child.y >= VERTICAL_LEVELS_HEIGHT || child.x >= VERTICAL_LEVELS_WIDTH || child.x < 0){ 
				console.log("an asteroid flew away...");
				this.enemiesGroup.remove(child);
				this.thrownAsteroids++;
                i--;
            }
        }
	}

	fire(){
		this.bulletsGroup.newItem();
	}

	hitEnemies(bullet, enemy) {
        bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();

       
            enemy.destroy();

    
    }

    update(){
		super.update();
		this.physics.add.collider(this.player,this.enemiesGroup);
		this.physics.add.collider(this.enemiesGroup,this.enemiesGroup);
		this.physics.add.collider(this.bulletsGroup, this.enemiesGroup, this.hitEnemies, null, this);

		if (this.input.keyboard.checkDown(this.cursors.space, 250)) {
            this.fire();
        }
		//this.fire();
		
		if(!this.introDone){ this.bg.launch(); }
		else{ this.generateEnemy(); }

		if(!this.introDone) { 
			this.bg.launch();
			this.player.play("UP",true);
		}
		else if (!this.checkEndOfGame() || this.enemiesGroup.getLength() > 0) { 
			this.player.handleMovement(); 
			this.distanceReached++;
		}
		else if(!this.levelCleared){ 
			this.player.play("DOWN",true);
			this.bg.endOfGame();
		}
		else{ this.finishLevel(); }
	}
		
	victoryCondition(){ return this.thrownAsteroids >= this.st["numAsteroids"] && this.distanceReached >= this.st["levelLength"]; }
}
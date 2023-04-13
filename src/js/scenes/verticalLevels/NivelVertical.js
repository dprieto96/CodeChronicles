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

	constructor(ctrl,bullets) {
		super("nivelVertical"+Utils.digitsToStr(ctrl.getCurrentVId(),2),ctrl);
		this.numBullets=bullets;
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
		
		this.extraBullets=10;
	}
	
	/**
	 * Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();

		//this.numBullets=this.bullets;
		this.scoreText = this.add.text(this.sys.game.canvas.width / 2 - 65, 0, 'BULLETS: ' + this.numBullets, { fontStyle: 'strong', font: '12px Arial', fill: '#6368BC' });
		this.scoreText.setDepth(1000);

		this.numLifes=3;
		this.lifesText = this.add.text(this.sys.game.canvas.width-65,0, 'LIFE X ' + this.numLifes, { fontStyle: 'strong', align: 'right',font: '12px Arial', fill: '#6368BC' });
		this.lifesText.setDepth(1000);

		this.bg.create();
		this.player.create();

		//progress bar:
		this.pBar = this.add.sprite(5, 10, 'verticalAtlas', 'progressBar');
		this.pBar.x += this.pBar.width/2;
		this.pBar.y += this.pBar.height/2;
		this.pBar.setDepth(999);

		//spaceship icon:
		this.icon = this.add.sprite(5, 10, 'verticalAtlas', 'spaceshipIcon');
		this.icon.x += this.pBar.width/2;
		this.icon.y += this.pBar.height;
		this.icon.setDepth(999);

		this.enemiesGroup = this.add.group();
		this.physics.world.gravity.y = 0;
		

        //this.numRocks = st["numAsteroids"];
        this.density  = this.st["density"];
        this.thrownAsteroids = 0;
		this.distanceReached = 0;


		this.cursors = this.input.keyboard.createCursorKeys();
		this.bulletsGroup = new Bullet(this.physics.world, this);
		Utils.createAnimFromAtlas(this, "boomBeach", "verticalAtlas", "boom", 8, 2, 20, 0);

		this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

		//this.physics.add.collider(this.player,this.enemiesGroup);
		this.physics.add.collider(this.enemiesGroup,this.enemiesGroup);
		this.physics.add.collider(this.bulletsGroup, this.enemiesGroup, this.hitEnemies, null, this);
		this.physics.add.collider(this.enemiesGroup, this.player, this.hitPlayer, null, this);
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
		if(this.enemiesGroup.getLength() < this.density && this.distanceReached + 200 < this.st["levelLength"] ){
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
        }

		//comprobar si se sale del mapa para eliminar la roca:
        for (let i = 0; i < this.enemiesGroup.getLength(); i++){
			let child = this.enemiesGroup.getChildren()[i];
            if(child.y >= VERTICAL_LEVELS_HEIGHT || child.x >= VERTICAL_LEVELS_WIDTH || child.x < 0){
				this.enemiesGroup.remove(child);
				this.thrownAsteroids++;
                i--;
            }
        }
	}

	fire(){ this.bulletsGroup.newItem(); }

	hitEnemies(enemy, bullet) {
		bullet.setVisible(false);
        bullet.setActive(false);
        bullet.destroy();

		enemy.setAngularVelocity(0);
		enemy.setVelocity(0,0);
		enemy.angle = 0;
		enemy.body.checkCollision.none = true;
		enemy.play("boomBeach");
    }

	hitPlayer(enemy, player) {
		if(this.numLifes>0)this.numLifes--;

		enemy.setAngularVelocity(0);
		enemy.setVelocity(0,0);
		enemy.angle = 0;
		enemy.body.checkCollision.none = true;
		enemy.play("boomBeach");
    }


    update(){
		super.update();		
		if(!this.introDone) { this.bg.launch(); }
		else {
			this.bg.update();
			this.generateEnemy();
			this.lifesText.setText('LIFE X ' + this.numLifes);

			if (!this.checkEndOfGame() || this.enemiesGroup.getLength() > 0) {
				//progress bar logic:
				if (this.icon.y > 10){
					this.icon.y = 10 + this.pBar.height - Math.floor((this.distanceReached / this.st["levelLength"])*this.pBar.height);
				}
	
				//check space key to shoot bullet:
				if (this.input.keyboard.checkDown(this.cursors.space, 250) && this.numBullets>0) {
					this.fire();
					this.numBullets--;
					this.bullets--;
					this.scoreText.setText('BULLETS: ' + this.numBullets);
				}
	
				this.player.handleMovement(); 
				this.distanceReached++;
			}

			else if(!this.levelCleared){ 
				this.player.play("DOWN",true);
				this.bg.endOfGame();
				
			}
			else{ 
				
				this.finishLevel(); 
				}
		}
	}
		
	victoryCondition(){ return this.distanceReached >= this.st["levelLength"]; }
}
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

	continuar(){
		this.resume();
	}

	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();
		
		if(Utils.isMute()===undefined){
			Utils.setisMute(false);
		}
		

		let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
   	    this.load.plugin('rexvirtualjoystickplugin', url, true);


		//this.load.image("bullet","assets\img\verticalLevels\bulletold.png");
		this.load.image('pause', 'assets/img/pause.png');
		this.load.audio('bgmusic', 'assets/music/bgm/bgVertical.mp3');
		this.load.audio('shoot', 'assets/music/bgm/shoot.mp3');
		this.load.audio('explosion', 'assets/music/bgm/explosion.mp3');
		this.load.audio('hurt', 'assets/music/bgm/hurt.mp3');


		this.load.atlas('verticalAtlas', Utils.getImgV("templates"), Utils.getJson("verticalLevelElements"));
		this.destination = this.st["destination"];
		
		this.bg 	= new VerticalBackground(this);
		this.player = new Spaceship(this,SPACESHIP_INIT_X, SPACESHIP_INIT_Y);
		
		this.extraBullets=10;
		this.gameState='runnung';
		
	}
	
	/**
	 * Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();

		this.game.sound.stopAll();

		this.scene.bringToTop('PauseScene');
		this.scene.bringToTop('gameOverScene');
		//this.scene.moveBelow(this.key,'PauseScene');
		//this.scene.moveBelow(this.key,'gameOverScene');

		if (Utils.isMobile()){
		//console.log('ESTADO MOBILE: '+Utils.isMobile());
		this.dispara=false;
		this.rect = this.add.rectangle(
			this.game.config.width-200 ,  // X central
			320,                           // Y superior
			this.game.config.width / 2,  // Ancho mitad derecha
			this.game.config.height,     // Altura pantalla completa
			0xffffff,                    // Color de relleno blanco
  			0
		  );

		  this.rect.setInteractive();
			this.rect.on('pointerdown', ()=> {
			this.fire();
		  });
		
		
		
		//JOYSTICK
	  
		this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
			x: 155,
			y: SCREEN_HEIGHT-155,
			radius: 100,
			base: this.add.circle(0, 0, 50, 0x888888),
			thumb: this.add.circle(0, 0, 25, 0xcccccc),
	  });

	  this.joystickCursors = this.joyStick.createCursorKeys();
	  this.jostickmovement='null';
	  }

		if(!Utils.isMute()){
			this.musicBG=this.sound.add('bgmusic');
			this.musicSHOOT=this.sound.add('shoot');
			this.musicEXPLOSION=this.sound.add('explosion');
			this.musicHURT=this.sound.add('hurt');
		}
		
		this.scaleProgress=3.5;
		this.clave=this.key;

		this.pauseButton = this.add.image(SCREEN_MAX_WIDTH+80,SCREEN_MAX_HEIGHT+100,'pause').setInteractive();
			this.pauseButton.setDepth(999);
			this.pauseButton.setScale(0.15);
			this.pauseButton.inputEnabled = true;
			this.gameState = 'running';
    
			this.pauseButton.on('pointerdown', function () {
				if(!Utils.isMute()){
				this.musicBG.pause();
				this.musicSHOOT.pause();
				this.musicEXPLOSION.pause();
				this.musicHURT.pause();

				}
				this.scene.pause(this.key);
				this.scene.launch('PauseScene',{clave:this.clave});				
				this.gameState = 'paused';
			  }, this);

		this.scoreText = this.add.text(this.sys.game.canvas.width / 2 +20, 20, 'X' + this.numBullets, { fontStyle: 'strong', font: '30px Arial', fill: '#ffffff'});
		this.scoreText.setDepth(1000);

		this.numLifes=3;
		this.lifesText = this.add.text(this.sys.game.canvas.width-90,20, 'X' + this.numLifes, { fontStyle: 'strong', align: 'right',font: '30px Arial', fill: '#ffffff' });
		this.lifesText.setDepth(1000);

		this.bg.create();
		this.player.create();	

		//bullet icon
		this.bulletIcon=this.add.sprite(5, 10, 'verticalAtlas', 'shoot00');
		this.bulletIcon.x=SCREEN_WIDTH /2;
		this.bulletIcon.y=60;
		this.bulletIcon.setDepth(999);
		this.bulletIcon.setScale(this.scaleProgress*1.5);	

		//health icon
		this.lifeIcon=this.add.sprite(5, 10, 'verticalAtlas', 'life');
		this.lifeIcon.x=SCREEN_WIDTH -120;
		this.lifeIcon.y=50;
		this.lifeIcon.setDepth(999);
		this.lifeIcon.setScale(this.scaleProgress*0.7);


		//progress bar:
		this.pBar = this.add.sprite(5, 10, 'verticalAtlas', 'progressBar');
		this.pBar.x += (this.pBar.width)*this.scaleProgress;
		this.pBar.y += (this.pBar.height/2)*this.scaleProgress;
		this.pBar.setDepth(999);
		this.pBar.setScale(this.scaleProgress);

		//spaceship icon:
		this.icon = this.add.sprite(5, 10, 'verticalAtlas', 'spaceshipIcon');
		this.icon.x += (this.pBar.width)*this.scaleProgress;
		this.icon.y += (this.pBar.height)*this.scaleProgress;
		this.icon.setDepth(999);
		this.icon.setScale(this.scaleProgress);

		this.enemiesGroup = this.add.group();
		this.physics.world.gravity.y = 0;
		
        this.density  = this.st["density"];
        this.thrownAsteroids = 0;
		this.distanceReached = 0;
		this.musicStarted = false;

		this.cursors = this.input.keyboard.createCursorKeys();
		this.bulletsGroup = new Bullet(this.physics.world, this);
		Utils.createAnimFromAtlas(this, "boomBeach", "verticalAtlas", "boom", 8, 2, 20, 0);

		this.physics.world.setBounds(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);

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
		if(!Utils.isMute())this.musicEXPLOSION.play();
    }

	hitPlayer(enemy, player) {
		if(this.numLifes>=0)this.numLifes--;
		if(!Utils.isMute()){
			this.musicHURT.play();
			this.musicEXPLOSION.play();
		}
		enemy.setAngularVelocity(0);
		enemy.setVelocity(0,0);
		enemy.angle = 0;
		enemy.body.checkCollision.none = true;
		enemy.play("boomBeach");
    }

	handleMovement(){
		let jt = false;
		let txt = "";
		if (this.joystickCursors.up.isDown)   	   { txt = 'UP';    jt = true; }
		else if (this.joystickCursors.down.isDown) { txt = 'DOWN';  jt = true; }

		if (this.joystickCursors.left.isDown) 	   { txt = 'LEFT';  jt = true; }
		else if (this.joystickCursors.right.isDown){ txt = 'RIGHT'; jt = true; }
		this.jostickmovement = txt;
		
		if (jt) { this.player.jostickMovement(this.jostickmovement); }
		else    { this.player.handleMovement(); }
		this.jostickmovement='null';
	}


    update(){
		super.update();	
		
		if(this.numLifes<0){
			if(!Utils.isMute()){
			this.musicBG.pause();
			this.musicSHOOT.pause();
			this.musicEXPLOSION.pause();
			this.musicHURT.pause();

			}
			this.scene.launch('gameOverScene',{clave:this.clave});
			this.scene.pause(this.key);			
			this.gameState = 'paused';
		}

		if(this.gameState==='paused' && !Utils.isMute()){
			this.musicBG.resume();
			this.musicSHOOT.resume();
			this.musicEXPLOSION.pause();
			this.musicHURT.pause();

		}
		
		if(!this.introDone) { 
			this.bg.launch();
			this.setVisibility(false);
		}
		else {
			this.bg.update();
			this.setVisibility(true);
			this.generateEnemy();
			if(!Utils.isMute() && !this.musicStarted) {
				this.musicBG.play();
				this.musicStarted = true;
			}
			
			if(this.numLifes>=0) this.lifesText.setText('X' + this.numLifes);

			if (!this.checkEndOfGame() || this.enemiesGroup.getLength() > 0) {
				//progress bar logic:
				if (this.icon.y > 10){
					this.icon.y = 10 + this.pBar.height - Math.floor((this.distanceReached / this.st["levelLength"])*this.pBar.height);
					this.icon.y *=this.scaleProgress;
				}
	
				//check space key to shoot bullet:
				if (this.input.keyboard.checkDown(this.cursors.space, 500) && this.numBullets>0) {
					this.fire();
					if(!Utils.isMute())this.musicSHOOT.play();
					this.numBullets--;
					this.bullets--;
					this.scoreText.setText('X' + this.numBullets);
				}
				if (this.cursors.up.isDown){}

				if (Utils.isMobile()) this.handleMovement();
				else this.player.handleMovement();
				
				this.distanceReached++;
			}
			else if(!this.levelCleared){ 
				this.player.setVelocity(0,0);
				this.player.play("DOWN",true);
				this.bg.endOfGame();
			}
			else{ this.finishLevel(); }
		}
	}

	setVisibility(mode){
		this.pBar.setVisible(true);
		this.icon.setVisible(true);
		this.lifeIcon.setVisible(true);
		this.bulletIcon.setVisible(true);
		this.lifesText.setVisible(true);
		this.scoreText.setVisible(true);
	}
		
	victoryCondition(){ return this.distanceReached >= this.st["levelLength"]; }
}
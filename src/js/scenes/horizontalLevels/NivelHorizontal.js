/**
 * Escena de Título.
 * @extends Phaser.Scene
 */
import Nivel from "../Nivel.js"
import Utils from "../../Utils.js"
import Astronaut from '../../obj/player/Astronaut.js';
import HorizontalBackground from './HorizontalBackground.js';
export default class NivelHorizontal extends Nivel {
	/**
	 * Escena principal.
	 * @extends Phaser.Scene
	 */
	constructor(ctrl,secondRound) {
		super("nivelHorizontal"+Utils.digitsToStr(ctrl.getCurrentHId(),2),ctrl);
		this.introDone 	= false;
		this.secondRound = secondRound;
	}

	continuar(){
		this.resume();
	}

	init(){}
	/**
	 * Cargamos todos los assets que vamos a necesitar
	 */
	preload(){
		super.preload();

		let url = 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexvirtualjoystickplugin.min.js';
   	    this.load.plugin('rexvirtualjoystickplugin', url, true);

   	    this.load.image('pause', 'assets/img/pause.png');
   	    this.load.image('door', 'assets/img/horizontalLevels/gate.png');
		this.load.audio('bgH', 'assets/music/bgm/bgHorizontal.mp3');

		this.planet = this.st["planet"];
		this.bg 	= new HorizontalBackground(this);
		this.player = new Astronaut(this,0,this.st["initPos"]);

		this.gameState='running';
	}
	
	reloadLVL(){
		this.restart();
	}

	/**
	* Creación de los elementos de la escena principal de juego
	*/
	create() {
		super.create();

		this.game.sound.stopAll();
			if(!Utils.isMute()){
			this.musicBGH=this.sound.add('bgH');
		}




		this.scene.bringToTop('PauseScene');
		//this.scene.moveBelow(this.key,'gameOverScene');TODAVIA NO IMPLEMENTADO

		if (Utils.isMobile()){
		this.joyStick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
			x: 200,
			y: SCREEN_HEIGHT-200,
			radius: 50,
			base: this.add.circle(0, 0, 25, 0x888888),
			thumb: this.add.circle(0, 0, 12, 0xcccccc),
	  	});
		
		this.joystickCursors = this.joyStick.createCursorKeys();
	 	this.jostickmovement='null';

	 	this.joyStick.setScrollFactor(0);
	 	this.joyStick.base.setDepth(999);
	 	this.joyStick.thumb.setDepth(999);
	}		

		var door = this.add.sprite(this.st["door"]["x"], this.st["door"]["y"], 'door');
	 	door.setDepth(998);
		this.physics.world.gravity.y = GRAVITY_FACTOR * this.planetSettings["gravity"] ;
		this.player.create();
		this.bg.create();
		var platGroup = this.physics.add.staticGroup();
		var stConfig = this.st["decorations"];
		var st = this.st["decorations"]["platform"];
		let posx = 10;



		// Plataformas del suelo
		for(let i = 0; i < stConfig["floor"]["nPlats"]; i++)
		{
			if(this.planet == "MOON" && i == 9)
			{}
			else{
				platGroup.create(posx, stConfig["floor"]["posy"], 'platform');
				
			}
			posx += 87;
		}
		
		// Plataformas del mapa
		for(let i = 0; i < st.length; i++ )
		{
			let obj = st[i];
			platGroup.create(obj["x"], obj["y"], 'platform');
		}

		platGroup.children.iterate(function(plat) {
    		plat.body.immovable = true;
		});
		platGroup.enableBody = true;
		platGroup.setDepth(999); 
		this.physics.add.collider(this.player,platGroup);

		this.physics.world.setBounds(0, 0, this.st["bounds"]["x"], this.st["bounds"]["y"]);
		this.cameras.main.setBounds(0, 0, this.st["bounds"]["x"], this.st["bounds"]["y"]);
		this.cameras.main.setZoom(3);
  		this.cameras.main.startFollow(this.player, true,true);
  		//this.cameras.main.setDeadzone(SCREEN_WIDTH/2 - 400, SCREEN_HEIGHT/2+400 ,150, 300);

  		this.pauseButton = this.add.image(0,0,'pause').setInteractive();
		this.pauseButton.setDepth(999);
		this.pauseButton.setScale(0.1);
		//this.buttonSTART.setInteractive();
		this.pauseButton.inputEnabled = true;
		this.gameState = 'running';



		this.pauseButton.on('pointerup', function () {
				//this.musicBG.pause();
				this.musicBGH.pause();
				this.scene.pause(this.key);
				this.scene.launch('PauseScene',{clave:this.key});				
				this.gameState = 'paused';
				
			  }, this);

		this.pauseButton.setScrollFactor(0);
		this.pauseButton.setPosition(SCREEN_WIDTH - 200, SCREEN_HEIGHT/2  - 220);


	}

	jostickMovement(){
		this.jostickmovement='null';

		if (Utils.isMobile()){
			if (this.joystickCursors.up.isDown){
				this.jostickmovement='UP';

			}

			else if (this.joystickCursors.down.isDown){
				this.jostickmovement='DOWN';
				
			}

			else if (this.joystickCursors.left.isDown){
				this.jostickmovement='LEFT';
			}

			else if (this.joystickCursors.right.isDown){
				this.jostickmovement='RIGHT';
				
			}

			else this.jostickmovement='null';
		}

		//console.log('EL JOSCTICK ES: '+this.jostickmovement);
		//this.player.jostickMovement(this.jostickmovement);
		//this.jostickmovement='null';
		return this.jostickmovement;

	}
	/**
	* Loop del juego
	*/
    update(){ 
    	super.update();
		//console.log(this.player.anims.currentAnim);
		console.log('MUTE ES: '+Utils.isMute());
		if(!Utils.isMute())this.musicBGH.play();


		//this.player.anims.currentAnim.setFrameRate(IDLE_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("standingLeft").setFrameRate(IDLE_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("runningRight").setFrameRate(MOVI_FRAME_RATE * GRAVITIES[this.planet]);
		//this.player.anims.get("runningLeft").setFrameRate(MOVI_FRAME_RATE * GRAVITIES[this.planet]);
		//if(this.gameState==='paused')this.musicBG.resume();
		//console.log('ESTADO: '+this.gameState);

		this.player.handleMovement(this.jostickMovement()); 

		if(this.st["bounds"]["y"]-28 < this.player.y)
		{
			this.scene.restart();
		}

		if(!this.introDone){ 	
			this.bg.launch();
			//this.joyStick.setVisible(false);
			this.pauseButton.setVisible(false);
			this.cameras.main.zoomTo(1.5, 2500);
		}
		else{
		
			this.pauseButton.setVisible(true);
			//this.joyStick.setVisible(true);
			//this.jostickMovement();
			if(!Utils.isMute())this.musicBGH.resume();
		}

		if(this.checkEndOfGame())
		{
			this.cameras.main.zoomTo(2.5, 2500);
			this.finishLevel();
		}
		
		console.log((this.player.x > this.st["door"]["x"] - 50 && this.player.x < this.st["door"]["x"] + 50) && (this.player.y > this.st["door"]["y"]-50 && this.player.y < this.st["door"]["y"] + 50));

	}

	victoryCondition(){ return (this.player.x > this.st["door"]["x"] - 50 && this.player.x < this.st["door"]["x"] + 50) && (this.player.y > this.st["door"]["y"]-50 && this.player.y < this.st["door"]["y"] + 50);}
}
